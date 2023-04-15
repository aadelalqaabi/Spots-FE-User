import {
    StyleSheet,
    Text,
    SafeAreaView,
    useColorScheme,
    View,
    Image,
    StatusBar,
  } from "react-native";
  import React from "react";
  import { observer } from "mobx-react";
  import { useFonts } from "expo-font";
  import i18n from "i18next";
  import { initReactI18next } from "react-i18next";
  import * as Localization from "expo-localization";
  
  function MySpotsGuest() {
    const colorScheme = useColorScheme();
    const translations = {
      en: {
        myspots: "Tickets",
        empty: "No tickets yet",
      },
      ar: {
        myspots: "تذاكر",
        empty: "لا تذاكر حتى الآن",
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
      UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
      NotoBold: require("../assets/fonts/NotoBold.ttf"),
    });
    if (!fontsLoaded) {
      return null;
    }
  
    return (
      <SafeAreaView
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
        }}
      >
        <StatusBar
          backgroundColor={colorScheme === "dark" ? "#000000" : "#f1f1f1"}
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
        <Text
          style={{
            fontSize: 32,
            margin: 20,
            marginBottom: 10,
            marginTop: 15,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "UbuntuBold" : "NotoBold",
            alignSelf:
              i18n.language.split("-")[0] === "en" ? "flex-start" : "flex-end",
            color: colorScheme === "light" ? "#000000" : "#f1f1f1",
          }}
        >
          {i18n.language.split("-")[0] === "en" ? "My Dests" : "وجهاتي"}
        </Text>
        <View style={{ width: "100%", height: "91%", zIndex: 99 }}>
            <View
              style={{
                display: "flex",
                alignSelf: "center",
                height: "90%",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  width: 350,
                  height: 262,
                  alignSelf: "center",
                }}
                source={require("./../assets/EmptyTickets.png")}
              ></Image>
              <Text
                style={{
                  color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                  fontSize: 40,
                  fontFamily:
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  alignSelf: "center",
                  textAlign: "center",
                  width: 350,
                  marginTop: i18n.language.split("-")[0] === "en" ? 20 : 10,
                }}
              >
                {i18n.language.split("-")[0] === "en"
                  ? "No tickets yet"
                  : "لا تذاكر حتى الآن"}
              </Text>
            </View>
        </View>
      </SafeAreaView>
    );
  }
  
  export default observer(MySpotsGuest);
  