import {
  StyleSheet,
  Text,
  SafeAreaView,
  useColorScheme,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import React, { useState } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import PopularItem from "./PopularItem";
import popularStore from "../../stores/popularStore";
import { StatusBar } from "react-native";
import { observer } from "mobx-react";
import authStore from "../../stores/authStore";

function Bookmarked() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const translations = {
    en: {
      Settings: "Settings",
    },
    ar: {
      Settings: "الاعدادات",
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
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  const popularItems = popularStore.populars.filter((popular) =>
    authStore.user?.saved.includes(popular._id)
  );
  const popularlist = [...popularItems].reverse();

  const renderPopularItem = ({ item: popularItem }) => {
    return <PopularItem popularItem={popularItem} />;
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
        height: "100%",
      }}
    >
      <StatusBar
        backgroundColor={colorScheme === "dark" ? "#000000" : "#f1f1f1"}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View
        style={{
          margin: 20,
          marginTop: Platform.OS === "android" ? 20 : 0,
          marginBottom: 10,
          display: "flex",
          flexDirection:
            i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            style={{
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              fontSize: 28,
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
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
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "UbuntuBold" : "NotoBold",
            fontSize: 25,
            margin: 10,
            color: colorScheme === "light" ? "#000000" : "#f1f1f1",
          }}
        >
          {i18n.language.split("-")[0] === "en" ? "Saved" : "محفوظات"}
        </Text>
      </View>
      <FlatList
        data={popularlist}
        nestedScrollEnabled={true}
        renderItem={renderPopularItem}
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: "transparent",
          height: "100%",
          width: "100%",
        }}
        contentContainerStyle={styles.spotsListContainer}
      />
    </SafeAreaView>
  );
}
export default observer(Bookmarked);
const styles = StyleSheet.create({
  spotsList: {
    height: "100%",
  },
  spotsListContainer: {},
});
