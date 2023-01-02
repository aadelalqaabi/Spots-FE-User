import { useNavigation } from "@react-navigation/native";
import { openURL } from "expo-linking";
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Linking, Text, Image } from "react-native";
import { WebView } from "react-native-webview";
import authStore from "../../stores/authStore";
import { baseURL } from "../../stores/instance";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function AppleLogin() {
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
      username: "",
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
      authStore.login({ username: userUrl[1], password: userUrl[2] });
    }
    setURL("");
  };

  const openUrl = (url) => {
    setURL(url);
  };

  return (
    <>
      {uri !== "" ? (
        <SafeAreaView style={{ flex: 1 }}>
          <WebView
            userAgent={
              "AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75"
            }
            source={{ uri }}
          />
        </SafeAreaView>
      ) : (
        <View>
          <TouchableOpacity
            style={{
              paddingVertical: 8,
              borderRadius: 10,
              elevation: 3,
              backgroundColor: "red",
              marginTop: 20,
              width: "103%",
              display: "flex",
              flexDirection:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "row"
                  : "row-reverse",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.1,
              shadowRadius: 1.41,
              elevation: 2,
            }}
            onPress={() => openURL(`${baseURL}/auth/apple/callback`)}
          >
            <Image
              style={{
                height: 25,
                width: 25,
                marginLeft:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 0 : 15,
                marginRight:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 15 : 0,
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
        </View>
      )}
    </>
  );
}
