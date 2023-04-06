import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import * as Localization from "expo-localization";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ReviewList from "./ReviewList";
import { useFonts } from "expo-font";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

export default function ReviewsPage({ route }) {
  const { spot } = route.params;
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

  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View
        style={{
          display: "flex",
          flexDirection:
            i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
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
          {i18n.language.split("-")[0] === "en" ? "Reviews" : "تقييمات"}
        </Text>
      </View>

      {spot.reviews.length > 0 ? (
        <View style={{ marginTop: "5%" }}>
          <ReviewList key="2" reviews={spot?.reviews} spotId={spot?._id} />
        </View>
      ) : (
        <View
          style={{
            height: "90%",
            width: "100%",
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
              fontSize: i18n.language.split("-")[0] === "en" ? 40 : 35,
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              alignSelf: "center",
              textAlign:
                i18n.language.split("-")[0] === "en" ? "left" : "right",
              lineHeight: 60,
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? "No reviews yet!"
              : "لا تقييمات حتى الآن!"}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
