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
} from "react-native";
import React from "react";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
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
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
    Cabin: require("../../assets/fonts/Cabin.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <ScrollView style={{ height: "100%" }}>
        <View
          style={{
            display: "flex",
            flexDirection:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "row"
                : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "cnter",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ zIndex: 99 }}
          >
            <Ionicons
              style={{
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                zIndex: 99,
                fontSize: 35,
                margin: 15,
                width: "100%",
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
              fontSize: 26,
              alignSelf: "center",
              textAlign: "center",
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              width: "70%",
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? "Information"
              : "معلومات"}
          </Text>
        </View>
        <View style={{ marginTop: 0 }}>
          <Text
            style={{
              fontSize: 20,
              alignSelf:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "flex-start"
                  : "flex-end",
              textAlign: "center",
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              margin: 20,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              marginTop:
                i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 0,
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? "Dest Details"
              : "تفاصيل الوجهة"}
          </Text>
          <Text
            style={{
              fontSize: 20,
              alignSelf:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "flex-start"
                  : "flex-end",
              textAlign:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "left"
                  : "right",
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Cabin"
                  : "Noto",
              margin: 20,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              marginTop:
                i18n.locale === "en-US" || i18n.locale === "en" ? -10 : -20,
              lineHeight: 40,
              textAlign: "justify",
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? spot.details
              : spot.detailsAr}
          </Text>
        </View>
        <View style={{ marginTop: 0 }}>
          <Text
            style={{
              fontSize: 20,
              alignSelf:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "flex-start"
                  : "flex-end",
              textAlign: "center",
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              margin: 20,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              marginTop:
                i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 0,
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? "Contact Info"
              : "ملعومات الاتصال"}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "row"
                  : "row-reverse",
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
                    scaleX:
                      i18n.locale === "en-US" || i18n.locale === "en" ? 1 : -1,
                  },
                ],
              }}
              name="ios-call-outline"
            ></Ionicons>
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: "#e52b51",
              }}
            >
              <Text
                onPress={() => Linking.openURL(`tel:${organizer.phone}`)}
                style={{
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "Ubuntu"
                      : "Noto",
                  fontSize: 20,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                  marginBottom:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 5 : -5,
                }}
              >
                {organizer.phone}
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
                    scaleX:
                      i18n.locale === "en-US" || i18n.locale === "en" ? 1 : -1,
                  },
                ],
              }}
              name="mail-outline"
            ></Ionicons>
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: "#e52b51",
              }}
            >
              <Text
                onPress={() => Linking.openURL(`mailto:${organizer.email}`)}
                style={{
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "Ubuntu"
                      : "Noto",
                  fontSize: 20,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                  marginBottom:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 5 : -5,
                }}
              >
                {organizer.email}
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
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "row"
                : "row-reverse",
            alignContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            if (ticket.isFree === true) {
              Alert.alert(
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Do You Want to Delete this Dest?"
                  : "هل تريد حذف هذه النقطة؟",
                "",
                [
                  {
                    text:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "Cancel"
                        : "الغاء",
                    onPress: () => {},
                    style: "cancel",
                  },
                  {
                    text:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "Yes"
                        : "نعم",
                    onPress: () => {
                      ticketStore.deleteTicket(ticket._id);
                      navigation.navigate("MySpots");
                    },
                  },
                ]
              );
            } else {
              Alert.alert(
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "This is a paid Dest"
                  : "هذه نقطة مدفوعة",
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Contact us to cancel your booking"
                  : "تواصل معنا لالغاء الحجز",
                [
                  {
                    text:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "OK"
                        : "حسنا",
                    onPress: () => {},
                  },
                ]
              );
            }
          }}
        >
          <Ionicons
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontSize: 22,
              paddingRight:
                i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 0,
              paddingLeft:
                i18n.locale === "en-US" || i18n.locale === "en" ? 0 : 10,
            }}
            name="trash-outline"
          ></Ionicons>
          <Text
            style={{
              fontSize: 20,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? "Delete Dest"
              : "حذف الوجهه"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
