import { useNavigation } from "@react-navigation/native";
import * as AppleAuthentication from "expo-apple-authentication";
import React from "react";
import { useColorScheme } from "react-native";
import authStore from "../../stores/authStore";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import jwtDecode from "jwt-decode";
import { useFonts } from "expo-font";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

export default function AppleLogin() {
  const colorScheme = useColorScheme();
  authStore.getEmails();
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

  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }

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
          const { identityToken } = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });

          if (identityToken) {
            const payload = jwtDecode(identityToken);
            console.log(payload);
            if (payload.email_verified === "true") {
              const user = {
                name: "",
                password: payload.sub,
                phone: "",
                email: payload.email,
                image: "",
              };
              const found = authStore.userEmails.some(
                (emailObj) =>
                  emailObj.email.toLowerCase() === payload.email.toLowerCase()
              );
              console.log("found", found);
              if (found === false) {
                navigation.navigate("AppleUsername", {
                  itemId: user,
                });
              } else {
                authStore.login({
                  email: payload.email,
                  password: payload.sub,
                });
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
