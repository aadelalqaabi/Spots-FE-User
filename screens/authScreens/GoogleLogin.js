import { useNavigation } from "@react-navigation/native";
import { openURL } from "expo-linking";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Linking, Text, Image } from "react-native";
import authStore from "../../stores/authStore";
import { baseURL } from "../../stores/instance";
import { I18n } from "i18n-js";
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
        backgroundColor: "#ffffff",
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
          paddingVertical:
            i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 5,
          borderRadius: 15,
          elevation: 3,
          color: "#1b1b1b",

          fontSize: 18,
          fontWeight: "800",
          alignSelf: "flex-start",
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
