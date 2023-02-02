import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  useColorScheme,
  SafeAreaView,
} from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { baseURL } from "../../stores/instance";
import spotStore from "../../stores/spotStore";
import React from "react";
import organizerStore from "../../stores/organizerStore";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import "moment/locale/ar";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import { useNavigation } from "@react-navigation/native";

export default function SpotttedDetails({ route }) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const translations = {
    en: {
      details: "Booking Details",
      date: "Date",
      time: "Time",
      entry: "Entry",
      location: "Location",
      scan: "Scan QR",
    },
    ar: {
      details: "تفاصيل الحجز",
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
  const ticket = route.params.ticket;
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }
  let dateEn = moment(spot?.startDate).locale("en").format("DD MMM");
  let dateAr = moment(spot?.startDate).locale("ar").format("MMM DD");
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#e52b51",
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          marginTop:
            i18n.locale === "en-US" || i18n.locale === "en" ? "10%" : "2%",
          marginBottom:
            i18n.locale === "en-US" || i18n.locale === "en" ? "6%" : "6%",
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "flex-start"
                : "flex-end",
            position: "absolute",
            marginLeft: 20,
            paddingRight: 20,
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontSize: 30,
            }}
            name={
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "chevron-back-outline"
                : "chevron-forward-outline"
            }
          ></Ionicons>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "Ubuntu"
                : "Noto",
            letterSpacing: 1,
            fontSize: 35,
            zIndex: 99,
            color: "#f1f1f1",
            alignSelf: "center",
          }}
        >
          {i18n.t("details")}
        </Text>
      </View>

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
          backgroundColor: colorScheme === "light" ? "#f1f1f1" : "#1b1b1b",
          borderRadius: 50,
          margin: 15,
          marginTop: i18n.locale === "en-US" || i18n.locale === "en" ? 30 : 10,
          height: "85%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            backgroundColor: "#e52b51",
            position: "absolute",
            width: 90,
            height: 90,
            alignSelf: "center",
            borderRadius: 100,
            marginTop: -50,
          }}
        ></View>
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            zIndex: -1,
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "56%",
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              alignItems: "center",
              alignSelf: "center",
              zIndex: -1,
            }}
            source={{
              uri: baseURL + spot?.image,
            }}
          />
          <View
            style={{
              width: "100%",
              position: "absolute",
              alignSelf: "center",
              backgroundColor: "black",
              height: "56%",
              opacity: 0.3,
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
            }}
          ></View>
          <Text
            style={{
              color: "white",
              position: "absolute",
              fontSize: 28,
              marginLeft: 30,
              paddingRight: 30,
              textAlign:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "left"
                  : "right",
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              alignSelf:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "flex-start"
                  : "flex-end",
              marginTop:
                i18n.locale === "en-US" || i18n.locale === "en" ? "89%" : "86%",
              shadowColor: "#1b1b1b",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 1,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? spot.name
              : spot.nameAr}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            alignSelf: "center",
            position: "absolute",
            // backgroundColor: "red",
            margin: "7%",
            marginTop: "113%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignSelf: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignSelf: "center",
                margin: 10,
                marginTop: 0,
                borderRightWidth: 1.5,
                borderColor: "#e0e3e7",
                paddingRight: 20,
              }}
            >
              <Text
                style={{
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "Ubuntu"
                      : "Noto",
                  marginTop:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 10 : -5,
                  marginBottom:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 10 : -5,
                  fontSize: 20,
                  color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
                  marginLeft: 0,
                  marginRight: 0,
                  alignSelf: "center",
                  opacity: 0.5,
                }}
              >
                {i18n.t("date")}
              </Text>
              <Text
                style={{
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  marginTop:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 0 : -10,
                  marginBottom:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 0 : -10,
                  fontSize: 22,
                  color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
                  alignSelf: "center",
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? dateEn
                  : dateAr}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                margin: 10,
                marginTop: 0,
                paddingRight: 20,
                borderRightWidth: 1.5,
                borderColor: "#e0e3e7",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "Ubuntu"
                      : "Noto",
                  marginTop:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 10 : -5,
                  marginBottom:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 10 : -5,
                  fontSize: 20,
                  color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
                  marginLeft: 0,
                  marginRight: 0,
                  alignSelf: "center",
                  opacity: 0.5,
                }}
              >
                {i18n.t("time")}
              </Text>
              <Text
                style={{
                  alignSelf:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "flex-start"
                      : "flex-end",
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  marginTop:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 0 : -10,
                  marginBottom:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 0 : -10,
                  fontSize: 22,
                  color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
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
                marginTop: 0,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "Ubuntu"
                      : "Noto",
                  marginTop:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 10 : -5,
                  marginBottom:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 10 : -5,
                  fontSize: 20,
                  margin: 10,
                  marginLeft: 0,
                  marginRight: 0,
                  color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
                  alignSelf: "center",
                  opacity: 0.5,
                }}
              >
                {i18n.t("entry")}
              </Text>
              <Text
                style={{
                  alignSelf:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "flex-start"
                      : "flex-end",
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  marginTop:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 0 : -10,
                  marginBottom:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 0 : -10,
                  fontSize: 22,
                  color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
                }}
              >
                {ticket.isFree === false ? (
                  <>
                    <Text
                      style={{
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "UbuntuBold"
                            : "NotoBold",
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 0
                            : -10,
                        marginBottom:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 0
                            : -10,
                        fontSize: 22,
                        color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
                        alignSelf:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "flex-start"
                            : "flex-end",
                      }}
                    >
                      {i18n.locale === "en-US" || i18n.locale === "en"
                        ? ticket.amount + " tickets"
                        : ticket.amount + " تذاكر"}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text
                      style={{
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "UbuntuBold"
                            : "NotoBold",
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 0
                            : -10,
                        marginBottom:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 0
                            : -10,
                        fontSize: 22,
                        color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
                        alignSelf:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "flex-start"
                            : "flex-end",
                      }}
                    >
                      {i18n.locale === "en-US" || i18n.locale === "en"
                        ? "Free"
                        : "مجاني"}
                    </Text>
                  </>
                )}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignSelf: "flex-end",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                width: "70%",
                height: 55,
                margin: 50,
                marginBottom: 0,
                marginTop: 15,
                borderRadius: 50,
                alignSelf: "center",
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                flexDirection:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "row"
                    : "row-reverse",
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
                  fontSize: 28,
                  zIndex: 99,
                  color: "#e52b51",
                }}
                name="location-outline"
              ></Ionicons>
              <Text
                style={{
                  color: "#e52b51",
                  fontSize: 18,
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                {i18n.t("location")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "102%",
                height: 80,
                borderRadius: 50,
                backgroundColor: "#e52b51",
                margin: 50,
                marginBottom: -30,
                marginTop: "5%",
                alignSelf: "center",
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                flexDirection:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "row"
                    : "row-reverse",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                elevation: 4,
              }}
              onPress={() =>
                navigation.navigate("SpottedScanner", { spot: spot })
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
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                {i18n.t("scan")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
    resizeMode: "contain",
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
