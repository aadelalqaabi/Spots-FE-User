import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  Image,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

export default function OnBoarding() {
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  const translations = {
    en: {
      start: "Get Started",
      out: "Your Destiny Awaits",
      or: "Or",
      login: "Login",
    },
    ar: {
      start: "ابدأ",
      out: "وجهتك تنتظرك",
      or: "او",
      login: "تسجيل الدخول",
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

  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: colorScheme === "light" ? "#f1f1f1" : "#000000",
      }}
    >
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <Image
          style={{
            height: 229,
            width: 320,
            marginBottom: i18n.language.split("-")[0] === "en" ? 80 : 50,
            marginTop: 50,
          }}
          source={require("../../assets/Onbo.png")}
        ></Image>
        <Text
          style={{
            fontSize: 30,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "UbuntuBold" : "NotoBold",
            width: "75%",
            textAlign: "center",
            color: colorScheme === "dark" ? "#f1f1f1" : "#000000",
            marginBottom: i18n.language.split("-")[0] === "en" ? 15 : 10,
          }}
        >
          {i18n.language.split("-")[0] === "en"
            ? "Your destiny awaits"
            : "وجهتك تنتظرك"}
        </Text>
        <Text
          style={{
            fontSize: 22,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            width: "75%",
            textAlign: "center",
            color: colorScheme === "dark" ? "#f1f1f1" : "#000000",
            marginBottom: i18n.language.split("-")[0] === "en" ? 30 : 20,
            lineHeight: 33,
          }}
        >
          {i18n.language.split("-")[0] === "en"
            ? "Discover hidden gems in Kuwait with the Dest"
            : "اكتشفوا الجواهر الخفية في الكويت من خلال ديست"}
        </Text>
        <TouchableOpacity
          style={{
            display: "flex",
            alignSelf: "center",
            borderRadius: 12,
            height: 70,
            width: "75%",
            backgroundColor: "#e52b51",
            justifyContent: "space-between",
            flexDirection:
              i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
            padding: 10,
          }}
          onPress={() => navigation.navigate("SetUpAccount")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 25,
              alignSelf: "center",
              marginLeft: 10,
              marginRight: 10,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            }}
          >
            {i18n.language.split("-")[0] === "en" ? "Get started" : "ابدأ"}
          </Text>
          <Ionicons
            style={styles.icon}
            name={
              i18n.language.split("-")[0] === "en"
                ? "chevron-forward-outline"
                : "chevron-back-outline"
            }
          ></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logintext: {
    fontSize: 18,
    fontFamily: "Ubuntu",
    marginTop: 10,
    marginRight: 5,
    alignSelf: "flex-end",
  },
  loginbutton: {
    fontSize: 22,
    fontFamily: "UbuntuBold",
    marginTop: 10,
    color: "#e52b51",
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  button: {
    display: "flex",
    alignSelf: "center",
    borderRadius: 12,
    height: 70,
    width: "75%",
    backgroundColor: "#e52b51",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  icon: {
    color: "white",
    fontSize: 30,
    alignSelf: "center",
    zIndex: 99,
  },
  text: {
    color: "white",
    fontSize: 25,
    alignSelf: "center",
    marginLeft: 10,
    fontFamily: "Ubuntu",
  },
});
