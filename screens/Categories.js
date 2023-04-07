import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useState } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import categoryStore from "../stores/categoryStore";

export default function Categories({
  setCategory,
  category,
  categoryModal,
  setCategoryModal,
}) {
  const colorScheme = useColorScheme();
  const categories = categoryStore.getCategories();

  const translations = {
    en: {
      explore: "Explore",
      empty: "No Dests yet",
    },
    ar: {
      explore: "اكتشف",
      empty: "لا يوجد ديست هنا",
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
  return (
    <Modal animationType="fade" transparent={true} visible={categoryModal}>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
        onPress={() => setCategoryModal(!categoryModal)}
        activeOpacity={1}
      ></TouchableOpacity>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          marginTop: "70%",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            width: "100%",
            alignSelf: "center",
            backgroundColor: colorScheme === "light" ? "#f1f1f1" : "#000000",
            borderRadius: 15,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: 20,
            paddingTop: 40,
            paddingBottom: i18n.language.split("-")[0] === "en" ? 40 : 50,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
              fontSize: i18n.language.split("-")[0] === "en" ? 25 : 23,
              alignSelf: "center",
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              paddingTop: 0,
              padding: i18n.language.split("-")[0] === "en" ? 5 : 0,
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? "Choose category"
              : "اختر فئة"}
          </Text>
          <View
            style={{
              width: "100%",
              alignSelf: "center",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {categories.map((categoryItem) => (
              <TouchableOpacity
                onPress={() => {
                  setCategory(categoryItem);
                  setCategoryModal(false);
                }}
                key={categories.indexOf(categoryItem)}
                style={{
                  backgroundColor:
                    categoryItem === category ? "#e52b51" : "transparent",
                  margin: i18n.language.split("-")[0] === "en" ? 8 : 5,
                  padding: i18n.language.split("-")[0] === "en" ? 10 : 0,
                  paddingLeft: i18n.language.split("-")[0] === "en" ? 15 : 15,
                  paddingRight: i18n.language.split("-")[0] === "en" ? 15 : 15,
                  borderRadius: 20,
                  borderColor: "#e52b51",
                  borderWidth: 1.5,
                }}
              >
                <Text
                  style={{
                    color:
                      colorScheme === "light"
                        ? categoryItem === category
                          ? "#f1f1f1"
                          : "#000000"
                        : "#f1f1f1",
                    fontSize: 22,
                    alignSelf: "center",
                    fontFamily:
                      i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  }}
                >
                  {i18n.language.split("-")[0] === "en"
                    ? categoryItem.name
                    : categoryItem.nameAr}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginTop: "5%",
            backgroundColor: "#e52b51",
            width: "30%",
            borderRadius: 10,
          }}
          onPress={() => {
            setCategory(null);
            setCategoryModal(false);
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              padding: i18n.language.split("-")[0] === "en" ? 10 : 5,
              color: "#f1f1f1",
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              fontSize: 17,
            }}
          >
            {i18n.language.split("-")[0] === "en" ? "Reset" : "اعادة ضبط"}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
