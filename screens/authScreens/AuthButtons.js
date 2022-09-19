import {
  TouchableOpacity,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import Login from "./Login";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

export default function AuthButtons({ navigation }) {
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      title: "Go Where You Want To",
      new: "New to GOTO?",
      register: "Register Now",
    },
    ar: {
      title: "اذهب الى اين ما شئت",
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
            <Image
              style={{
                width: 55,
                height: 75,
                alignSelf: "center",
                resizeMode: "contain",
                marginTop: -150,
                marginBottom: 50,
              }}
              source={require("../../assets/iconSign.png")}
            />
            <Text
              style={{
                fontSize: i18n.locale === "en-US" ? 45 : 38,
                fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                width: "100%",
                marginTop: 80,
                marginBottom: 70,
                textAlign: i18n.locale === "en-US" ? "left" : "right",
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
                flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
                  fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
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
                    color: "#7758F6",
                    fontFamily:
                      i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                    fontSize: 20,
                  }}
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
  signUpTextar: {
    color: "#4831d4",
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
