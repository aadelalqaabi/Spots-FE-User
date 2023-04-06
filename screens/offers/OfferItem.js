import { Image, StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { baseURL } from "../../stores/instance";
import { useFonts } from "expo-font";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

function OfferItem({ offer }) {
  const colorScheme = useColorScheme();
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

  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Cabin: require("../../assets/fonts/Cabin.ttf"),
    CabinMedium: require("../../assets/fonts/CabinMedium.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ margin: 20, marginRight: -5 }}>
      <View>
        <Image
          style={styles.thumb}
          source={{ uri: `${baseURL}${offer?.image}` }}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text
          style={{
            textTransform: "capitalize",
            marginTop: 10,
            marginRight: -20,
            fontSize: 22,
            color: colorScheme === "light" ? "#000000" : "#f1f1f1",
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "UbuntuBold" : "NotoBold",
            alignSelf:
              i18n.language.split("-")[0] === "en" ? "flex-start" : "flex-end",
          }}
        >
          {i18n.language.split("-")[0] === "en" ? offer?.title : offer.titleAr}
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text
          style={{
            marginTop: 10,
            marginRight: -20,
            fontSize: 18,
            color: colorScheme === "light" ? "#000000" : "#f1f1f1",
            fontFamily: i18n.language.split("-")[0] === "en" ? "Cabin" : "Noto",
            alignSelf:
              i18n.language.split("-")[0] === "en" ? "flex-start" : "flex-end",
            width: 300,
            lineHeight: 25,
            textAlign: i18n.language.split("-")[0] === "en" ? "left" : "right",
          }}
        >
          {i18n.language.split("-")[0] === "en"
            ? offer?.description
            : offer?.descriptionAr}
        </Text>
      </View>
    </View>
  );
}
export default observer(OfferItem);

const styles = StyleSheet.create({
  thumb: {
    alignSelf: "flex-start",
    width: 310,
    height: 200,
    borderRadius: 10,
  },
  titleContainer: {
    alignSelf: "flex-start",
    width: "90%",
  },
  descriptionContainer: {
    alignSelf: "flex-start",
    width: "90%",
  },
  name: {
    textTransform: "capitalize",
    marginTop: 10,
    fontSize: 22,
    color: "black",
    fontFamily: "UbuntuBold",
  },
  description: {
    marginTop: 10,
    fontSize: 18,
    color: "black",
    fontFamily: "Cabin",
    width: 300,
    lineHeight: 25,
  },
});
