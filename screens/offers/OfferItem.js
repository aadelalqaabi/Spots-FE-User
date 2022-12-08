import { Image, StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { baseURL } from "../../stores/instance";
import { useFonts } from "expo-font";

import { I18n } from "i18n-js";
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
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
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
    return <MyAwesomeSplashScreen />;
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
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            fontFamily:
              i18n.locale === ("en-US" || "en") ? "UbuntuBold" : "NotoBold",
            alignSelf:
              i18n.locale === ("en-US" || "en") ? "flex-start" : "flex-end",
          }}
        >
          {i18n.locale === ("en-US" || "en") ? offer?.title : offer.titleAr}
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text
          style={{
            marginTop: 10,
            marginRight: -20,
            fontSize: 18,
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            fontFamily: i18n.locale === ("en-US" || "en") ? "Cabin" : "Noto",
            alignSelf:
              i18n.locale === ("en-US" || "en") ? "flex-start" : "flex-end",
            width: 300,
            lineHeight: 25,
            textAlign: i18n.locale === ("en-US" || "en") ? "left" : "right",
          }}
        >
          {i18n.locale === ("en-US" || "en")
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
