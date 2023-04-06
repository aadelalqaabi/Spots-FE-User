import {
  Image,
  View,
  Text,
  StyleSheet,
  useColorScheme,
  StatusBar,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
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
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
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
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
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
            fontSize: i18n.language.split("-")[0] === "en" ? 30 : 20,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "UbuntuBold" : "NotoBold",
            textAlign: "center",
            color: colorScheme === "dark" ? "#f1f1f1" : "#000000",
            margin: 20,
            marginBottom: i18n.language.split("-")[0] === "en" ? 15 : 5,
          }}
        >
          {i18n.language.split("-")[0] === "en"
            ? "Login or register"
            : "سجل دخولك او انشأ حساب جديد"}
        </Text>
        <Text
          style={{
            fontSize: i18n.language.split("-")[0] === "en" ? 16 : 16,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            textAlign: "center",
            color: colorScheme === "dark" ? "#f1f1f1" : "#000000",
            opacity: 0.7,
            margin: 20,
            marginTop: 0,
            marginBottom: i18n.language.split("-")[0] === "en" ? 15 : 5,
            lineHeight: 25,
          }}
        >
          {i18n.language.split("-")[0] === "en"
            ? "View a list of destinations to visit everyday with many offers and rewards waiting for you"
            : "اعرض قائمة من الوجهات لزيارتها يوميا مع العديد من العروض والجوائز التي تنتظرك"}
        </Text>
        <EmailLogin />
        {/* <GoogleLogin />*/}
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
