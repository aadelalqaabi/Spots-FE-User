import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

import { useFonts } from "expo-font";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import ReviewList from "../reviews/ReviewList";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

export default function EndedSpot({ route }) {
  const spot = route.params.spot;
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  let users = 0;
  spot.users.forEach((user) => users++);
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
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
    Cabin: require("../../assets/fonts/Cabin.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <ScrollView style={{ height: "100%" }}>
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
                fontSize: 35,
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
              ? spot.name
              : spot.nameAr}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 150,
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 50,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            }}
          >
            {users}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              position: "absolute",
              paddingTop: 130,
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? "Users Visited"
              : "مستخدمين زارونا"}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            alignSelf:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "flex-start"
                : "flex-end",
            textAlign: "center",
            fontFamily:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "UbuntuBold"
                : "NotoBold",
            margin: 20,
            marginBottom: 10,
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          {i18n.locale === "en-US" || i18n.locale === "en"
            ? "Reviews"
            : "مراجعات"}
        </Text>
        <View style={{ marginTop: 20 }}>
          <ReviewList key="2" reviews={spot?.reviews} spotId={spot?._id} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
