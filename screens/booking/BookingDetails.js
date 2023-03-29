import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { DateTime } from "luxon";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

export default function BookingDetails({ navigation, route }) {
  const spot = route.params.itemId;
  const colorScheme = useColorScheme();
  const tickets = route.params.quantity;
  const [quantity, setQuantity] = useState(tickets);
  const [checkSeats, setCheckSeats] = useState(quantity);
  const translations = {
    en: {
      detail: "Spot Details",
      payment: "Proceed to Payment",
    },
    ar: {
      detail: "تفاصيل النقطة",
      payment: "اذهب الى الدفع",
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

  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }
  let date = DateTime.fromISO(spot?.startDate).setLocale("en").toFormat("DDD");
  let dateAr = DateTime.fromISO(spot?.startDate)
    .setLocale("ar")
    .toFormat("DDD");
  const handleInc = () => {
    setCheckSeats(checkSeats + 1);
    if (spot.seatsRemaining >= checkSeats + 1) {
      setQuantity(quantity + 1);
      setCheckSeats(quantity + 1);
    } else {
      i18n.language.split("-")[0] === "en"
        ? Alert.alert("You exceeded the available amount of seats", "", ["ok"])
        : Alert.alert("لقد تجاوزت عدد المقاعد المتوفرة", "", [
            { text: "حَسَنًا" },
          ]);
    }
  };

  const handleDec = () => {
    setCheckSeats(checkSeats + 1);
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setCheckSeats(quantity - 1);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
      }}
    >
      <ScrollView>
        <View
          style={{
            width: "90%",
            height: 330,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
            alignSelf: "center",
            alignContent: "center",
            borderRadius: 50,
            marginTop: "20%",
            display: "flex",
            flexDirection: "column",
            padding: 40,
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#e52b51",
          }}
        >
          <Text
            style={{
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              alignSelf: "center",
              fontSize: 30,
              textAlign: "center",
              marginTop: 10,
              marginBottom: i18n.language.split("-")[0] === "en" ? 20 : 10,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            }}
          >
            {i18n.language.split("-")[0] === "en" ? spot.name : spot.nameAr}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "space-evenly",
              alignSelf:
                i18n.language.split("-")[0] === "en"
                  ? "flex-start"
                  : "flex-end",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection:
                  i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
                alignContent: "center",
                alignItems: "center",
                alignSelf: "flex-start",
                marginBottom: 10,
              }}
            >
              <Ionicons
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  color: "#e52b51",
                  fontSize: 30,
                }}
                name="calendar-outline"
              ></Ionicons>
              <Text
                style={{
                  fontFamily: "Ubuntu",
                  fontSize: 20,

                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
              >
                {i18n.language.split("-")[0] === "en" ? date : dateAr}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection:
                  i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
                alignContent: "center",
                alignItems: "center",
                alignSelf:
                  i18n.language.split("-")[0] === "en"
                    ? "flex-start"
                    : "flex-end",
                marginBottom: 10,
              }}
            >
              <Ionicons
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  color: "#e52b51",
                  fontSize: 30,
                }}
                name="time-outline"
              ></Ionicons>
              <Text
                style={{
                  fontFamily: "Ubuntu",
                  fontSize: 20,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
              >
                {spot.startTime}
                {spot.endTime ? ` - ${spot.endTime}` : ""}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection:
                i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
              alignContent: "center",
              alignItems: "center",
              alignSelf:
                i18n.language.split("-")[0] === "en"
                  ? "flex-start"
                  : "flex-end",
              marginBottom: i18n.language.split("-")[0] === "en" ? 10 : 0,
            }}
          >
            <Ionicons
              style={{
                marginRight: 5,
                marginLeft: 5,
                color: "#e52b51",
                fontSize: 30,
              }}
              name="pricetag-outline"
            ></Ionicons>
            <Text
              style={{
                fontFamily: "Ubuntu",
                fontSize: 20,
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? spot.price * quantity + " KD"
                : spot.price * quantity + " دك"}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignSelf: "flex-start",
              borderRadius: 25,
              borderWidth: 1,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              padding: 10,
              borderColor: "#e52b51",
              width: "80%",
              alignSelf: "center",
              height: 60,
              margin: 20,
            }}
          >
            <Ionicons
              style={{
                color: "#e52b51",
                fontFamily: "Ubuntu",
                fontSize: 35,
                marginLeft: 40,
              }}
              name="add-outline"
              onPress={handleInc}
            ></Ionicons>
            <Text
              style={{
                fontSize: 28,
                fontFamily: "Ubuntu",
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              }}
            >
              {quantity}
            </Text>
            <Ionicons
              style={{
                color: "#e52b51",
                fontFamily: "Ubuntu",
                fontSize: 35,
                marginRight: 40,
              }}
              name="remove-outline"
              onPress={handleDec}
            ></Ionicons>
          </View>
        </View>
        <Text
          style={{
            fontSize: 25,
            margin: 30,
            marginTop: 25,
            marginBottom: i18n.language.split("-")[0] === "en" ? 10 : 0,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "UbuntuBold" : "NotoBold",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            alignSelf:
              i18n.language.split("-")[0] === "en" ? "flex-start" : "flex-end",
          }}
        >
          {i18n.language.split("-")[0] === "en"
            ? "Dest Details"
            : "تفاصيل الديست"}
        </Text>
        <Text
          style={{
            fontSize: 18,
            margin: 30,
            marginTop: 5,
            marginBottom: 10,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            lineHeight: 25,
            textAlign: i18n.language.split("-")[0] === "en" ? "left" : "right",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          {i18n.language.split("-")[0] === "en" ? spot.details : spot.detailsAr}
        </Text>
      </ScrollView>
      <TouchableOpacity
        style={{
          display: "flex",
          alignSelf: "center",
          borderRadius: 25,
          height: 60,
          width: "90%",
          backgroundColor: "#e52b51",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
          margin: 25,
          justifyContent: "center",
          zIndex: 99,
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          navigation.navigate("Payment", {
            itemId: spot,
            quantity: quantity,
          });
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 22,
            alignSelf: "center",
            marginLeft: 10,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "UbuntuBold" : "NotoBold",
          }}
        >
          {i18n.language.split("-")[0] === "en"
            ? "Proceed to payment"
            : "اذهب الى الدفع"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  spotext: {
    color: "white",
    fontSize: 22,
    alignSelf: "center",
    marginLeft: 10,
    fontFamily: "UbuntuBold",
  },
  spoticon: {
    color: "white",
    fontSize: 30,
    alignSelf: "center",
    zIndex: 99,
  },
  spotthis: {
    display: "flex",
    alignSelf: "center",
    borderRadius: 25,
    height: 60,
    width: 380,
    backgroundColor: "#e52b51",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    margin: 10,
    justifyContent: "center",
    zIndex: 99,
    flexDirection: "row-reverse",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  detailsText: {
    fontSize: 25,
    margin: 30,
    marginTop: 25,
    marginBottom: 10,
    fontFamily: "Ubuntu",
  },
  details: {
    fontSize: 18,
    margin: 30,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: "Ubuntu",
    lineHeight: 25,
    textAlign: "justify",
  },
});
