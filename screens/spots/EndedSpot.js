import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
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
            {i18n.language.split("-")[0] === "en" ? spot.name : spot.nameAr}
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
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
            }}
          >
            {users}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
              position: "absolute",
              paddingTop: 130,
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? "Users Visited"
              : "مستخدمين زارونا"}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            alignSelf:
              i18n.language.split("-")[0] === "en" ? "flex-start" : "flex-end",
            textAlign: "center",
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "UbuntuBold" : "NotoBold",
            margin: 20,
            marginBottom: 10,
            color: colorScheme === "light" ? "#000000" : "#f1f1f1",
          }}
        >
          {i18n.language.split("-")[0] === "en" ? "Reviews" : "تقييمات"}
        </Text>
        <View style={{ marginTop: 20 }}>
          {spot.reviews.length > 0 ? (
            <ReviewList key="2" reviews={spot?.reviews} spotId={spot?._id} />
          ) : (
            <View
              style={{
                height: "100%",
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  color: colorScheme === "dark" ? "#f1f1f1" : "#000000",
                  fontSize: 30,
                  fontFamily:
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                }}
              >
                No Reviews Here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
