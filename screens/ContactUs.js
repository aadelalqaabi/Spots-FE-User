import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import React from "react";
import * as Localization from "expo-localization";
import { Ionicons } from "@expo/vector-icons";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";
import { useFonts } from "expo-font";

export default function ContactUs() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const translations = {
    en: {
      Contact: "Contact us",
    },
    ar: {
      Contact: "تواصل معنا",
    },
  };

  i18n.use(initReactI18next).init({
    resources: translations,
    lng: Localization.locale,
    fallbackLng: true,
    interpolation: {
      escapeValue: false,
    },
  });

  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu.ttf"),
    Noto: require("../assets/fonts/Noto.ttf"),
    NotoBold: require("../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
        height: "90%",
        alignContent: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "6%",
          marginBottom: "4%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            zIndex: 99,
            alignSelf:
              i18n.language.split("-")[0] === "en" ? "flex-start" : "flex-end",
            position: "absolute",
            marginLeft: 20,
            paddingRight: 20,
          }}
        >
          <Ionicons
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              zIndex: 99,
              fontSize: 32,
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
            textAlign: "center",
            alignSelf: "center",
            fontSize: 28,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          {i18n.language.split("-")[0] === "en" ? "Contact Us" : "تواصل معنا"}
        </Text>
      </View>
      <View
        style={{
          alignContent: "center",
          justifyContent: "center",
          height: "80%",
        }}
      >
        <Image
          style={{
            width: 370,
            height: 310,
            margin: 25,
            alignSelf: "center",
          }}
          source={require("./../assets/Chat.png")}
        ></Image>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: "#e52b51",
              borderRadius: 50,
              padding: 15,
            }}
            onPress={() => Linking.openURL("https://instagram.com/destkuwait")}
          >
            <Ionicons
              style={{
                color: "#f1f1f1",
                fontSize: 45,
                fontFamily: "Ubuntu",
                alignSelf: "center",
              }}
              name={"logo-instagram"}
            ></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: "#e52b51",
              borderRadius: 50,
              padding: 15,
            }}
            onPress={() => Linking.openURL("https://wa.me/96597947057")}
          >
            <Ionicons
              style={{
                color: "#f1f1f1",
                fontSize: 45,
                fontFamily: "Ubuntu",

                alignSelf: "center",
              }}
              name={"logo-whatsapp"}
            ></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: "#e52b51",
              borderRadius: 50,
              padding: 15,
            }}
            onPress={() => Linking.openURL(`mailto:dest.kuwait@gmail.com`)}
          >
            <Ionicons
              style={{
                color: "#f1f1f1",
                fontSize: 45,
                fontFamily: "Ubuntu",
                alignSelf: "center",
              }}
              name={"mail-outline"}
            ></Ionicons>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            fontSize: 20,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            textAlign: "center",
            margin: 20,
            marginTop: 5,
          }}
        >
          {i18n.language.split("-")[0] === "en"
            ? "We would be delighted to hear from you"
            : "سنكون سعداء أن نسمع منك"}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
