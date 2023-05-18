import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Modal,
  StatusBar,
} from "react-native";
import React, { useCallback, useState } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import organizerStore from "../../stores/organizerStore";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import ticketStore from "../../stores/ticketStore";

export default function SpottedInfo({ route }) {
  const spot = route.params.spot;
  const ticket = route.params.ticket;
  const organizer = organizerStore.getOrganizerById(spot.organizer);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const translations = {
    en: {
      explore: "Explore",
    },
    ar: {
      explore: "اكتشف",
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

  const [showDeleteMssg, setShowDeleteMssg] = useState(false);
  const toggleAlertShowDeleteMssg = useCallback(() => {
    setShowDeleteMssg(!showDeleteMssg);
  }, [showDeleteMssg]);

  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
    Cabin: require("../../assets/fonts/Cabin.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <SafeAreaView>
        <StatusBar
          backgroundColor={colorScheme === "dark" ? "#000000" : "#f1f1f1"}
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
        <ScrollView style={{ height: "100%" }}>
          <View
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "6%",
              marginBottom: "4%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                zIndex: 99,
                alignSelf:
                  i18n.language.split("-")[0] === "en"
                    ? "flex-start"
                    : "flex-end",
                position: "absolute",
              }}
            >
              <Ionicons
                style={{
                  color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                  zIndex: 99,
                  fontSize: 35,
                  margin: 15,
                  width: "100%",
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
                fontSize: 26,
                alignSelf: "center",
                textAlign: "center",
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                width: "70%",
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
              }}
            >
              {i18n.language.split("-")[0] === "en" ? "Information" : "معلومات"}
            </Text>
          </View>
          <View style={{ marginTop: 0 }}>
            <Text
              style={{
                fontSize: 20,
                alignSelf:
                  i18n.language.split("-")[0] === "en"
                    ? "flex-start"
                    : "flex-end",
                textAlign: "center",
                fontFamily:
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                margin: 20,
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                marginTop: i18n.language.split("-")[0] === "en" ? 10 : 0,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Dest Details"
                : "تفاصيل الوجهة"}
            </Text>
            <Text
              style={{
                fontSize: 20,
                alignSelf:
                  i18n.language.split("-")[0] === "en"
                    ? "flex-start"
                    : "flex-end",
                textAlign:
                  i18n.language.split("-")[0] === "en" ? "left" : "right",
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Cabin" : "Noto",
                margin: 20,
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                marginTop: i18n.language.split("-")[0] === "en" ? -10 : -20,
                lineHeight: 40,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? spot.details
                : spot.detailsAr}
            </Text>
          </View>
          <View style={{ marginTop: 0 }}>
            <Text
              style={{
                fontSize: 20,
                alignSelf:
                  i18n.language.split("-")[0] === "en"
                    ? "flex-start"
                    : "flex-end",
                textAlign: "center",
                fontFamily:
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                margin: 20,
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                marginTop: i18n.language.split("-")[0] === "en" ? 10 : 0,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Contact Info"
                : "ملعومات الاتصال"}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection:
                  i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
                alignContent: "center",
                alignItems: "center",
                margin: 15,
                marginBottom: 10,
                marginTop: 0,
              }}
            >
              <Ionicons
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  color: "#e52b51",
                  fontSize: 32,
                  transform: [
                    {
                      scaleX: i18n.language.split("-")[0] === "en" ? 1 : -1,
                    },
                  ],
                }}
                name="logo-instagram"
              ></Ionicons>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderColor: "#e52b51",
                }}
              >
                <Text
                  onPress={() =>
                    Linking.openURL(
                      `https://www.instagram.com/${spot.instagram}`
                    )
                  }
                  style={{
                    fontFamily:
                      i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                    fontSize: 20,
                    color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                    marginBottom: i18n.language.split("-")[0] === "en" ? 5 : -5,
                  }}
                >
                  {spot.instagram}
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
                margin: 15,
                marginBottom: 10,
                marginTop: 0,
              }}
            >
              <Ionicons
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  color: "#e52b51",
                  fontSize: 32,
                  transform: [
                    {
                      scaleX: i18n.language.split("-")[0] === "en" ? 1 : -1,
                    },
                  ],
                }}
                name="ios-globe-outline"
              ></Ionicons>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderColor: "#e52b51",
                }}
              >
                <Text
                  onPress={() => Linking.openURL(`${spot.website}`)}
                  style={{
                    fontFamily:
                      i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                    fontSize: 20,
                    color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                    marginBottom: i18n.language.split("-")[0] === "en" ? 5 : -5,
                  }}
                >
                  Open website
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginLeft: 20,
              paddingRight: 20,
              marginTop: 15,
              display: "flex",
              flexDirection:
                i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
              alignContent: "center",
              alignItems: "center",
              marginBottom: "5%",
            }}
            onPress={() => {
              if (ticket.isFree === true) {
                toggleAlertShowDeleteMssg();
              } else {
                Alert.alert(
                  i18n.language.split("-")[0] === "en"
                    ? "This is a paid Dest"
                    : "هذه نقطة مدفوعة",
                  i18n.language.split("-")[0] === "en"
                    ? "Contact us to cancel your booking"
                    : "تواصل معنا لالغاء الحجز",
                  [
                    {
                      text:
                        i18n.language.split("-")[0] === "en" ? "OK" : "حسنا",
                      onPress: () => {},
                    },
                  ]
                );
              }
            }}
          >
            <Ionicons
              style={{
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                fontSize: 25,
                paddingRight: i18n.language.split("-")[0] === "en" ? 5 : 0,
                paddingLeft: i18n.language.split("-")[0] === "en" ? 0 : 5,
              }}
              name="trash-outline"
            ></Ionicons>
            <Text
              style={{
                fontSize: 20,
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Delete Dest"
                : "حذف الوجهه"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      {/* Delete Dest Modal */}
      <Modal
        transparent={true}
        visible={showDeleteMssg}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "white",
              padding: 25,
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              borderColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                marginBottom: 20,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Do You Want to Delete this Dest?"
                : "هل تريد حذف هذه النقطة؟"}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "25%",
                  backgroundColor: "#e52b51",
                  borderRadius: 50,
                  height: 40,
                  justifyContent: "center",
                }}
                onPress={() =>
                  ticketStore
                    .deleteTicket(ticket._id)
                    .then(navigation.navigate("MySpots"))
                }
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#f1f1f1",
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.language.split("-")[0] === "en" ? "Ok" : "تسجيل الخروج"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "25%",
                  backgroundColor: "#e52b51",
                  borderRadius: 50,
                  height: 40,
                  marginLeft: 50,
                  justifyContent: "center",
                }}
                onPress={() => toggleAlertShowDeleteMssg()}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#f1f1f1",
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.language.split("-")[0] === "en" ? "Cancel" : "إلغاء"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Delete Dest Modal */}
    </>
  );
}
const styles = StyleSheet.create({});
