import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  useColorScheme,
} from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { baseURL } from "../../stores/instance";
import spotStore from "../../stores/spotStore";
import React from "react";
import organizerStore from "../../stores/organizerStore";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import "moment/locale/ar";

export default function SpotttedDetails({ navigation, route }) {
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      details: "Spot Details",
      date: "Date",
      time: "Time",
      entry: "Entry",
      location: "location",
      scan: "scan QR",
    },
    ar: {
      details: "تفاصيل النقطة",
      date: "التاريخ",
      time: "الوقت",
      entry: "الدخول",
      location: "الموقع",
      scan: "امسح QR",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  const spot = spotStore.getSpotsById(route.params.id);
  const organizer = organizerStore.getOrganizerById(spot.organizer);
  const ticket = route.params.ticket;
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  let dateEn = moment(spot.startDate).locale("en").format("LL");
  let dateAr = moment(spot.startDate).locale("ar").format("LL");
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",

        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#e0e3e7",
          height: 6,
          width: 150,
          margin: 20,
          alignSelf: "center",
          borderRadius: "100%",
        }}
      ></View>
      <Text
        style={{
          fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
          alignSelf: "center",
          letterSpacing: 4,
          fontSize: 40,
          color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          alignSelf: "center",
          marginTop: i18n.locale === "en-US" ? "9%" : 0,
          paddingTop: i18n.locale === "en-US" ? 0 : 30,
          marginBottom: i18n.locale === "en-US" ? 0 : -30,
        }}
      >
        {i18n.t("details")}
      </Text>

      <View
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
          backgroundColor: "#9279f7",
          borderRadius: "50%",
          margin: 15,
          marginTop: 40,
          height: "78%",
        }}
      >
        <Text
          style={{
            color: "white",
            margin: 50,
            fontSize: 33,
            alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
            textAlign: i18n.locale === "en-US" ? "left" : "right",
            marginBottom: 15,
            fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}
        >
          {i18n.locale === "en-US" ? spot.name : spot.nameAr}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 40,
            marginTop: 0,
            marginBottom: 0,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}
        >
          <View
            style={{
              marginBottom: 0,
              display: "flex",
              flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Image
              style={styles.ownerthumb}
              source={{ uri: `${baseURL}${organizer.image}` }}
            />
            <Text style={styles.ownername}>{organizer.username}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              margin: 10,
            }}
          >
            <Text
              style={{
                fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                marginTop: i18n.locale === "en-US" ? 10 : -5,
                marginBottom: i18n.locale === "en-US" ? 10 : -5,
                fontSize: 25,
                color: "white",
                marginLeft: 0,
                marginRight: 0,
                alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
              }}
            >
              {i18n.t("date")}
            </Text>
            <Text
              style={{
                fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                marginTop: i18n.locale === "en-US" ? 0 : -10,
                marginBottom: i18n.locale === "en-US" ? 0 : -10,
                fontSize: 25,
                color: "white",
                alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
              }}
            >
              {i18n.locale === "en-US" ? dateEn : dateAr}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",

              margin: 10,
            }}
          >
            <Text
              style={{
                fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                marginTop: i18n.locale === "en-US" ? 10 : -5,
                marginBottom: i18n.locale === "en-US" ? 10 : -5,
                fontSize: 25,
                color: "white",
                marginLeft: 0,
                marginRight: 0,
                alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
              }}
            >
              {i18n.t("time")}
            </Text>
            <Text
              style={{
                alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
                fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                marginTop: i18n.locale === "en-US" ? 0 : -10,
                marginBottom: i18n.locale === "en-US" ? 0 : -10,
                fontSize: 25,
                color: "white",
              }}
            >
              {spot.startTime}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              margin: 10,
            }}
          >
            <Text
              style={{
                fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                marginTop: i18n.locale === "en-US" ? 10 : -5,
                marginBottom: i18n.locale === "en-US" ? 10 : -5,
                fontSize: 25,
                margin: 10,
                marginLeft: 0,
                marginRight: 0,
                color: "white",
                alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
              }}
            >
              {i18n.t("entry")}
            </Text>
            <Text
              style={{
                alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
                fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                marginTop: i18n.locale === "en-US" ? 0 : -10,
                marginBottom: i18n.locale === "en-US" ? 0 : -10,
                fontSize: 25,
                color: "white",
              }}
            >
              {ticket.isFree === false ? (
                <>
                  <Text
                    style={{
                      fontFamily:
                        i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                      marginTop: i18n.locale === "en-US" ? 0 : -10,
                      marginBottom: i18n.locale === "en-US" ? 0 : -10,
                      fontSize: 25,
                      color: "white",
                      alignSelf:
                        i18n.locale === "en-US" ? "flex-start" : "flex-end",
                    }}
                  >
                    {i18n.locale === "en-US"
                      ? ticket.amount + "x tickets"
                      : "تذاكر X" + ticket.amount}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      fontFamily:
                        i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                      marginTop: i18n.locale === "en-US" ? 0 : -10,
                      marginBottom: i18n.locale === "en-US" ? 0 : -10,
                      fontSize: 25,
                      color: "white",
                      alignSelf:
                        i18n.locale === "en-US" ? "flex-start" : "flex-end",
                    }}
                  >
                    {i18n.locale === "en-US" ? "Free" : "مجاني"}
                  </Text>
                </>
              )}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            borderColor: "#f7f7f7",
            borderWidth: 1,
            width: 160,
            height: 50,
            borderRadius: 10,
            margin: 50,
            marginBottom: 0,
            marginTop: 35,
            alignSelf: "center",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}
          onPress={() => Linking.openURL(spot.location)}
        >
          <Ionicons
            style={{
              fontSize: 32,
              zIndex: 99,
              color: "white",
            }}
            name="location"
          ></Ionicons>

          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            {i18n.t("location")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 300,
            height: 60,
            borderRadius: 10,
            backgroundColor: "white",
            margin: 50,
            marginBottom: 0,
            marginTop: 15,
            alignSelf: "center",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}
          onPress={() => navigation.navigate("SpottedScanner", { spot: spot })}
        >
          <Ionicons
            style={{
              fontSize: 35,
              zIndex: 99,
              color: "#9279f7",
            }}
            name="scan"
          ></Ionicons>

          <Text
            style={{
              color: "#9279f7",
              fontSize: 20,
              fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            {i18n.t("scan")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: "#9279f7",
    borderRadius: "50%",
    margin: 15,
    marginTop: 40,
    height: "78%",
  },
  thanks: {
    fontFamily: "UbuntuLight",
    alignSelf: "center",
    letterSpacing: 4,
    fontSize: 40,
    color: "#000000",
    alignSelf: "center",
    marginTop: "9%",
  },
  confirmMessage: {
    position: "absolute",
    width: 301.52,
    height: 19.79,
    left: 69,
    top: 133.21,
    fontFamily: "Ubuntu",
    fontSize: 12.806,
    lineHeight: 15,
    textAlign: "center",
    alignSelf: "center",

    color: "#000000",
  },
  QR: {
    width: 250,
    height: 250,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.53,
    shadowRadius: 10,
    elevation: 4,
    marginTop: 30,
    borderRadius: 40,
  },
  BookingDetails: {
    color: "white",
    fontSize: 24,
    marginTop: 30,
    marginLeft: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: 20,
    fontFamily: "UbuntuBold",
  },
  tickets: {
    color: "white",
    marginTop: 30,
    fontSize: 30,
    alignSelf: "center",
    fontFamily: "Ubuntu",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  location: {
    color: "white",
    fontSize: 20,
    fontFamily: "Ubuntu",
    marginLeft: 10,
    marginRight: 10,
  },

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
    marginTop: 770,
  },
  ticket: {
    width: 380,
    height: 620,
    left: 25,
    top: 150,
  },
  ownerthumb: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    zIndex: -1,
    marginRight: 10,
    marginLeft: 10,
  },
  ownername: {
    color: "white",
    fontSize: 22,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontFamily: "UbuntuBold",
    textTransform: "capitalize",
  },
});
