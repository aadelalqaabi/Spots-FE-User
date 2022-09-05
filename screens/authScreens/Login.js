import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import authStore from "../../stores/authStore";
import React from "react";
import TextInput from "react-native-text-input-interactive";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import PhoneInput from "react-native-phone-number-input";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

export default function Login() {
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
    // phone: "",
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
  });
  if (!fontsLoaded) {
    return <AppLoading />;
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
        <PhoneInput
          containerStyle={{
            alignSelf: "center",
            width: "100%",
            marginBottom: 10,
          }}
          textInputStyle={{
            fontFamily: "Ubuntu",
            textAlign: i18n.locale === "en-US" ? "left" : "right",
          }}
          defaultValue={user.phone}
          defaultCode="KW"
          layout="first"
          placeholder={i18n.t("phone")}
          onChangeFormattedText={(text) => {
            handleChange("username", text);
          }}
          withDarkTheme
          withShadow
          autoFocus
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttontitle}>{i18n.t("login")}</Text>
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
    backgroundColor: "#4831d4",
    marginTop: 20,
  },
  buttontitle: {
    paddingVertical: 10,
    borderRadius: 15,
    elevation: 3,
    color: "white",
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
