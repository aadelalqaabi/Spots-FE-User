import {
  StyleSheet,
  View,
  Button,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import PhoneInput from "react-native-phone-number-input";

import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

export default function PhoneNo({ navigation, route }) {
  const colorScheme = useColorScheme();

  const { itemId } = route.params;
  const [user, setUser] = useState(itemId);
  const [checkValidation, setCheckValidation] = useState(true);
  const [checkValidationColor, setCheckValidationColor] = useState("#9279f7");
  const [begining, setBegining] = useState(true);
  const [showError, setShowError] = useState(true);

  const translations = {
    en: {
      name: "Enter Your Number",
      description:
        "Choose a name for your account\n (Must be at least 2 characters)",
      next: "Next",
      phone: "Phone Number",
    },
    ar: {
      name: "ادخل رقمك",
      description:
        "اضف رقمك للتسجيل في حسابك لاحقا \n(يجب ان يكون ٨ ارقام على الاقل)",
      next: "التالي",
      phone: "رقم الهاتف",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  const handleChange = (name, value) => {
    const check = checkEntry(value);
    if (check === true) {
      setUser({ ...user, [name]: value });
      console.log("user.phone", user.phone);
      setCheckValidation(false);
      setCheckValidationColor("#9279f7");
      setShowError(false);
    } else {
      setCheckValidation(true);
      setCheckValidationColor("#ea3e29");
      setBegining(false);
      setShowError(true);
    }
  };
  const checkEntry = (phoneNumber) => {
    // const re = new RegExp("^(?=.[0-9]{7,7}$)");
    const re = new RegExp("^(?=.[0-9]{11,11}$)");
    // ^[0-9]{4} ^(?=.{8,})
    return re.test(phoneNumber);
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
              alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            }}
            name={
              i18n.locale === "en-US"
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
                fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                fontSize: i18n.locale === "en-US" ? 30 : 35,
                margin: 20,
                marginBottom: i18n.locale === "en-US" ? 20 : 10,
                marginTop: 0,
                width: "100%",
                textAlign: "center",
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              }}
            >
              {i18n.t("name")}
            </Text>
            <Text
              style={{
                fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                fontSize: i18n.locale === "en-US" ? 16 : 18,
                margin: 20,
                paddingTop: 3,
                marginTop: 0,
                width: "100%",
                textAlign: "center",
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                lineHeight: 23,
                opacity: 0.8,
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
                    marginTop: i18n.locale === "en-US" ? 0 : -6,
                    marginBottom: i18n.locale === "en-US" ? 0 : -6,
                  }}
                  defaultValue={user.phoneNumber}
                  defaultCode="KW"
                  layout="first"
                  placeholder={i18n.t("phone")}
                  onChangeFormattedText={(text) => {
                    handleChange("phone", text);
                  }}
                  withDarkTheme
                  withShadow
                  autoFocus
                />
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                {checkValidation === true ? (
                  <View style={styles.buttonx}>
                    <Button
                      title={i18n.t("next")}
                      color="white"
                      disabled={checkValidation}
                      onPress={() => {
                        navigation.navigate("Email", { itemId: user });
                      }}
                    />
                  </View>
                ) : (
                  <View style={styles.button}>
                    <Button
                      title={i18n.t("next")}
                      color="white"
                      disabled={checkValidation}
                      onPress={() => {
                        navigation.navigate("Email", { itemId: user });
                      }}
                    />
                  </View>
                )}
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
    backgroundColor: "#9279f7",
  },
  buttonx: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#a08cf3",
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
  container: {
    //width: "90%",
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
  icon: {
    zIndex: 99,
    position: "absolute",
    marginLeft: 12,
    marginTop: 12,
    fontSize: 25,
    // color: "grey",
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
