import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import * as Localization from "expo-localization";
import { observer } from "mobx-react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function OffersTerms({ route }) {
  const spot = route.params.spot;
  const navigation = useNavigation();

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

  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={{ marginBottom: 50 }}>
      <View
        style={{
          display: "flex",
          flexDirection:
            i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
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
              fontSize: 32,
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
          {i18n.language.split("-")[0] === "en"
            ? "Terms and Conditions"
            : "الشروط والاحكام"}
        </Text>
      </View>
      <ScrollView>
        <Text
          style={{
            fontSize: 22,
            textAlign: i18n.language.split("-")[0] === "en" ? "left" : "right",
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            color: colorScheme === "light" ? "#000000" : "#f1f1f1",
            margin: 30,
          }}
        >
          {i18n.language.split("-")[0] === "en"
            ? spot.termsAndConditionsOffersEn
            : spot.termsAndConditionsOfferssAr}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
