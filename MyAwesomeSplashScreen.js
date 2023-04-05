import { View, Image, useColorScheme, Text } from "react-native";
import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { useFonts } from "expo-font";

export default function MyAwesomeSplashScreen() {
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      google: "Continue with Apple",
      login: "Login",
    },
    ar: {
      google: "اكمل مع ابل",
      login: " دخول",
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
    UbuntuBold: require("./assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("./assets/fonts/Ubuntu.ttf"),
    Noto: require("./assets/fonts/Noto.ttf"),
    NotoBold: require("./assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <View style={{ backgroundColor: "transparent" }}></View>;
  }
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
      }}
    >
      <Image
        style={{
          width: 90,
          height: 102,
          alignSelf: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
        source={require("./assets/Loading.gif")}
      ></Image>
      <Text
        style={{
          fontSize: 22,
          color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          fontFamily: i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
        }}
      >
        {i18n.language.split("-")[0] === "en"
          ? "Cool things are loading!"
          : "اشياء رائعة يتم تحميلها!"}
      </Text>
    </View>
  );
}
