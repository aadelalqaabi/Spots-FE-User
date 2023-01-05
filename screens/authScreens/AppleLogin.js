import { useNavigation } from "@react-navigation/native";
import { openURL } from "expo-linking";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Linking,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import authStore from "../../stores/authStore";
import { baseURL } from "../../stores/instance";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { Ionicons } from "@expo/vector-icons";

export default function AppleLogin() {
  const colorScheme = useColorScheme();
  authStore.getEmails();
  const [uri, setURL] = useState("");
  const navigation = useNavigation();
  const translations = {
    en: {
      google: "Continue with Apple",
      login: "Login",
    },
    ar: {
      google: "اكمل مع ابل",
      login: " دخول",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;

  useEffect(() => {
    Linking.addEventListener("url", (url) => handleOpenURL(url.url));
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleOpenURL({ url });
      }
    });
    return () => {
      Linking.removeAllListeners("url");
    };
  }, []);

  const handleOpenURL = (url) => {
    const userUrl = decodeURI(url).match(/email=([^#]+)\/sub=([^#]+)/);
    const user = {
      name: "",
      password: userUrl[2],
      phone: "",
      email: userUrl[1],
      image: "",
    };
    const found = authStore.userEmails.some(
      (emailObj) => emailObj.email.toLowerCase() === userUrl[1].toLowerCase()
    );
    console.log("found", found);
    if (found === false) {
      navigation.navigate("GoogleUsername", {
        itemId: user,
      });
    } else {
      authStore.login({ email: userUrl[1], password: userUrl[2] });
    }
    setURL("");
  };

  const openUrl = (url) => {
    setURL(url);
  };

  return (
    <TouchableOpacity
      style={{
        paddingVertical:
          i18n.locale === "en-US" || i18n.locale === "en" ? 12 : 8,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#060709",
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
        shadowColor: "#fff",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.04,
        shadowRadius: 10.41,
        elevation: 2,
      }}
      onPress={() => openURL(`${baseURL}/auth/apple/callback`)}
    >
      <Ionicons
        style={{
          fontSize: 28,
          margin: 20,
          marginTop: 0,
          marginBottom: 0,
        }}
        color={"#f1f1f1"}
        name="logo-apple"
      ></Ionicons>
      <Text
        style={{
          paddingVertical:
            i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 5,
          borderRadius: 15,
          elevation: 3,
          color: "#f1f1f1",
          fontSize: 18,
          fontWeight: "800",
          alignSelf: "center",
          fontFamily:
            i18n.locale === "en-US" || i18n.locale === "en"
              ? "UbuntuBold"
              : "NotoBold",
        }}
      >
        {i18n.t("google")}
      </Text>
    </TouchableOpacity>
  );
}
