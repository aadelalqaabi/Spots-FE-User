import { StyleSheet, Text, useColorScheme, View, Image } from "react-native";
import React from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import * as Localization from "expo-localization";
import { useFonts } from "expo-font";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import { baseURL } from "../../stores/instance";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import organizerStore from "../../stores/organizerStore";

export default function RegisteredNotificationItem({ organizerId }) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const organizer = organizerStore.getOrganizerById(organizerId);
  const translations = {
    en: {
      Users: "users",
    },
    ar: {
      Users: "متابعون",
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
    <TouchableOpacity
      style={{
        margin: "3%",
        marginBottom: 0,
        backgroundColor: colorScheme === "light" ? "#cacaca" : "#282828",
        borderRadius: 25,
        boxShadow: "0px 0px 10px 5px rgba(0,0,0,12.75)",
      }}
      onPress={() => {
        navigation.navigate("Organizer", {
          organizer: organizer,
        });
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection:
            i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
          alignItems: "center",
          margin: "5%",
          marginRight: "10%",
          marginLeft: "10%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection:
              i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              backgroundColor: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              width: 55,
              height: 55,
              borderRadius: 150,
              alignItems: "center",
              alignSelf: "center",
            }}
            source={{
              uri: baseURL + organizer?.image,
            }}
          />
          <Text
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",

              fontSize: 20,
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              marginLeft: i18n.language.split("-")[0] === "en" ? 10 : 0,
              marginRight: i18n.language.split("-")[0] === "en" ? 0 : 10,
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? organizer?.displayNameEn
              : organizer?.displayNameAr}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontSize: 20,
              fontFamily: "UbuntuBold",
            }}
          >
            {organizer.registerdUsers ? organizer.registerdUsers.length : 0}
          </Text>
          <Text
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontSize: 15,
              fontFamily: "Ubuntu",
            }}
          >
            {i18n.language.split("-")[0] === "en" ? "Subscribers" : "مشتركين"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
