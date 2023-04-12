import { useNavigation } from "@react-navigation/native";
import * as AppleAuthentication from "expo-apple-authentication";
import React, { useState } from "react";
import { Platform, useColorScheme, View } from "react-native";
import authStore from "../../stores/authStore";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import jwtDecode from "jwt-decode";
import { useFonts } from "expo-font";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

export default function AppleLogin() {
  const colorScheme = useColorScheme();
  authStore.getEmails();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
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
    return;
  }
  if (isLoading) return <MyAwesomeSplashScreen />;
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
      buttonStyle={
        colorScheme === "dark"
          ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
          : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
      }
      cornerRadius={10}
      style={{
        height: 60,
        marginTop: 15,
        width: "90%",
        alignSelf: "center",
      }}
      onPress={async () => {
        try {
          const { identityToken, fullName } =
            await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
          if (identityToken) {
            const payload = jwtDecode(identityToken);
            if (payload.email_verified === "true") {
              const user = {
                name: fullName.givenName !== null ? fullName.givenName : null,
                password: payload.sub,
                phone: "",
                email: payload.email,
                image: "",
                locale: i18n.language,
                platform: String(Platform.OS)
              };
              const found = authStore.userEmails.some(
                (emailObj) =>
                  emailObj.email.toLowerCase() === payload.email.toLowerCase()
              );
              if (found === false) {
                navigation.navigate("MyImage", {
                  itemId: user,
                });
              } else {
                try {
                  authStore.login({
                    email: payload.email,
                    password: payload.sub,
                  });
                  setIsLoading(true);
                } catch (error) {
                  setIsLoading(false);
                }
              }
            }
          }
        } catch (e) {
          if (e.code === "ERR_CANCELED") {
          } else {
            // handle other errors
          }
        }
      }}
    />
  );
}
