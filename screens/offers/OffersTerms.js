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
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { observer } from "mobx-react";
import { Ionicons } from "@expo/vector-icons";

export default function OffersTerms({ route }) {
  const spot = route.params.spot;
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
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={{ marginBottom: 50 }}>
      <View
        style={{
          display: "flex",
          flexDirection:
            i18n.locale === "en-US" || i18n.locale === "en"
              ? "row"
              : "row-reverse",
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
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              zIndex: 99,
              fontSize: 32,
              margin: 15,
              width: "100%",
            }}
            name={
              i18n.locale === "en-US" || i18n.locale === "en"
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
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "Ubuntu"
                : "Noto",
            width: "70%",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          {i18n.locale === "en-US" || i18n.locale === "en"
            ? "Terms and Conditions"
            : "الشروط والاحكام"}
        </Text>
      </View>
      <ScrollView>
        <Text
          style={{
            fontSize: 22,
            textAlign:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "left"
                : "right",
            fontFamily:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "Ubuntu"
                : "Noto",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            margin: 30,
          }}
        >
          {i18n.locale === "en-US" || i18n.locale === "en"
            ? spot.termsAndConditionsOffersEn
            : spot.termsAndConditionsOfferssAr}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
