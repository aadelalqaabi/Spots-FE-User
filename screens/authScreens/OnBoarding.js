import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

export default function OnBoarding() {
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const translations = {
    en: {
      start: "Get Started",
      out: "Going out never felt this fun",
      or: "Or",
      login: "Login",
    },
    ar: {
      start: "ابدأ",
      out: "الذهاب للخارج لم يكن بهذه المتعة",
      or: "او",
      login: "تسجيل التدخول",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 48,
          fontFamily: "UbuntuBold",
          width: "75%",
          marginTop: 200,
          textAlign: i18n.locale === "en-US" ? "left" : "right",
        }}
      >
        {i18n.t("out")}
      </Text>
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MainPageRegister")}
        >
          <Text style={styles.text}>{i18n.t("start")}</Text>
          <Ionicons
            style={styles.icon}
            name="chevron-forward-outline"
          ></Ionicons>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            flexDirection: "row",
            marginTop: 5,
          }}
        >
          <Text style={styles.logintext}>{i18n.t("or")}</Text>
          <Text
            style={styles.loginbutton}
            onPress={() => navigation.navigate("Set Up Account")}
          >
            {i18n.t("login")}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logintext: {
    fontSize: 18,
    fontFamily: "Ubuntu",
    marginTop: 10,
    marginRight: 5,
    alignSelf: "flex-end",
  },
  loginbutton: {
    fontSize: 22,
    fontFamily: "UbuntuBold",
    marginTop: 10,
    color: "#9279f7",
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  button: {
    display: "flex",
    alignSelf: "center",
    borderRadius: 12,
    height: 70,
    width: "75%",
    backgroundColor: "#9279f7",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  icon: {
    color: "white",
    fontSize: 30,
    alignSelf: "center",
    zIndex: 99,
  },
  text: {
    color: "white",
    fontSize: 25,
    alignSelf: "center",
    marginLeft: 10,
    fontFamily: "Ubuntu",
  },
});
