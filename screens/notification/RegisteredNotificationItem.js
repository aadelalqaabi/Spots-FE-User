import { StyleSheet, Text, useColorScheme, View, Image } from "react-native";
import React from "react";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { useFonts } from "expo-font";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import { baseURL } from "../../stores/instance";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import organizerStore from "../../stores/organizerStore";

export default function RegisteredNotificationItem({ organizerId }) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const organizer = organizerStore.getOrganizerById(organizerId);
  const translations = {
    en: {
      Users: "users",
    },
    ar: {
      Users: "متابعون",
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
    <TouchableOpacity
      style={{
        margin: "3%",
        marginBottom: 0,
        backgroundColor: colorScheme === "light" ? "#cacaca" : "#282828",
        borderRadius: 25,
        boxShadow: "0px 0px 10px 5px rgba(0,0,0,12.75)",
      }}
      onPress={() => {
        navigation.navigate("Organizer", {
          organizer: organizer,
        });
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection:
            i18n.locale === "en-US" || i18n.locale === "en"
              ? "row"
              : "row-reverse",
          alignItems: "center",
          margin: "5%",
          marginRight: "10%",
          marginLeft: "10%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "row"
                : "row-reverse",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              backgroundColor: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              width: 55,
              height: 55,
              borderRadius: 150,
              alignItems: "center",
              alignSelf: "center",
            }}
            source={{
              uri: baseURL + organizer?.image,
            }}
          />
          <Text
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",

              fontSize: 20,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              marginLeft:
                i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 0,
              marginRight:
                i18n.locale === "en-US" || i18n.locale === "en" ? 0 : 10,
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? organizer?.displayNameEn
              : organizer?.displayNameAr}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontSize: 20,
              fontFamily: "UbuntuBold",
            }}
          >
            {organizer.registerdUsers ? organizer.registerdUsers.length : 0}
          </Text>
          <Text
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontSize: 15,
              fontFamily: "Ubuntu",
            }}
          >
            {i18n.t("Users")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
