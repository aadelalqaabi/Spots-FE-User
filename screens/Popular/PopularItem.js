import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  useColorScheme,
  Alert,
  Modal,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { baseURL } from "../../stores/instance";
import { useFonts } from "expo-font";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { TouchableOpacity } from "react-native";
import { openURL } from "expo-linking";
import { Ionicons } from "@expo/vector-icons";
import authStore from "../../stores/authStore";
import popularStore from "../../stores/popularStore";
const { width } = Dimensions.get("window");

export default function PopularItem({ popularItem }) {
  const [loading, setLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const toggleAlert = useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

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

  const isSaved = authStore.user?.saved?.includes(popularItem._id);
  let isFilled = isSaved;

  const handleBookmark = async () => {
    setLoading(true);
    if (authStore.user) {
      if (isSaved) {
        await authStore.popularUnsave(popularItem._id);
        if (popularItem.saves > 0) {
          popularItem.saves = popularItem.saves - 1;
          await popularStore.updatePopular(popularItem, popularItem._id);
        }
      } else {
        isFilled = true;
        popularItem.saves = popularItem.saves + 1;
        await authStore.popularSave(popularItem._id);
        await popularStore.updatePopular(popularItem, popularItem._id);
      }
    } else {
      toggleAlert();
    }
    setLoading(false);
  };

  return (
    <View
      style={{
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
      }}
    >
      <Image
        style={{
          height: 420,
          width: width,
          alignSelf: "center",
        }}
        onLoad={() => setIsImageLoading(false)}
        loadingIndicatorSource={require("../../assets/Loading.gif")}
        source={{ uri: baseURL + popularItem.image }}
      ></Image>
      {isImageLoading === true && (
        <View
          style={{
            height: 420,
            width: width,
            position: "absolute",
            zIndex: 99,
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
            }}
            source={require("../../assets/Loading.gif")}
          />
        </View>
      )}
      <View
        style={{
          display: "flex",
          flexDirection:
            i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
          justifyContent: "space-between",
          margin: 15,
          marginBottom: 5,
        }}
      >
        <View
          style={{
            width: "80%",
          }}
        >
          <Text
            style={{
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
              fontSize: 22,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              marginBottom: i18n.language.split("-")[0] === "en" ? 5 : 0,
              textTransform: "capitalize",
              marginTop: i18n.language.split("-")[0] === "en" ? 0 : -5,
              textAlign:
                i18n.language.split("-")[0] === "en" ? "left" : "right",
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? popularItem.title
              : popularItem.titleAr}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection:
                i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
            }}
          >
            <Text
              style={{
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                fontSize: 16,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? `${popularItem.saves} Save`
                : `${popularItem.saves} حفظ`}
            </Text>
            <Text
              style={{
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                fontSize: 16,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              }}
            >
              {" "}
              ●{" "}
              {i18n.language.split("-")[0] === "en"
                ? popularItem.category
                : popularItem.categoryAr}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection:
              i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
          }}
        >
          <TouchableOpacity
            style={{
              margin: 5,
              marginTop: 0,
            }}
            onPress={() =>
              openURL(`https://instagram.com/${popularItem.instagram}`)
            }
          >
            <Ionicons
              style={{
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                fontSize: 28,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              }}
              name={
                popularItem.instagram !== ""
                  ? "logo-instagram"
                  : "globe-outline"
              }
            ></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              margin: 5,
              marginTop: 0,
            }}
            onPress={handleBookmark}
            disabled={loading}
          >
            <Ionicons
              style={{
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                fontSize: 28,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              }}
              name={isFilled ? "bookmark" : "bookmark-outline"}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          color: colorScheme === "light" ? "#000000" : "#f1f1f1",
          fontSize: 16,
          fontFamily: i18n.language.split("-")[0] === "en" ? "Cabin" : "Noto",
          margin: 15,
          marginTop: 0,
          textAlign: i18n.language.split("-")[0] === "en" ? "left" : "right",
        }}
      >
        {i18n.language.split("-")[0] === "en"
          ? popularItem.description
          : popularItem.descriptionAr}
      </Text>
      <Modal transparent={true} visible={visible} animationType="fade">
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "white",
              padding: 25,
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              borderColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                marginBottom: 10,
                fontFamily:
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.language.split("-")[0] === "en" ? "Ooops!" : "!اوبس"}
            </Text>
            <Text
              style={{
                marginBottom: 20,
                width: "70%",
                textAlign: "center",
                fontSize: 17,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                lineHeight: 30,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "You must have an account to be able to save"
                : "يجب أن يكون لديك حساب لتتمكن من الحفظ"}
            </Text>
            <TouchableOpacity
              style={{
                width: "50%",
                backgroundColor: "#e52b51",
                borderRadius: 50,
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => {
                toggleAlert();
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#f1f1f1",
                  fontFamily:
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.language.split("-")[0] === "en" ? "Close" : "اغلاق"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
