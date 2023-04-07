import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  useColorScheme,
  Image,
  ImageBackground,
  StatusBar,
} from "react-native";
import { DateTime } from "luxon";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import spotStore from "../../stores/spotStore";
import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import { useNavigation } from "@react-navigation/native";
import { baseURL } from "../../stores/instance";
import organizerStore from "../../stores/organizerStore";

export default function SpotttedDetails({ route }) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const translations = {
    en: {
      details: "Booking Details",
      date: "Date",
      end: "To",
      time: "Time",
      entry: "Entry",
      location: "Location",
      scan: "Scan QR",
    },
    ar: {
      details: "تفاصيل الحجز",
      date: "التاريخ",
      end: "الى",
      time: "الوقت",
      entry: "الدخول",
      location: "الموقع",
      scan: "امسح QR",
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

  const spot = spotStore.getSpotsById(route.params.id);
  const ticket = route.params.ticket;
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  let dateEn = DateTime.fromISO(spot?.startDate)
    .setLocale("en")
    .toFormat("DDD");
  let dateAr = DateTime.fromISO(spot?.startDate)
    .setLocale("ar")
    .toFormat("DDD");

  let dateendEn = DateTime.fromISO(spot?.endDate)
    .setLocale("en")
    .toFormat("DDD");
  let dateendAr = DateTime.fromISO(spot?.endDate)
    .setLocale("ar")
    .toFormat("DDD");

  const organizer = organizerStore.getOrganizerById(spot.organizer);

  return (
    <ImageBackground
      source={{ uri: `${baseURL}${spot.image}` }}
      style={{
        flex: 1,
        paddingTop:
          Platform.OS === "android"
            ? "5%"
            : i18n.language.split("-")[0] === "en"
            ? "12%"
            : "8%",
      }}
    >
      <View
        style={{
          flex: 1,
          height: "200%",
          width: "100%",
          backgroundColor: "black",
          position: "absolute",
          opacity: 0.7,
        }}
      ></View>
      <StatusBar
        backgroundColor={colorScheme === "dark" ? "#000000" : "#f1f1f1"}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "flex-start",
          flexDirection:
            i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
        }}
      >
        <TouchableOpacity
          style={{
            marginLeft: 20,
            paddingRight: 20,
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            style={{
              color: "#f1f1f1",
              fontSize: 30,
            }}
            name={
              i18n.language.split("-")[0] === "en"
                ? "chevron-back-outline"
                : "chevron-forward-outline"
            }
          ></Ionicons>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            letterSpacing: 1,
            fontSize: 30,
            zIndex: 99,
            color: "#f1f1f1",
          }}
        >
          {i18n.language.split("-")[0] === "en"
            ? "Dest Details"
            : "تفاصيل الديست"}
        </Text>
        <TouchableOpacity
          style={{
            marginLeft: 20,
            paddingRight: 20,
          }}
          onPress={() => {
            navigation.navigate("SpottedInfo", {
              spot: spot,
              ticket: ticket,
            });
          }}
        >
          <Ionicons
            style={{
              color: "#f1f1f1",
              fontSize: 32,
            }}
            name="information-outline"
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: i18n.language.split("-")[0] === "en" ? "93%" : "90%",
        }}
      >
        <View>
          <Text
            style={{
              color: "white",
              fontSize: i18n.language.split("-")[0] === "en" ? 45 : 40,
              textAlign:
                i18n.language.split("-")[0] === "en" ? "left" : "right",
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              alignSelf: "center",
              width: "90%",
              margin: i18n.language.split("-")[0] === "en" ? 40 : 20,
            }}
          >
            {i18n.language.split("-")[0] === "en" ? spot.name : spot.nameAr}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Organizer", {
                organizer: organizer,
              })
            }
            style={{
              display: "flex",
              flexDirection:
                i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
              alignContent: "center",
              alignItems: "center",
              marginTop: i18n.language.split("-")[0] === "en" ? 5 : 0,
              margin: 20,
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                resizeMode: "cover",
                marginRight: i18n.language.split("-")[0] === "en" ? 10 : 0,
                marginLeft: i18n.language.split("-")[0] === "en" ? 0 : 10,
              }}
              source={{ uri: `${baseURL}${organizer.image}` }}
            />
            <Text
              style={{
                fontSize: 22,
                color: "#f1f1f1",
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                alignSelf: "center",
                textAlign:
                  i18n.language.split("-")[0] === "en" ? "left" : "right",
                textTransform: "capitalize",
                width: "65%",
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? organizer?.displayNameEn
                : organizer?.displayNameAr}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 20,
              marginTop: i18n.language.split("-")[0] === "en" ? 5 : 0,
              alignSelf:
                i18n.language.split("-")[0] === "en"
                  ? "flex-start"
                  : "flex-end",
            }}
          >
            <Text
              style={{
                alignSelf:
                  i18n.language.split("-")[0] === "en"
                    ? "flex-start"
                    : "flex-end",
                fontSize: 20,
                color: "#f1f1f1",
              }}
            >
              {i18n.language.split("-")[0] === "en" ? "Date" : "التاريخ"}
            </Text>
            <Text
              style={{
                fontSize: i18n.language.split("-")[0] === "en" ? 35 : 30,
                color: "#f1f1f1",
                fontFamily:
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                alignSelf:
                  i18n.language.split("-")[0] === "en"
                    ? "flex-start"
                    : "flex-end",
                marginTop: i18n.language.split("-")[0] === "en" ? 0 : -5,
              }}
            >
              {i18n.language.split("-")[0] === "en" ? dateEn : dateAr}
            </Text>
          </View>
          {spot.isMultiple && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                margin: 20,
                marginTop: i18n.language.split("-")[0] === "en" ? 5 : -5,
              }}
            >
              <Text
                style={{
                  alignSelf:
                    i18n.language.split("-")[0] === "en"
                      ? "flex-start"
                      : "flex-end",
                  fontSize: 20,
                  color: "#f1f1f1",
                }}
              >
                {i18n.language.split("-")[0] === "en" ? "To" : "الى"}
              </Text>
              <Text
                style={{
                  fontSize: i18n.language.split("-")[0] === "en" ? 35 : 30,
                  color: "#f1f1f1",
                  fontFamily:
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  alignSelf:
                    i18n.language.split("-")[0] === "en"
                      ? "flex-start"
                      : "flex-end",
                  marginTop: i18n.language.split("-")[0] === "en" ? 0 : -5,
                }}
              >
                {i18n.language.split("-")[0] === "en" ? dateendEn : dateendAr}
              </Text>
            </View>
          )}

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 20,
              marginTop: i18n.language.split("-")[0] === "en" ? 5 : -5,
              alignSelf:
                i18n.language.split("-")[0] === "en"
                  ? "flex-start"
                  : "flex-end",
            }}
          >
            <Text
              style={{
                alignSelf:
                  i18n.language.split("-")[0] === "en"
                    ? "flex-start"
                    : "flex-end",
                fontSize: 20,
                color: "#f1f1f1",
              }}
            >
              {i18n.language.split("-")[0] === "en" ? "Time" : "الوقت"}
            </Text>
            <Text
              style={{
                fontSize: i18n.language.split("-")[0] === "en" ? 35 : 30,
                color: "#f1f1f1",
                fontFamily: "UbuntuBold",
                alignSelf:
                  i18n.language.split("-")[0] === "en"
                    ? "flex-start"
                    : "flex-end",
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? spot.endTime
                  ? `${spot.startTime} - ${spot.endTime}`
                  : spot.startTime
                : spot.endTime
                ? `${spot.endTime} - ${spot.startTime}`
                : spot.startTime}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 20,
              marginTop: i18n.language.split("-")[0] === "en" ? 5 : -5,
              alignSelf:
                i18n.language.split("-")[0] === "en"
                  ? "flex-start"
                  : "flex-end",
            }}
          >
            <Text
              style={{
                alignSelf:
                  i18n.language.split("-")[0] === "en"
                    ? "flex-start"
                    : "flex-end",
                fontSize: 20,
                color: "#f1f1f1",
              }}
            >
              {i18n.language.split("-")[0] === "en" ? "Entry" : "الدخول"}
            </Text>
            <Text
              style={{
                fontSize: i18n.language.split("-")[0] === "en" ? 35 : 30,
                color: "#f1f1f1",
                fontFamily:
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                alignSelf:
                  i18n.language.split("-")[0] === "en"
                    ? "flex-start"
                    : "flex-end",
                marginTop: i18n.language.split("-")[0] === "en" ? 0 : -5,
              }}
            >
              {ticket.isFree === false ? (
                <>
                  <Text
                    style={{
                      fontSize: i18n.language.split("-")[0] === "en" ? 35 : 30,
                      color: "#f1f1f1",
                      fontFamily:
                        i18n.language.split("-")[0] === "en"
                          ? "UbuntuBold"
                          : "NotoBold",
                      alignSelf:
                        i18n.language.split("-")[0] === "en"
                          ? "flex-start"
                          : "flex-end",
                    }}
                  >
                    {i18n.language.split("-")[0] === "en"
                      ? ticket.amount + " tickets"
                      : ticket.amount + " تذاكر"}
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: i18n.language.split("-")[0] === "en" ? 35 : 30,
                      color: "#f1f1f1",
                      fontFamily:
                        i18n.language.split("-")[0] === "en"
                          ? "UbuntuBold"
                          : "NotoBold",
                      alignSelf:
                        i18n.language.split("-")[0] === "en"
                          ? "flex-start"
                          : "flex-end",
                    }}
                  >
                    {i18n.language.split("-")[0] === "en" ? "Free" : "مجاني"}
                  </Text>
                </>
              )}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "#f1f1f1",
              width: "60%",
              height: 65,
              borderRadius: 20,
              alignSelf: "center",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              flexDirection:
                i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
              marginBottom: 15,
            }}
            onPress={() => Linking.openURL(spot.location)}
          >
            <Ionicons
              style={{
                fontSize: 30,
                zIndex: 99,
                color: "#e52b51",
              }}
              name="location-outline"
            ></Ionicons>
            <Text
              style={{
                color: "#e52b51",
                fontSize: 20,
                fontFamily:
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              {i18n.language.split("-")[0] === "en" ? "Location" : "الموقع"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "90%",
              height: 80,
              borderRadius: 30,
              backgroundColor: "#e52b51",
              alignSelf: "center",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              flexDirection:
                i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
            }}
            onPress={() =>
              navigation.navigate("SpottedScanner", {
                spot: spot,
                ticket: ticket,
              })
            }
          >
            <Ionicons
              style={{
                fontSize: 30,
                zIndex: 99,
                color: "#f1f1f1",
              }}
              name="scan"
            ></Ionicons>
            <Text
              style={{
                color: "#f1f1f1",
                fontSize: 22,
                fontFamily:
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              {i18n.language.split("-")[0] === "en" ? "Scan QR" : "امسح Qr"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
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
    backgroundColor: "#e52b51",
    borderRadius: 50,
    margin: 15,
    marginTop: 40,
    height: "78%",
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 150,
    alignItems: "center",
    alignSelf: "center",
    marginRight: 35,
  },
  infoContainer: {
    display: "flex",
    position: "absolute",
    width: 374,
    flexDirection: "column",
    flexWrap: "nowrap",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    padding: 35,
    alignSelf: "flex-end",
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
    marginTop: 770,
  },
  ticket: {
    width: 380,
    height: 620,
    left: 25,
    top: 150,
  },
  ownerthumb: {
    width: 60,
    height: 60,
    borderRadius: 50,
    zIndex: -1,
    marginRight: 10,
    marginLeft: 10,
    resizeMode: "cover",
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
