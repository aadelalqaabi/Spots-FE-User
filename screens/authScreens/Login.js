import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import authStore from "../../stores/authStore";
import React from "react";

import { useFonts } from "expo-font";
import PhoneInput from "react-native-phone-number-input";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import TextInput from "react-native-text-input-interactive";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

export default function Login() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [secure, setSecure] = useState(true);
  const translations = {
    en: {
      phone: "Phone Number",
      login: "Login",
    },
    ar: {
      phone: "رقم الهاتف",
      login: "تسجيل دخول",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    authStore.login(user);
  };
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
    <View
      style={{
        justifyContent: "center",
        width: "105%",
        alignSelf: "center",
      }}
    >
      <View style={{ display: "flex", width: "100%" }}>
        {/* <PhoneInput
          containerStyle={{
            alignSelf: "center",
            width: "100%",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 1.41,
            elevation: 2,
          }}
          textContainerStyle={{
            borderRadius: 10,
            backgroundColor: "white",
          }}
          textInputStyle={{
            fontFamily: i18n.locale === ("en-US" || "en")  ? "Ubuntu" : "Noto",
            textAlign: i18n.locale === ("en-US" || "en")  ? "left" : "right",
            marginTop: i18n.locale === ("en-US" || "en")  ? 0 : -4,
            marginBottom: i18n.locale === ("en-US" || "en")  ? 0 : -4,
          }}
          defaultValue={user.phone}
          defaultCode="KW"
          layout="first"
          placeholder={i18n.t("Enter username or phone number")}
          onChangeFormattedText={(text) => {
            handleChange("username", text);
          }}
          withDarkTheme
          autoFocus
        /> */}
        <TextInput
          textInputStyle={{
            alignSelf: "center",
            width: "103%",
            marginBottom: 20,
            padding: 10,
            fontFamily: i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
            textAlign: i18n.locale === ("en-US" || "en") ? "left" : "right",
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 1.41,
            elevation: 2,
          }}
          label="Username"
          // secureTextEntry={secure}
          onChangeText={(text) => {
            handleChange("username", text);
          }}
          placeholder={
            i18n.locale === ("en-US" || "en")
              ? "Username or Email"
              : "اسم المستخدم او الايميل"
          }
          placeholderTextColor={"grey"}
          keyboardType="web-search"
        />
        <TextInput
          textInputStyle={{
            alignSelf: "center",
            width: "103%",
            marginBottom: 30,
            padding: 10,
            fontFamily: i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
            textAlign: i18n.locale === ("en-US" || "en") ? "left" : "right",
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 1.41,
            elevation: 2,
          }}
          label="Password"
          secureTextEntry={secure}
          onChangeText={(text) => {
            handleChange("password", text);
          }}
          placeholder={
            i18n.locale === ("en-US" || "en") ? "Password" : "كلمة السر"
          }
          placeholderTextColor={"grey"}
          keyboardType="web-search"
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UsernameCheck");
          }}
        >
          <Text
            style={{
              color: "#9279f7",
              marginTop: -16,
              alignSelf:
                i18n.locale === ("en-US" || "en") ? "flex-start" : "flex-end",
            }}
          >
            {i18n.locale === ("en-US" || "en")
              ? " Forgot password?"
              : "نسيت كلمة السر؟"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            zIndex: 99,
            position: "absolute",
            margin: 82,
            marginLeft: i18n.locale === ("en-US" || "en") ? 82 : 20,
            alignSelf:
              i18n.locale === ("en-US" || "en") ? "flex-end" : "flex-start",
          }}
          onPress={() => setSecure(!secure)}
        >
          <Ionicons
            style={{
              fontSize: 25,
            }}
            name={secure === true ? "eye" : "eye-off"}
            size={30}
            color="#9279f7"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            borderRadius: 10,
            elevation: 3,
            backgroundColor: "#9279f7",
            marginTop: 20,
            width: "103%",
          }}
          onPress={handleSubmit}
        >
          <Text
            style={{
              paddingVertical: i18n.locale === ("en-US" || "en") ? 10 : 5,
              borderRadius: 15,
              elevation: 3,
              color: "#f1f1f1",
              fontSize: 18,
              fontWeight: "800",
              alignSelf: "center",
              fontFamily:
                i18n.locale === ("en-US" || "en") ? "UbuntuBold" : "NotoBold",
            }}
          >
            {i18n.t("login")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 40,
    marginTop: 0,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 5,
  },
  button: {
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#9279f7",
    marginTop: 20,
  },
  buttontitle: {
    paddingVertical: 10,
    borderRadius: 15,
    elevation: 3,
    color: "#f1f1f1",
    fontSize: 18,
    fontWeight: "800",
    alignSelf: "center",
  },
  inputLabel: {
    marginBottom: 0,
    marginTop: 8,
    fontFamily: "Ubuntu",
    fontSize: 16,
  },
});
