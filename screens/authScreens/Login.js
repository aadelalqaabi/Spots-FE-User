import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import { useCallback, useState } from "react";
import authStore from "../../stores/authStore";
import React from "react";
import { useFonts } from "expo-font";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
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

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: translations,
    lng: Localization.locale,
    fallbackLng: true,
    interpolation: {
      escapeValue: false,
    },
  });

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showInvalidInfo, setShowInvalidInfo] = useState(false);
  const toggleAlertShowInvalidInfo = useCallback(() => {
    setShowInvalidInfo(!showInvalidInfo);
  }, [showInvalidInfo]);

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    const status = await authStore.login(user);
    if (status === "not logged in") {
      toggleAlertShowInvalidInfo();
    }
    if (authStore.user) navigation.navigate("Home");
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
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: colorScheme === "light" ? "#f1f1f1" : "#000000",
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
                  i18n.language.split("-")[0] === "en"
                    ? "flex-start"
                    : "flex-end",
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                style={{
                  fontSize: 35,
                  color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                }}
                name={
                  i18n.language.split("-")[0] === "en"
                    ? "chevron-back-outline"
                    : "chevron-forward-outline"
                }
              ></Ionicons>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: i18n.language.split("-")[0] === "en" ? 40 : 30,
                fontFamily:
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                textAlign:
                  i18n.language.split("-")[0] === "en" ? "left" : "right",
                color: colorScheme === "dark" ? "#f1f1f1" : "#000000",
                margin: 0,
                marginTop: 20,
                marginBottom: i18n.language.split("-")[0] === "en" ? 30 : 25,
              }}
            >
              {i18n.language.split("-")[0] === "en" ? "Login" : "تسجيل دخول"}
            </Text>
            <View style={{ display: "flex", width: "100%" }}>
              <TextInput
                textInputStyle={{
                  alignSelf: "center",
                  width: "103%",
                  marginBottom: 20,
                  padding: 10,
                  fontFamily:
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  textAlign:
                    i18n.language.split("-")[0] === "en" ? "left" : "right",
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
                  i18n.language.split("-")[0] === "en"
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
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  textAlign:
                    i18n.language.split("-")[0] === "en" ? "left" : "right",
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
                  i18n.language.split("-")[0] === "en"
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
                      i18n.language.split("-")[0] === "en"
                        ? "flex-start"
                        : "flex-end",
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 15,
                  }}
                >
                  {i18n.language.split("-")[0] === "en"
                    ? " Forgot password?"
                    : "نسيت كلمة السر؟"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  zIndex: 99,
                  position: "absolute",
                  margin: 82,
                  marginLeft: i18n.language.split("-")[0] === "en" ? 82 : 20,
                  alignSelf:
                    i18n.language.split("-")[0] === "en"
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
                      i18n.language.split("-")[0] === "en" ? 10 : 5,
                    borderRadius: 15,
                    elevation: 3,
                    color: "#f1f1f1",
                    fontSize: 18,
                    fontWeight: "800",
                    alignSelf: "center",
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                  }}
                >
                  {i18n.language.split("-")[0] === "en"
                    ? "Login"
                    : "تسجيل الدخول"}
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
                  i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: colorScheme === "dark" ? "#f1f1f1" : "#000000",
                  fontFamily:
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  fontSize: 18,
                  paddingRight: 8,
                  paddingLeft: 8,
                  opacity: 0.8,
                }}
              >
                {i18n.language.split("-")[0] === "en"
                  ? "New here?"
                  : "جديد هنا؟"}
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
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 20,
                  }}
                >
                  {i18n.language.split("-")[0] === "en"
                    ? "Register now"
                    : "سجل الآن"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Invalid Password */}
      <Modal
        transparent={true}
        visible={showInvalidInfo}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "white",
              padding: 25,
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              borderColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                marginBottom: 10,
                fontFamily:
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                width: "90%",
                textAlign: "center",
                fontSize: i18n.language.split("-")[0] === "en" ? 24 : 20,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Wrong login info"
                : "معلومات تسجيل الدخول خاطئة"}
            </Text>
            <Text
              style={{
                marginBottom: 20,
                width: "70%",
                textAlign: "center",
                fontSize: 17,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                lineHeight: 30,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Wrong email or password"
                : "بريد الكتروني او كلمه سر خاطئه"}
            </Text>
            <TouchableOpacity
              style={{
                width: "50%",
                backgroundColor: "#e52b51",
                borderRadius: 50,
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => toggleAlertShowInvalidInfo()}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#f1f1f1",
                  fontFamily:
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.language.split("-")[0] === "en"
                  ? "try again"
                  : "حاول مرة اخرى"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Invalid Password */}
    </>
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
