import {
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import { useFonts } from "expo-font";
import Login from "./Login";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import authStore from "../../stores/authStore";
import { baseURL } from "../../stores/instance";
import { openURL } from "expo-linking";
import GoogleLogin from "./GoogleLogin";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import AppleLogin from "./AppleLogin";

export default function AuthButtons({ navigation }) {
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      title: "Your Destination Awaits",
      new: "New here?",
      register: "Register Now",
    },
    ar: {
      title: "وجهتك تنتظرك",
      new: "جديد على غوتو؟",
      register: "سجل الآن ",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
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
            backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
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
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

            <Text
              style={{
                fontSize:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 45 : 38,
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                width: "100%",
                marginTop: 50,
                marginBottom: 60,
                textAlign:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "left"
                    : "right",
                color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
              }}
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
                flexDirection:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "row"
                    : "row-reverse",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "Ubuntu"
                      : "Noto",
                  fontSize: 18,
                  paddingRight: 8,
                  paddingLeft: 8,
                  opacity: 0.8,
                }}
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
                  style={{
                    color: "#e52b51",
                    fontFamily:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 20,
                  }}
                >
                  {i18n.t("register")}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 20,
                marginBottom: 10,
                width: "100%",
                alignSelf: "center",
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  backgroundColor: "black",
                  height: 1,
                  flex: 1,
                  opacity: 0.2,
                  alignSelf: "center",
                }}
              ></View>
              <Text
                style={{
                  fontFamily: "Ubuntu",
                  fontSize: 17,
                  opacity: 0.4,
                  textAlign: "center",
                  alignSelf: "center",
                  paddingHorizontal: 10,
                }}
              >
                Or
              </Text>
              <View
                style={{
                  backgroundColor: "black",
                  height: 1,
                  flex: 1,
                  opacity: 0.2,
                  alignSelf: "center",
                  borderRadius: "100%",
                }}
              ></View>
            </View>
            <View
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                width: "105%",
                alignSelf: "center",
              }}
            >
              <GoogleLogin />
              <AppleLogin />
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
