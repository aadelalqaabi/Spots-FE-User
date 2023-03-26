import { StyleSheet, Image, View, Button } from "react-native";
import React, { useState } from "react";
import spotStore from "../../stores/spotStore";
import ticketStore from "../../stores/ticketStore";
import authStore from "../../stores/authStore";
import { observer } from "mobx-react";
import * as Notifications from "expo-notifications";
import { baseURL } from "../../stores/instance";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function Payment({ navigation, route }) {
  const spot = route.params.itemId;
  let timeString = spot.startTime;
  let time = new Date(`1970-01-01T${timeString}:00Z`);
  time.setHours(time.getHours() - 5);
  let newTimeString = time.toTimeString().substr(0, 5);
  const h = newTimeString.substring(0, 1);
  const m = newTimeString.substring(2, 3);
  const tickets = route.params.quantity;
  const [newTicket, setNewTicket] = useState({
    amount: 0,
    image: "",
    isFree: false,
  });

  const translations = {
    en: {
      Payment: "Payment",
    },
    ar: {
      Payment: "دفع",
    },
  };

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: translations,
    lng: Localization.locale,
    fallbackLng: true,
    interpolation: {
      escapeValue: false,
    },
  });

  const handleBooking = async () => {
    spot.seatsRemaining = spot.seatsRemaining - tickets;
    spot.spotRevenue = spot.spotRevenue + tickets * spot.price;
    newTicket.amount = tickets;
    try {
      await spotStore.updateSpot(spot, spot._id);
      if (i18n.language.split("-")[0] === "en") {
        await ticketStore.createTicket(newTicket, spot._id).then(
          authStore.user.notificationToken !== "" &&
            (await Notifications.scheduleNotificationAsync({
              content: {
                title: `Can't Wait to see you ${authStore.user.name}!`,
                body: `Don't Forget ${spot.name} starts in 2 hours`,
                icon: `${baseURL}${spot.image}`,
                //   data: { data: 'goes here' },
              },
              trigger: {
                date: spot.startDate,
                hour: parseInt(h),
                minute: parseInt(m),
              },
            }))
        );
      } else {
        await ticketStore.createTicket(newTicket, spot._id).then(
          await Notifications.scheduleNotificationAsync({
            content: {
              title: `!${authStore.user.name} لا نستطيع الانتظار لرؤيتك`,
              body: `تبدا في ساعتين ${spot.name}لا تنس`,
              icon: `${baseURL}${spot.image}`,
              //   data: { data: 'goes here' },
            },
            trigger: {
              date: spot.startDate,
              hour: parseInt(h),
              minute: parseInt(m),
            },
          })
        );
      }
      //authStore.sendBookingEmail(tickets, spot);
      navigation.navigate("MySpots");
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <Image
        style={{
          marginBottom: 20,
          marginLeft: 60,
          marginTop: 200,
          height: 300,
          width: 300,
        }}
        source={{ uri: "https://kabkg.com/images/knet.png" }}
      ></Image>
      <View style={styles.button}>
        <Button onPress={handleBooking} title="Done" color={"white"} />
      </View>
    </View>
  );
}
export default observer(Payment);
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#e52b51",
    width: 125,
    height: 40,
    alignSelf: "center",
  },
});
