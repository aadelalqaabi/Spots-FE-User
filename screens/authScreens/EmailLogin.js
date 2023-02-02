import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import Login from "./Login";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function EmailLogin() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      title: "Your Destination Awaits",
      new: "New here?",
      register: "Register Now",
      google: "Continue with Email",
      login: "Login",
    },
    ar: {
      title: "وجهتك تنتظرك",
      new: "جديد هنا؟",
      register: "سجل الآن ",
      google: "اكمل مع البريد الالكتروني",
      login: " دخول",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;

  return (
    <TouchableOpacity
      style={{
        height: 60,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#e52b51",
        marginTop: 15,
        width: "90%",
        display: "flex",
        flexDirection:
          i18n.locale === "en-US" || i18n.locale === "en"
            ? "row"
            : "row-reverse",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.41,
        elevation: 2,
      }}
      onPress={() => navigation.navigate("Login")}
    >
      <Ionicons
        style={{
          fontSize: 28,
          margin: 20,
          marginTop: 0,
          marginBottom: 0,
        }}
        color={"#f1f1f1"}
        name="mail"
      ></Ionicons>
      <Text
        style={{
          borderRadius: 15,
          elevation: 3,
          color: "#f1f1f1",
          fontSize: 23,
          fontWeight: "500",
          alignSelf: "center",
        }}
      >
        {i18n.t("google")}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  signUp: {
    borderRadius: 15,
  },
  signUpTextar: {
    color: "#e52b51",
    fontFamily: "UbuntuBold",
    fontSize: 20,
  },

  checktextar: {
    color: "#64666b",
    fontFamily: "Ubuntu",
    fontSize: 20,
    padding: 8,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },

  container: {
    flex: 1,
  },
});
