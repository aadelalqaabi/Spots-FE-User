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
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import PhoneInput from "react-native-phone-number-input";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import TextInput from "react-native-text-input-interactive";

export default function Login() {
  const colorScheme = useColorScheme();
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
    phone: "",
    // username: "",
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
            fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
            textAlign: i18n.locale === "en-US" ? "left" : "right",
            marginTop: i18n.locale === "en-US" ? 0 : -4,
            marginBottom: i18n.locale === "en-US" ? 0 : -4,
          }}
          defaultValue={user.phone}
          defaultCode="KW"
          layout="first"
          placeholder={i18n.t("phone")}
          onChangeFormattedText={(text) => {
            handleChange("username", text);
          }}
          withDarkTheme
          autoFocus
        />
        <TextInput
          textInputStyle={{
            alignSelf: "center",
            width: "103%",
            marginBottom: 20,
          }}
          mainColor={"blue"}
          label="Password"
          // secureTextEntry={secure}
          onChangeText={(text) => {
            handleChange("password", text);
          }}
          placeholder=""
          keyboardType="web-search"
          onSubmitEditing={() => {
            checkValidation === false
              ? navigation.navigate("MyImage", { itemId: user })
              : Alert.alert("Invalid Password", "", [{ text: "Try Again" }]);
          }}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text
            style={{
              paddingVertical: i18n.locale === "en-US" ? 10 : 4,
              borderRadius: 15,
              elevation: 3,
              color: "#f1f1f1",
              fontSize: 18,
              fontWeight: "800",
              alignSelf: "center",
              fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
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
    backgroundColor: "#7758F6",
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
