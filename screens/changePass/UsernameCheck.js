import {
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { Alert } from "react-native";
import React from "react";
import TextInput from "react-native-text-input-interactive";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

import { Ionicons } from "@expo/vector-icons";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import authStore from "../../stores/authStore";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

export default function UsernameCheck() {
  const [user, setUser] = useState({
    email: "",
    newPassword: "",
    confirmPassword: ""
  });
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      name: "Enter Your Email",
      description: "Enter a valid account email\n (Must be a valid email)",
      next: "Next",
    },
    ar: {
      name: "ادخل بريدك الالكتروني",
      description: "اختر اسم ليظهر في حسابك \n(يجب ان يكون حرفين على الاقل)",
      next: "التالي",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = () => {
    navigation.navigate("CheckOTP", { itemId: user });
    authStore.getOTP(user.email);
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
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          <Ionicons
            style={{
              position: "absolute",
              fontSize: 35,
              marginTop: 80,
              marginLeft: 20,
              paddingRight: 20,
              alignSelf:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "flex-start"
                  : "flex-end",
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            }}
            name={
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "chevron-back-outline"
                : "chevron-forward-outline"
            }
            onPress={() => navigation.goBack()}
          ></Ionicons>
          <View
            style={{
              justifyContent: "center",
              marginTop: 130,
              width: "70%",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                fontSize:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 30 : 35,
                margin: 20,
                marginTop: 0,
                marginBottom:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 20 : 10,
                width: "100%",
                textAlign: "center",
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              }}
            >
              {i18n.t("name")}
            </Text>
            <Text
              style={{
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                fontSize:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 16 : 18,
                margin: 20,
                marginTop: 0,
                marginBottom:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 20 : 10,
                width: "100%",
                textAlign: "center",
                color: "#64666b",
                lineHeight: 23,
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                opacity: 0.8,
                paddingTop: 3,
              }}
            >
              {i18n.t("description")}
            </Text>

            <View
              style={{
                width: "110%",
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "73%",
              }}
            >
              <View style={styles.container}>
                <TextInput
                  textInputStyle={{
                    alignSelf: "center",
                    width: "103%",
                    marginBottom: 10,
                    padding: 14,
                    paddingLeft: 50,
                    paddingRight: 50,
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
                  mainColor={"#e52b51"}
                  label="Email"
                  onChangeText={(text) => {
                    handleChange("email", text);
                  }}
                  placeholder=""
                  keyboardType="default"
                  enableIcon="true"
                  onSubmitEditing={handleSubmit}
                />
                <Ionicons
                  style={{
                    zIndex: 99,
                    position: "absolute",
                    margin: 12,
                    fontSize: 25,
                    alignSelf:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "flex-start"
                        : "flex-end",
                  }}
                  name="mail"
                  size={30}
                  color="#e52b51"
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  marginBottom: 50,
                }}
              >
                <View
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 32,
                    borderRadius: 10,
                    elevation: 3,
                    backgroundColor: "#e52b51",
                  }}
                >
                  <Button
                    title={i18n.t("next")}
                    color="white"
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            </View>
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
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#e52b51",
  },
  buttonx: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#ef7f96",
  },
  passwordContainer: {
    flexDirection: "row",
    // borderBottomWidth: 1,
    borderColor: "#000",
    paddingBottom: 10,
  },
  errorContainer: {
    // borderWidth: 2,
    // borderTopWidth: 5,
    // borderBottomWidth: 5,
    // borderLeftWidth: 5,
    // borderRightWidth: 5,
    // borderColor: '#000',
    // paddingBottom: 10,
    flexDirection: "row",
    // borderBottomWidth: 1,
    borderColor: "#000",
    paddingBottom: 10,
    marginTop: -12,
    marginLeft: 8,
  },
  errorText: {
    marginTop: 3,
    marginLeft: -3,
    color: "red",
    fontSize: 10,
  },
  correctText: {
    marginTop: 3,
    marginLeft: -2,
    color: "green",
    fontSize: 10,
  },
  // icon: {
  //   zIndex: 99,
  //   position: "absolute",
  //   marginLeft: 12,
  //   marginTop: 12,
  //   fontSize: 25,
  //   color: "grey",
  // },
  container: {
    /// width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
    marginTop: 5,
    marginRight: 15,
    marginLeft: 5,
    flex: 1,
  },

  formField: {
    padding: 14,
    paddingLeft: 50,
    borderRadius: 13,
    fontSize: 18,
    fontFamily: "Ubuntu",
    width: "100%",
  },
});

{
  /* marginBottom: 120*/
}
