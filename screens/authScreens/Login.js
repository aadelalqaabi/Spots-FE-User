import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import authStore from "../../stores/authStore";
import React from "react";
import { useFonts } from "expo-font";
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
      new: "New here?",
      register: "Register Now",
      title: "Login",
    },
    ar: {
      new: "جديد هنا؟",
      register: "سجل الآن ",
      phone: "رقم الهاتف",
      login: "تسجيل دخول",
      title: "تسجيل دخول",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;

  const [user, setUser] = useState({
    email: "",
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: colorScheme === "light" ? "#f1f1f1" : "#1b1b1b",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            marginTop: "30%",
            width: "80%",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              marginTop: -40,
              marginLeft: -10,
              paddingRight: -10,
              alignSelf:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "flex-start"
                  : "flex-end",
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              style={{
                fontSize: 35,
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              }}
              name={
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "chevron-back-outline"
                  : "chevron-forward-outline"
              }
            ></Ionicons>
          </TouchableOpacity>
          <Text
            style={{
              fontSize:
                i18n.locale === "en-US" || i18n.locale === "en" ? 40 : 30,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              textAlign:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "left"
                  : "right",
              color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
              margin: 0,
              marginTop: 20,
              marginBottom:
                i18n.locale === "en-US" || i18n.locale === "en" ? 30 : 25,
            }}
          >
            {i18n.t("title")}
          </Text>
          <View style={{ display: "flex", width: "100%" }}>
            <TextInput
              textInputStyle={{
                alignSelf: "center",
                width: "103%",
                marginBottom: 20,
                padding: 10,
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                textAlign:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "left"
                    : "right",
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
              label="Email"
              // secureTextEntry={secure}
              onChangeText={(text) => {
                handleChange("email", text);
              }}
              placeholder={
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Email"
                  : "البريد الالكتروني"
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
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                textAlign:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "left"
                    : "right",
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
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Password"
                  : "كلمة السر"
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
                  color: "#e52b51",
                  marginTop: -16,
                  alignSelf:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "flex-start"
                      : "flex-end",
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? " Forgot password?"
                  : "نسيت كلمة السر؟"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                zIndex: 99,
                position: "absolute",
                margin: 82,
                marginLeft:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 82 : 20,
                alignSelf:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "flex-end"
                    : "flex-start",
              }}
              onPress={() => setSecure(!secure)}
            >
              <Ionicons
                style={{
                  fontSize: 25,
                }}
                name={secure === true ? "eye" : "eye-off"}
                size={30}
                color="#e52b51"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 8,
                borderRadius: 10,
                elevation: 3,
                backgroundColor: "#e52b51",
                marginTop: 20,
                width: "103%",
              }}
              onPress={handleSubmit}
            >
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
                {i18n.t("login")}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              flexDirection:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "row"
                  : "row-reverse",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                fontSize: 18,
                paddingRight: 8,
                paddingLeft: 8,
                opacity: 0.8,
              }}
            >
              {i18n.t("new")}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MainPageRegister");
              }}
              style={styles.signUp}
            >
              <Text
                style={{
                  color: "#e52b51",
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 20,
                }}
              >
                {i18n.t("register")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    backgroundColor: "#e52b51",
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
