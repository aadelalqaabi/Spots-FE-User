import { Image, View, Text, StyleSheet, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useFonts } from "expo-font";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import GoogleLogin from "./GoogleLogin";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import AppleLogin from "./AppleLogin";
import EmailLogin from "./EmailLogin";

export default function AuthButtons() {
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      title: "Login or register",
      new: "New here?",
      register: "Register Now",
      desc: "View a list of destinations to visit everyday with many offers and rewards waiting for you",
    },
    ar: {
      title: "سجل دخولك او انشأ حساب جديد",
      new: "جديد على غوتو؟",
      register: "سجل الآن ",
      desc: "اعرض قائمة من الوجهات لزيارتها يوميا مع العديد من العروض والجوائز التي تنتظرك",
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
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
      }}
    >
      <View
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "flex-end",
          alignSelf: "center",
          flexDirection: "column",
          flex: 1,
          width: "90%",
          marginBottom: "20%",
        }}
      >
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Image
          style={{
            height: "17%",
            width: "31.5%",
            alignSelf: "center",
            marginBottom: "30%",
          }}
          source={require("../../assets/icon.png")}
        ></Image>
        <Text
          style={{
            fontSize: i18n.locale === "en-US" || i18n.locale === "en" ? 30 : 20,
            fontFamily:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "UbuntuBold"
                : "NotoBold",
            textAlign: "center",
            color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
            margin: 20,
            marginBottom:
              i18n.locale === "en-US" || i18n.locale === "en" ? 15 : 5,
          }}
        >
          {i18n.t("title")}
        </Text>
        <Text
          style={{
            fontSize: i18n.locale === "en-US" || i18n.locale === "en" ? 16 : 16,
            fontFamily:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "Ubuntu"
                : "Noto",
            textAlign: "center",
            color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
            opacity: 0.7,
            margin: 20,
            marginTop: 0,
            marginBottom:
              i18n.locale === "en-US" || i18n.locale === "en" ? 15 : 5,
            lineHeight: 25,
          }}
        >
          {i18n.t("desc")}
        </Text>
        <EmailLogin />
        <GoogleLogin />
        <AppleLogin />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signUp: {
    borderRadius: 15,
  },
  signUpTextar: {
    color: "#e52b51",
    fontFamily: "UbuntuBold",
    fontSize: 20,
  },

  checktextar: {
    color: "#64666b",
    fontFamily: "Ubuntu",
    fontSize: 20,
    padding: 8,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },

  container: {
    flex: 1,
  },
});
