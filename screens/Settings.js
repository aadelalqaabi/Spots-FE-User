import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import React from "react";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import { useNavigation } from "@react-navigation/native";
import authStore from "../stores/authStore";
import { Alert } from "react-native";
import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";

export default function Settings() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const translations = {
    en: {
      Settings: "Settings",
      edit: "Edit Profile",
      Account: "Account",
      log: "Log out",
      Change: "Change Password",
    },
    ar: {
      Settings: "الاعدادات",
      edit: "تعديل الحساب",
      Account: "الحساب",
      log: "تسجيل الخروج",
      Change: "تغير كلمة السر",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu.ttf"),
    Noto: require("../assets/fonts/Noto.ttf"),
    NotoBold: require("../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }

  return (
    <View
      style={{
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
        height: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "#e8e8e8",
          height: 6,
          width: 150,
          margin: 20,
          alignSelf: "center",
          borderRadius: "100%",
        }}
      ></View>
      <Text
        style={{
          alignSelf: "center",
          margin: i18n.locale === ("en-US" || "en") ? 30 : 20,
          fontSize: 28,
          fontFamily: i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
          color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
        }}
      >
        {i18n.t("Settings")}
      </Text>
      <Text
        style={{
          alignSelf:
            i18n.locale === ("en-US" || "en") ? "flex-start" : "flex-end",
          margin: i18n.locale === ("en-US" || "en") ? 30 : 20,
          marginBottom: i18n.locale === ("en-US" || "en") ? 20 : 10,
          fontSize: 25,
          fontFamily: i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
          color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
        }}
      >
        {i18n.t("Account")}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#e8e8e8",
          height: 60,
          width: "90%",
          alignSelf: "center",
          borderRadius: 10,
          display: "flex",
          flexDirection:
            i18n.locale === ("en-US" || "en") ? "row" : "row-reverse",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => navigation.navigate("Edit")}
      >
        <Text
          style={{
            color: "#1b1b1b",
            fontSize: 18,
            fontFamily: i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
            margin: 10,
            marginRight: 15,
            marginLeft: 15,
            opacity: 0.8,
          }}
        >
          {i18n.t("edit")}
        </Text>
        <Ionicons
          style={{
            color: "#1b1b1b",
            fontSize: 18,
            fontFamily: i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
            margin: 22,
            opacity: 0.8,
          }}
          name={
            i18n.locale === ("en-US" || "en")
              ? "chevron-forward-outline"
              : "chevron-back-outline"
          }
        ></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#e8e8e8",
          height: 60,
          width: "90%",
          alignSelf: "center",
          borderRadius: 10,
          display: "flex",
          flexDirection:
            i18n.locale === ("en-US" || "en") ? "row" : "row-reverse",
          alignContent: "center",
          alignItems: "center",
          marginTop: 20,

          justifyContent: "space-between",
        }}
        onPress={() => navigation.navigate("ChangePassword")}
      >
        <Text
          style={{
            color: "#1b1b1b",
            fontSize: 18,
            fontFamily: i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
            margin: 10,
            marginRight: 15,
            marginLeft: 15,
            opacity: 0.8,
          }}
        >
          {i18n.t("Change")}
        </Text>
        <Ionicons
          style={{
            color: "#1b1b1b",
            fontSize: 18,
            fontFamily: i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
            margin: 22,
            opacity: 0.8,
          }}
          name={
            i18n.locale === ("en-US" || "en")
              ? "chevron-forward-outline"
              : "chevron-back-outline"
          }
        ></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#e8e8e8",
          height: 60,
          width: "90%",
          alignSelf: "center",
          borderRadius: 10,
          display: "flex",
          flexDirection:
            i18n.locale === ("en-US" || "en") ? "row" : "row-reverse",
          alignContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 20,
          justifyContent: "space-between",
        }}
        onPress={() =>
          Alert.alert(
            i18n.locale === ("en-US" || "en")
              ? "Do You Want to Logout?"
              : "هل ترغب بالخروج؟",
            "",
            [
              {
                text: i18n.locale === ("en-US" || "en") ? "Cancel" : "الغاء",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: i18n.locale === ("en-US" || "en") ? "OK" : "تسجيل الخروج",
                onPress: () => authStore.logout(),
              },
            ]
          )
        }
      >
        <Text
          style={{
            color: "#1b1b1b",
            fontSize: 18,
            fontFamily: i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
            margin: 10,
            marginRight: 15,
            marginLeft: 15,
            opacity: 0.8,
          }}
        >
          {i18n.t("log")}
        </Text>
        <Ionicons
          style={{
            color: "#1b1b1b",
            fontSize: 18,
            fontFamily: i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
            margin: 22,
            opacity: 0.8,
          }}
          name={
            i18n.locale === ("en-US" || "en")
              ? "chevron-forward-outline"
              : "chevron-back-outline"
          }
        ></Ionicons>
      </TouchableOpacity>
    </View>
  );
}
