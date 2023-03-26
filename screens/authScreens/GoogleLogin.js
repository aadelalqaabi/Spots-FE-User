import { useNavigation } from "@react-navigation/native";
import { openURL } from "expo-linking";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Linking, Text, Image } from "react-native";
import authStore from "../../stores/authStore";
import { baseURL } from "../../stores/instance";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import * as Localization from "expo-localization";

export default function GoogleLogin() {
  authStore.getEmails();
  const [uri, setURL] = useState("");
  const navigation = useNavigation();
  const translations = {
    en: {
      google: "Continue with Google",
      login: "Login",
    },
    ar: {
      google: "اكمل مع غوغل",
      login: " دخول",
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
        paddingVertical: i18n.language.split("-")[0] === "en" ? 12 : 8,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#ffffff",
        marginTop: 15,
        width: "90%",
        display: "flex",
        flexDirection:
          i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
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
      onPress={() => openURL(`https://destkw.com/universal/user/login/google`)}
    >
      <Image
        style={{
          height: 25,
          width: 25,
          margin: 20,
          marginTop: 0,
          marginBottom: 0,
        }}
        source={require("../../assets/GoogleLogo.png")}
      ></Image>
      <Text
        style={{
          paddingVertical: i18n.language.split("-")[0] === "en" ? 10 : 5,
          borderRadius: 15,
          elevation: 3,
          color: "#1b1b1b",

          fontSize: 18,
          fontWeight: "800",
          alignSelf: "flex-start",
          fontFamily:
            i18n.language.split("-")[0] === "en" ? "UbuntuBold" : "NotoBold",
        }}
      >
        {i18n.language.split("-")[0] === "en"
          ? "Continue with Google"
          : "اكمل مع قوقل"}
      </Text>
    </TouchableOpacity>
  );
}
