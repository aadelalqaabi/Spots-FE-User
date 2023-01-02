import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import authStore from "../../stores/authStore";
import { observer } from "mobx-react";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Button,
  SafeAreaView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  Platform,
} from "react-native";
import { Alert } from "react-native";
import TextInput from "react-native-text-input-interactive";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

export default function ForgotPassword({ route }) {
  const colorScheme = useColorScheme();
  const { itemId } = route.params;
  const [user, setUser] = useState(itemId);

  const navigation = useNavigation();
  const [checkValidation, setCheckValidation] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [checkValidationColor, setCheckValidationColor] = useState("#e52b51");
  const [showError, setShowError] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [securePass, setSecurePass] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [number, setNumber] = useState(true);
  const [specialCharacter, setSpecialCharacter] = useState(true);
  const [characterLength, setCharacterLength] = useState(true);
  const [begining, setBegining] = useState(true);

  const handleSubmit = async () => {
    Toast.show({
      type: "success",
      text1: "Password Changed 👍",
      text2: "try to sign back in 🤷‍♂️",
    });
    navigation.navigate("SetUpAccount");
    await authStore.forgotUser(user);
  };

  const translations = {
    en: {
      name: "Enter New Password",
      description:
        "Choose a new password for your account\n (Must pass the tests below)",
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
        "اختر رقم سري لحسابك \n(يجب ان ينجح في الاختبارات في الاسفل)",
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
      setCheckValidationColor("#e52b51");
      setShowError(false);
    } else {
      setCheckValidation(true);
      setCheckValidationColor("#ea3e29");
      setShowError(true);
    }
  };

  const handleConfirm = (pass) => {
    setBegining(false);
    if (user.newPassword === pass) {
      setConfirmed(true);
    } else {
      setConfirmed(false);
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
  // let [fontsLoaded] = useFonts({
  //   UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
  //   Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  //   Noto: require("../../assets/fonts/Noto.ttf"),
  //   NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  // });
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

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
                fontSize: 30,
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
                    marginBottom: 20,
                    padding: 14,
                    fontFamily:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "Ubuntu"
                        : "Noto",
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
                  mainColor={checkValidationColor}
                  label="Password"
                  secureTextEntry={securePass}
                  onChangeText={(text) => {
                    handleChange("newPassword", text);
                  }}
                  placeholder="New Password"
                  placeholderTextColor={"grey"}
                  keyboardType="web-search"
                  onSubmitEditing={() => {
                    handleSubmit;
                  }}
                />
                {/* && checkValidation === true */}
                <Ionicons
                  style={{
                    zIndex: 99,
                    position: "absolute",
                    margin: 12,
                    fontSize: 25,
                    alignSelf: "flex-end",
                  }}
                  name={securePass === true ? "eye" : "eye-off"}
                  size={30}
                  color="#e52b51"
                  onPress={() => setSecurePass(!securePass)}
                />
                <TextInput
                  textInputStyle={{
                    alignSelf: "center",
                    width: "103%",
                    marginBottom: 20,
                    padding: 14,
                    fontFamily:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "Ubuntu"
                        : "Noto",
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
                  mainColor={checkValidationColor}
                  label="Password"
                  secureTextEntry={secureConfirm}
                  onChangeText={(text) => {
                    handleConfirm(text);
                  }}
                  placeholder="Confirm Password"
                  placeholderTextColor={"grey"}
                  keyboardType="web-search"
                  onSubmitEditing={() => {
                    checkValidation === false
                      ? navigation.navigate("SetUpAccount", { itemId: user })
                      : i18n.locale === "en-US" || i18n.locale === "en"
                      ? Alert.alert("Invalid Password", "", [
                          { text: "Try Again" },
                        ])
                      : Alert.alert("كلمة سر غير صالحة", "", [
                          { text: "حاول مرة اخرى" },
                        ]);
                  }}
                />
                <Ionicons
                  style={{
                    zIndex: 99,
                    position: "absolute",
                    margin: 82,
                    fontSize: 25,
                    alignSelf: "flex-end",
                  }}
                  name={secureConfirm === true ? "eye" : "eye-off"}
                  size={30}
                  color="#e52b51"
                  onPress={() => setSecureConfirm(!secureConfirm)}
                />
                {begining === true ? (
                  <></>
                ) : (
                  <>
                    {confirmed === false ? (
                      <Text
                        style={{
                          color: "red",
                          fontSize: 10,
                          marginLeft: 10,
                          marginTop: -18,
                          marginBottom: 15,
                        }}
                      >
                        {" "}
                        Passwords Don't Match
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: "green",
                          fontSize: 10,
                          marginLeft: 10,
                          marginTop: -18,
                          marginBottom: 15,
                        }}
                      >
                        {" "}
                        Passwords Match
                      </Text>
                    )}
                  </>
                )}

                {lowerCase === true ? (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" || i18n.locale === "en"
                          ? "row"
                          : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons name="close-circle" size={22} color="#ea3e29" />
                    <Text
                      style={{
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 3
                            : -3,
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "Ubuntu"
                            : "Noto",
                        marginLeft: 10,
                        marginRight: 10,
                        fontSize: 15,
                        color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                        opacity: 0.8,
                      }}
                    >
                      {i18n.t("lower")}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" || i18n.locale === "en"
                          ? "row"
                          : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#5fcf40"
                    />
                    <Text
                      style={{
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 3
                            : -3,
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "Ubuntu"
                            : "Noto",
                        marginLeft: 10,
                        marginRight: 10,
                        color: "#525252",
                        fontSize: 15,
                        color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                        opacity: 0.8,
                      }}
                    >
                      {i18n.t("lower")}
                    </Text>
                  </View>
                )}
                {upperCase === true ? (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" || i18n.locale === "en"
                          ? "row"
                          : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons name="close-circle" size={22} color="#ea3e29" />
                    <Text
                      style={{
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 3
                            : -3,
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "Ubuntu"
                            : "Noto",
                        marginLeft: 10,
                        marginRight: 10,
                        fontSize: 15,
                        color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                        opacity: 0.8,
                      }}
                    >
                      {i18n.t("upper")}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" || i18n.locale === "en"
                          ? "row"
                          : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#5fcf40"
                    />
                    <Text
                      style={{
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 3
                            : -3,
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "Ubuntu"
                            : "Noto",
                        marginLeft: 10,
                        marginRight: 10,
                        color: "#525252",
                        fontSize: 15,
                        color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                        opacity: 0.8,
                      }}
                    >
                      {i18n.t("upper")}
                    </Text>
                  </View>
                )}
                {number === true ? (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" || i18n.locale === "en"
                          ? "row"
                          : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons name="close-circle" size={22} color="#ea3e29" />
                    <Text
                      style={{
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 3
                            : -3,
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "Ubuntu"
                            : "Noto",
                        marginLeft: 10,
                        marginRight: 10,
                        fontSize: 15,
                        color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                        opacity: 0.8,
                      }}
                    >
                      {i18n.t("number")}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" || i18n.locale === "en"
                          ? "row"
                          : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#5fcf40"
                    />
                    <Text
                      style={{
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 3
                            : -3,
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "Ubuntu"
                            : "Noto",
                        marginLeft: 10,
                        marginRight: 10,
                        color: "#525252",
                        fontSize: 15,
                        color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                        opacity: 0.8,
                      }}
                    >
                      {i18n.t("number")}
                    </Text>
                  </View>
                )}
                {specialCharacter === true ? (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" || i18n.locale === "en"
                          ? "row"
                          : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons name="close-circle" size={22} color="#ea3e29" />
                    <Text
                      style={{
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 3
                            : -3,
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "Ubuntu"
                            : "Noto",
                        marginLeft: 10,
                        marginRight: 10,
                        fontSize: 15,
                        color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                        opacity: 0.8,
                      }}
                    >
                      {i18n.t("special")}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" || i18n.locale === "en"
                          ? "row"
                          : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#5fcf40"
                    />
                    <Text
                      style={{
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 3
                            : -3,
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "Ubuntu"
                            : "Noto",
                        marginLeft: 10,
                        marginRight: 10,
                        color: "#525252",
                        fontSize: 15,
                        color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                        opacity: 0.8,
                      }}
                    >
                      {i18n.t("special")}
                    </Text>
                  </View>
                )}
                {characterLength === true ? (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" || i18n.locale === "en"
                          ? "row"
                          : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons name="close-circle" size={22} color="#ea3e29" />
                    <Text
                      style={{
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 3
                            : -3,
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "Ubuntu"
                            : "Noto",
                        marginLeft: 10,
                        marginRight: 10,
                        fontSize: 15,
                        color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                        opacity: 0.8,
                      }}
                    >
                      {i18n.t("eight")}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection:
                        i18n.locale === "en-US" || i18n.locale === "en"
                          ? "row"
                          : "row-reverse",
                      paddingBottom: 15,
                    }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#5fcf40"
                    />
                    <Text
                      style={{
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 3
                            : -3,
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "Ubuntu"
                            : "Noto",
                        marginLeft: 10,
                        marginRight: 10,
                        color: "#525252",
                        fontSize: 15,
                        color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                        opacity: 0.8,
                      }}
                    >
                      {i18n.t("eight")}
                    </Text>
                  </View>
                )}
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View style={styles.buttonx}>
                  <Button
                    title={"Set Password"}
                    color="white"
                    disabled={!confirmed}
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
