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
import { Alert } from "react-native";
import React from "react";
import TextInput from "react-native-text-input-interactive";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

export default function Password({ navigation, route }) {
  const { itemId } = route.params;
  const [user, setUser] = useState(itemId);
  const [checkValidation, setCheckValidation] = useState(true);
  const [checkValidationColor, setCheckValidationColor] = useState("#4831d4");
  const [showError, setShowError] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [secure, setSecure] = useState(true);
  const [number, setNumber] = useState(true);
  const [specialCharacter, setSpecialCharacter] = useState(true);
  const [characterLength, setCharacterLength] = useState(true);
  const translations = {
    en: {
      name: "Enter Password",
      description:
        "Choose a password for your account\n (Must pass the tests below)",
      next: "Next",
      lower: "At least 1 lowercase character",
      upper: "At least 1 uppercase character",
      number: "At least 1 number",
      special: "At least 1 special character",
      eight: "At least 8 characters",
    },
    ar: {
      name: "ادخل رقمك السري",
      description:
        "اختر رقم سري لحسابك \n(يجب ان بنجح في الاختبارات في الاسفل)",
      next: "التالي",
      lower: "١ حرف صغير على الاقل",
      upper: "١ حرف كبير على الاقل",
      number: "١ رقم على الاقل",
      special: "١ رمز على الاقل",
      eight: "٨ احرف على الاقل",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;

  const handleChange = (name, value) => {
    const check = checkEntry(value);
    if (check === true) {
      setUser({ ...user, [name]: value });
      setCheckValidation(false);
      setCheckValidationColor("#4831d4");
      setShowError(false);
    } else {
      setCheckValidation(true);
      setCheckValidationColor("red");
      setShowError(true);
    }
  };
  const checkEntry = (password) => {
    const re = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const lowerCase = new RegExp("^(?=.*[a-z])");
    const upperCase = new RegExp("^(?=.*[A-Z])");
    const number = new RegExp("^(?=.*[0-9])");
    const specialCharacter = new RegExp("^(?=.*[!@#$%^&*])");
    const characterLength = new RegExp("^(?=.{8,})");

    if (lowerCase.test(password) === true) {
      setLowerCase(false);
    } else {
      setLowerCase(true);
    }

    if (upperCase.test(password) === true) {
      setUpperCase(false);
    } else {
      setUpperCase(true);
    }

    if (number.test(password) === true) {
      setNumber(false);
    } else {
      setNumber(true);
    }

    if (specialCharacter.test(password) === true) {
      setSpecialCharacter(false);
    } else {
      setSpecialCharacter(true);
    }

    if (characterLength.test(password) === true) {
      setCharacterLength(false);
    } else {
      setCharacterLength(true);
    }

    return re.test(password);
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
                <TextInput
                  textInputStyle={{
                    alignSelf: "center",
                    width: "103%",
                    marginBottom: 20,
                  }}
                  mainColor={checkValidationColor}
                  label="Password"
                  secureTextEntry={secure}
                  onChangeText={(text) => {
                    handleChange("password", text);
                  }}
                  placeholder=""
                  keyboardType="web-search"
                  onSubmitEditing={() => {
                    checkValidation === false
                      ? navigation.navigate("MyImage", { itemId: user })
                      : Alert.alert("Invalid Password", "", [
                          { text: "Try Again" },
                        ]);
                  }}
                />
                <Ionicons
                  style={{
                    zIndex: 99,
                    position: "absolute",
                    margin: 12,
                    fontSize: 25,
                    alignSelf: "flex-end",
                  }}
                  name={secure === true ? "eye" : "eye-off"}
                  size={30}
                  color="#4831d4"
                  onPress={() => setSecure(!secure)}
                />

                {lowerCase === true ? (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" ? "row" : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons name="close-circle" size={22} color="red" />
                    <Text style={styles.errorText}>{i18n.t("lower")}</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" ? "row" : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#00b100"
                    />
                    <Text style={styles.correctText}>{i18n.t("lower")}</Text>
                  </View>
                )}
                {upperCase === true ? (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" ? "row" : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons name="close-circle" size={22} color="red" />
                    <Text style={styles.errorText}>{i18n.t("upper")}</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" ? "row" : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#00b100"
                    />
                    <Text style={styles.correctText}>{i18n.t("upper")}</Text>
                  </View>
                )}
                {number === true ? (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" ? "row" : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons name="close-circle" size={22} color="red" />
                    <Text style={styles.errorText}>{i18n.t("number")}</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" ? "row" : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#00b100"
                    />
                    <Text style={styles.correctText}>{i18n.t("number")}</Text>
                  </View>
                )}
                {specialCharacter === true ? (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" ? "row" : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons name="close-circle" size={22} color="red" />
                    <Text style={styles.errorText}>{i18n.t("special")}</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" ? "row" : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#00b100"
                    />
                    <Text style={styles.correctText}>{i18n.t("special")}</Text>
                  </View>
                )}
                {characterLength === true ? (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" ? "row" : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons name="close-circle" size={22} color="red" />
                    <Text style={styles.errorText}>{i18n.t("eight")}</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" ? "row" : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#00b100"
                    />
                    <Text style={styles.correctText}>{i18n.t("eight")}</Text>
                  </View>
                )}
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                {checkValidation === true ? (
                  <View style={styles.buttonx}>
                    <Button
                      title={i18n.t("next")}
                      color="white"
                      disabled={checkValidation}
                      onPress={() => {
                        navigation.navigate("MyImage", { itemId: user });
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
                        navigation.navigate("MyImage", { itemId: user });
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

  errorText: {
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10,
    color: "#525252",
    fontSize: 15,
  },
  correctText: {
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10,
    color: "#525252",
    fontSize: 15,
  },
  container: {
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
});
