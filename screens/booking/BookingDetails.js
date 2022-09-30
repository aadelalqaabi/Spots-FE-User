import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import moment from "moment";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

export default function BookingDetails({ navigation, route }) {
  const spot = route.params.itemId;
  const tickets = route.params.quantity;
  const [quantity, setQuantity] = useState(tickets);
  const [checkSeats, setCheckSeats] = useState(quantity);
  const translations = {
    en: {
      Settings: "Settings",
      edit: "Edit Profile",
      Account: "Account",
      log: "Log out",
    },
    ar: {
      Settings: "الاعدادات",
      edit: "تعديل الحساب",
      Account: "الحساب",
      log: "تسجيل الخروج",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  let date = moment(spot.startDate).format("LL");

  const handleInc = () => {
    setCheckSeats(checkSeats + 1);
    if (spot.seats >= checkSeats + 1) {
      setQuantity(quantity + 1);
      setCheckSeats(quantity + 1);
    } else {
      i18n.locale === "en-US"
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
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <Ionicons
          style={{
            position: "absolute",
            fontSize: 35,
            marginTop: 80,
            marginLeft: 20,
          }}
          name="chevron-back-outline"
          onPress={() => navigation.goBack()}
        ></Ionicons>
        <View
          style={{
            width: 360,
            height: 330,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            backgroundColor: "white",
            alignSelf: "center",
            alignContent: "center",
            borderRadius: 50,
            marginTop: 150,
            display: "flex",
            flexDirection: "column",
            padding: 40,
            justifyContent: "center",
            borderWidth: 1,
            // borderColor: "#C9fb5f",
            borderColor: "#9279f7",
          }}
        >
          <Text
            style={{
              fontFamily: "UbuntuBold",
              alignSelf: "center",
              fontSize: 30,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {spot.name}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "space-evenly",
              alignSelf: "flex-start",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                style={{
                  marginRight: 5,
                  color: "#9279f7",
                  fontSize: 30,
                }}
                name="calendar-outline"
              ></Ionicons>
              <Text
                style={{ fontFamily: "Ubuntu", fontSize: 20, marginRight: 20 }}
              >
                {date}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                style={{ marginRight: 5, color: "#9279f7", fontSize: 30 }}
                name="time-outline"
              ></Ionicons>
              <Text style={{ fontFamily: "Ubuntu", fontSize: 20 }}>
                {spot.startTime}
              </Text>
            </View>
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
              borderColor: "#9279f7",
              width: "80%",
              alignSelf: "center",
              height: 60,
              margin: 20,
            }}
          >
            <Ionicons
              style={{
                color: "#9279f7",
                fontFamily: "Ubuntu",
                fontSize: 35,
                marginLeft: 40,
              }}
              name="add-outline"
              onPress={handleInc}
            ></Ionicons>
            <Text style={{ fontSize: 28, fontFamily: "Ubuntu" }}>
              {quantity}
            </Text>
            <Ionicons
              style={{
                color: "#9279f7",
                fontFamily: "Ubuntu",
                fontSize: 35,
                marginRight: 40,
              }}
              name="remove-outline"
              onPress={handleDec}
            ></Ionicons>
          </View>
          <Text
            style={{ alignSelf: "center", fontFamily: "Ubuntu", fontSize: 35 }}
          >
            Total: {spot.price * quantity} KD
          </Text>
        </View>
        <Text style={styles.detailsText}>Spot Details</Text>
        <Text style={styles.details}>{spot.details}</Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.spotthis}
        onPress={() => {
          navigation.navigate("Payment", {
            itemId: spot,
            quantity: quantity,
          });
        }}
      >
        <Text style={styles.spotext}>Proceed to Payment</Text>
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
    backgroundColor: "#9279f7",
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
