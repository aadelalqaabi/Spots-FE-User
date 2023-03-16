import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  useColorScheme,
  Modal,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { useFonts } from "expo-font";
import moment from "moment";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import "moment/locale/ar";
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
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }
  let date = moment(spot.startDate).locale("en").format("LL");
  let dateAr = moment(spot.startDate).locale("ar").format("LL");

  const handleInc = () => {
    setCheckSeats(checkSeats + 1);
    if (spot.seatsRemaining >= checkSeats + 1) {
      setQuantity(quantity + 1);
      setCheckSeats(quantity + 1);
    } else {
      i18n.locale === "en-US" || i18n.locale === "en"
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
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              alignSelf: "center",
              fontSize: 30,
              textAlign: "center",
              marginTop: 10,
              marginBottom:
                i18n.locale === "en-US" || i18n.locale === "en" ? 20 : 10,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? spot.name
              : spot.nameAr}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "space-evenly",
              alignSelf:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "flex-start"
                  : "flex-end",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "row"
                    : "row-reverse",
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
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? date
                  : dateAr}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "row"
                    : "row-reverse",
                alignContent: "center",
                alignItems: "center",
                alignSelf:
                  i18n.locale === "en-US" || i18n.locale === "en"
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
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "row"
                  : "row-reverse",
              alignContent: "center",
              alignItems: "center",
              alignSelf:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "flex-start"
                  : "flex-end",
              marginBottom:
                i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 0,
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
              {i18n.locale === "en-US" || i18n.locale === "en"
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
            marginBottom:
              i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 0,
            fontFamily:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "UbuntuBold"
                : "NotoBold",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            alignSelf:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "flex-start"
                : "flex-end",
          }}
        >
          {i18n.t("detail")}
        </Text>
        <Text
          style={{
            fontSize: 18,
            margin: 30,
            marginTop: 5,
            marginBottom: 10,
            fontFamily:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "Ubuntu"
                : "Noto",
            lineHeight: 25,
            textAlign:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "left"
                : "right",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          {i18n.locale === "en-US" || i18n.locale === "en"
            ? spot.details
            : spot.detailsAr}
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
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "UbuntuBold"
                : "NotoBold",
          }}
        >
          {i18n.t("payment")}
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
