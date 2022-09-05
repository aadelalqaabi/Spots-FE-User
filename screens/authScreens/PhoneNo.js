import {
  StyleSheet,
  View,
  Button,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import PhoneInput from "react-native-phone-number-input";
import AppLoading from "expo-app-loading";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

export default function PhoneNo({ navigation, route }) {
  const { itemId } = route.params;
  const [user, setUser] = useState(itemId);
  const [checkValidation, setCheckValidation] = useState(true);
  const [checkValidationColor, setCheckValidationColor] = useState("#4831d4");
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
      setCheckValidationColor("#4831d4");
      setShowError(false);
    } else {
      setCheckValidation(true);
      setCheckValidationColor("red");
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
  });
  if (!fontsLoaded) {
    return <AppLoading />;
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
            backgroundColor: "white",
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
                fontFamily: "UbuntuBold",
                fontSize: i18n.locale === "en-US" ? 30 : 35,
                margin: 20,
                marginTop: 0,
                width: "100%",
                textAlign: "center",
              }}
            >
              {i18n.t("name")}
            </Text>
            <Text
              style={{
                fontFamily: "Ubuntu",
                fontSize: i18n.locale === "en-US" ? 16 : 18,
                margin: 20,
                marginTop: 0,
                width: "100%",
                textAlign: "center",
                color: "#64666b",
                lineHeight: 23,
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
                    width: "103%",
                    marginBottom: 10,
                  }}
                  textInputStyle={{
                    fontFamily: "Ubuntu",
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
    backgroundColor: "#4831d4",
  },
  buttonx: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#988be6",
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
