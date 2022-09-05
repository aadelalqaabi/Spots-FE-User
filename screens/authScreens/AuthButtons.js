import {
  TouchableOpacity,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import Login from "./Login";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

export default function AuthButtons({ navigation }) {
  const translations = {
    en: {
      title: "Go Where You Want To",
      new: "New to GoTo?",
      register: "Register Here",
    },
    ar: {
      title: "اذهب الى اين ما شئت",
      new: "جديد على غوتو؟",
      register: "سجل هنا ",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            flex: 1,
          }}
        >
          <View
            style={{
              justifyContent: "center",

              width: "70%",
              alignSelf: "center",
              flex: 1,
            }}
          >
            <StatusBar style={"dark"} />
            <Image
              style={{
                width: 55,
                height: 75,
                alignSelf: "center",
                resizeMode: "contain",
                marginTop: -150,
                marginBottom: 50,
              }}
              source={require("../../assets/icony.png")}
            />
            <Text
              style={i18n.locale === "en-US" ? styles.title : styles.artitle}
            >
              {i18n.t("title")}
            </Text>
            <Login />
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
                marginTop: 20,
              }}
            >
              <Text
                style={
                  i18n.locale === "en-US"
                    ? styles.checktext
                    : styles.checktextar
                }
              >
                {i18n.t("new")}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MainPageRegister");
                }}
                style={styles.signUp}
              >
                <Text
                  style={
                    i18n.locale === "en-US"
                      ? styles.signUpText
                      : styles.signUpTextar
                  }
                >
                  {i18n.t("register")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  signUp: {
    borderRadius: 15,
  },
  signUpText: {
    color: "#4831d4",
    fontFamily: "UbuntuBold",
    fontSize: 20,
  },
  signUpTextar: {
    color: "#4831d4",
    fontFamily: "UbuntuBold",
    fontSize: 20,
  },
  checktext: {
    color: "#64666b",
    fontFamily: "Ubuntu",
    fontSize: 20,
    paddingRight: 8,
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
  title: {
    fontSize: 45,
    fontFamily: "UbuntuBold",
    width: "100%",
    marginTop: 80,
    marginBottom: 70,
  },
  artitle: {
    fontSize: 45,
    fontFamily: "UbuntuBold",
    width: "100%",
    marginTop: 80,
    marginBottom: 70,
    textAlign: "right",
  },
  container: {
    flex: 1,
  },
});
