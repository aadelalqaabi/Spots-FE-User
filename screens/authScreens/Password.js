import {
  StyleSheet,
  View,
  Button,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useCallback, useState } from "react";
import React from "react";
import TextInput from "react-native-text-input-interactive";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

export default function Password({ navigation, route }) {
  const colorScheme = useColorScheme();
  const { itemId } = route.params;
  const [user, setUser] = useState(itemId);
  const [checkValidation, setCheckValidation] = useState(true);
  const [checkValidationColor, setCheckValidationColor] = useState("#e52b51");
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
      special: "At least 1 special character (!@#$%^&*=)",
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
      special: "١ رمز على الاقل (!@#$%^&*=)",
      eight: "٨ احرف على الاقل",
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

  const [showInvalidPassword, setShowInvalidPassword] = useState(false);
  const toggleAlertShowInvalidPassword = useCallback(() => {
    setShowInvalidPassword(!showInvalidPassword);
  }, [showInvalidPassword]);

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
  const checkEntry = (password) => {
    const re = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*=])(?=.{8,})"
    );
    const lowerCase = new RegExp("^(?=.*[a-z])");
    const upperCase = new RegExp("^(?=.*[A-Z])");
    const number = new RegExp("^(?=.*[0-9])");
    const specialCharacter = new RegExp("^(?=.*[!@#$%^&*=])");
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
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <View
        style={{
          position: "absolute",
          top: "6.5%",
          left: "5%",
          display: "flex",
          flexDirection: "row",
          zIndex: 1,
          width: "100%",
        }}
      >
        <View
          style={{
            backgroundColor: "#e52b51",
            width: "20%",
            height: 8,
            borderRadius: 4,
            marginRight: 15,
          }}
        ></View>
        <View
          style={{
            backgroundColor: "#e52b51",
            width: "20%",
            height: 8,
            borderRadius: 4,
            marginRight: 15,
          }}
        ></View>
        <View
          style={{
            backgroundColor: "#e52b51",
            width: "20%",
            height: 8,
            borderRadius: 4,
            marginRight: 15,
          }}
        ></View>
        <View
          style={{
            backgroundColor: colorScheme === "dark" ? "#8d8d8d" : "#d8d8d8",
            width: "20%",
            height: 8,
            borderRadius: 4,
            marginRight: 15,
          }}
        ></View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
            }}
          >
            <Ionicons
              style={{
                position: "absolute",
                fontSize: 35,
                marginTop: 90,
                marginLeft: 20,
                paddingRight: 20,
                alignSelf:
                  i18n.language.split("-")[0] === "en"
                    ? "flex-start"
                    : "flex-end",
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
              }}
              name={
                i18n.language.split("-")[0] === "en"
                  ? "chevron-back-outline"
                  : "chevron-forward-outline"
              }
              onPress={() => navigation.goBack()}
            ></Ionicons>
            <View
              style={{
                justifyContent: "center",
                marginTop: 100,
                width: "70%",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily:
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 27,
                  margin: 20,
                  marginTop: 0,
                  marginBottom: i18n.language.split("-")[0] === "en" ? 20 : 10,
                  width: "100%",
                  textAlign: "center",
                  color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                }}
              >
                {i18n.language.split("-")[0] === "en"
                  ? "Enter Password"
                  : "ادخل رقم سري"}
              </Text>
              <Text
                style={{
                  fontFamily:
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  fontSize: i18n.language.split("-")[0] === "en" ? 16 : 18,
                  margin: 20,
                  marginTop: 0,
                  marginBottom: i18n.language.split("-")[0] === "en" ? 20 : 10,
                  width: "100%",
                  textAlign: "center",
                  lineHeight: 23,
                  color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                  opacity: 0.8,
                  paddingTop: 3,
                }}
              >
                {i18n.language.split("-")[0] === "en"
                  ? "Choose a new password for your account\n (Must pass the tests below)"
                  : "اختر رقم سري لحسابك \n(يجب ان ينجح في الاختبارات في الاسفل)"}
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
                      padding: 10,
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
                    secureTextEntry={secure}
                    onChangeText={(text) => {
                      handleChange("password", text);
                    }}
                    placeholder=""
                    keyboardType="web-search"
                    onSubmitEditing={() => {
                      checkValidation === false
                        ? navigation.navigate("MyImage", { itemId: user })
                        : toggleAlertShowInvalidPassword();
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
                    color="#e52b51"
                    onPress={() => setSecure(!secure)}
                  />
                  {lowerCase === true ? (
                    <View
                      style={{
                        flexDirection:
                          i18n.language.split("-")[0] === "en"
                            ? "row"
                            : "row-reverse",
                        paddingBottom: 5,
                      }}
                    >
                      <Ionicons name="close-circle" size={22} color="#ea3e29" />
                      <Text
                        style={{
                          marginTop:
                            i18n.language.split("-")[0] === "en" ? 3 : -3,
                          fontFamily:
                            i18n.language.split("-")[0] === "en"
                              ? "Ubuntu"
                              : "Noto",
                          marginLeft: 10,
                          marginRight: 10,
                          fontSize: 15,
                          color:
                            colorScheme === "light" ? "#000000" : "#f1f1f1",
                          opacity: 0.8,
                        }}
                      >
                        {i18n.language.split("-")[0] === "en"
                          ? "At least 1 lowercase character"
                          : "١ حرف صغير على الاقل"}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection:
                          i18n.language.split("-")[0] === "en"
                            ? "row"
                            : "row-reverse",
                        paddingBottom: 5,
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
                            i18n.language.split("-")[0] === "en" ? 3 : -3,
                          fontFamily:
                            i18n.language.split("-")[0] === "en"
                              ? "Ubuntu"
                              : "Noto",
                          marginLeft: 10,
                          marginRight: 10,
                          color: "#525252",
                          fontSize: 15,
                          color:
                            colorScheme === "light" ? "#000000" : "#f1f1f1",
                          opacity: 0.8,
                        }}
                      >
                        {i18n.language.split("-")[0] === "en"
                          ? "At least 1 lowercase character"
                          : "١ حرف صغير على الاقل"}
                      </Text>
                    </View>
                  )}
                  {upperCase === true ? (
                    <View
                      style={{
                        flexDirection:
                          i18n.language.split("-")[0] === "en"
                            ? "row"
                            : "row-reverse",
                        paddingBottom: 5,
                      }}
                    >
                      <Ionicons name="close-circle" size={22} color="#ea3e29" />
                      <Text
                        style={{
                          marginTop:
                            i18n.language.split("-")[0] === "en" ? 3 : -3,
                          fontFamily:
                            i18n.language.split("-")[0] === "en"
                              ? "Ubuntu"
                              : "Noto",
                          marginLeft: 10,
                          marginRight: 10,
                          fontSize: 15,
                          color:
                            colorScheme === "light" ? "#000000" : "#f1f1f1",
                          opacity: 0.8,
                        }}
                      >
                        {i18n.language.split("-")[0] === "en"
                          ? "At least 1 uppercase character"
                          : "١ حرف كبير على الاقل"}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection:
                          i18n.language.split("-")[0] === "en"
                            ? "row"
                            : "row-reverse",
                        paddingBottom: 5,
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
                            i18n.language.split("-")[0] === "en" ? 3 : -3,
                          fontFamily:
                            i18n.language.split("-")[0] === "en"
                              ? "Ubuntu"
                              : "Noto",
                          marginLeft: 10,
                          marginRight: 10,
                          color: "#525252",
                          fontSize: 15,
                          color:
                            colorScheme === "light" ? "#000000" : "#f1f1f1",
                          opacity: 0.8,
                        }}
                      >
                        {i18n.language.split("-")[0] === "en"
                          ? "At least 1 uppercase character"
                          : "١ حرف كبير على الاقل"}
                      </Text>
                    </View>
                  )}
                  {number === true ? (
                    <View
                      style={{
                        flexDirection:
                          i18n.language.split("-")[0] === "en"
                            ? "row"
                            : "row-reverse",
                        paddingBottom: 5,
                      }}
                    >
                      <Ionicons name="close-circle" size={22} color="#ea3e29" />
                      <Text
                        style={{
                          marginTop:
                            i18n.language.split("-")[0] === "en" ? 3 : -3,
                          fontFamily:
                            i18n.language.split("-")[0] === "en"
                              ? "Ubuntu"
                              : "Noto",
                          marginLeft: 10,
                          marginRight: 10,
                          fontSize: 15,
                          color:
                            colorScheme === "light" ? "#000000" : "#f1f1f1",
                          opacity: 0.8,
                        }}
                      >
                        {i18n.language.split("-")[0] === "en"
                          ? "At least 1 number"
                          : "١ رقم على الاقل"}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection:
                          i18n.language.split("-")[0] === "en"
                            ? "row"
                            : "row-reverse",
                        paddingBottom: 5,
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
                            i18n.language.split("-")[0] === "en" ? 3 : -3,
                          fontFamily:
                            i18n.language.split("-")[0] === "en"
                              ? "Ubuntu"
                              : "Noto",
                          marginLeft: 10,
                          marginRight: 10,
                          color: "#525252",
                          fontSize: 15,
                          color:
                            colorScheme === "light" ? "#000000" : "#f1f1f1",
                          opacity: 0.8,
                        }}
                      >
                        {i18n.language.split("-")[0] === "en"
                          ? "At least 1 number"
                          : "١ رقم على الاقل"}
                      </Text>
                    </View>
                  )}
                  {specialCharacter === true ? (
                    <View
                      style={{
                        flexDirection:
                          i18n.language.split("-")[0] === "en"
                            ? "row"
                            : "row-reverse",
                        paddingBottom: 5,
                      }}
                    >
                      <Ionicons name="close-circle" size={22} color="#ea3e29" />
                      <Text
                        style={{
                          marginTop:
                            i18n.language.split("-")[0] === "en" ? 3 : -3,
                          fontFamily:
                            i18n.language.split("-")[0] === "en"
                              ? "Ubuntu"
                              : "Noto",
                          marginLeft: 10,
                          marginRight: 10,
                          fontSize: 15,
                          color:
                            colorScheme === "light" ? "#000000" : "#f1f1f1",
                          opacity: 0.8,
                        }}
                      >
                        {i18n.language.split("-")[0] === "en"
                          ? "At least 1 special character (!@#$%^&*=)"
                          : "١ رمز على الاقل (!@#$%^&*=)"}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection:
                          i18n.language.split("-")[0] === "en"
                            ? "row"
                            : "row-reverse",
                        paddingBottom: 5,
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
                            i18n.language.split("-")[0] === "en" ? 3 : -3,
                          fontFamily:
                            i18n.language.split("-")[0] === "en"
                              ? "Ubuntu"
                              : "Noto",
                          marginLeft: 10,
                          marginRight: 10,
                          color: "#525252",
                          fontSize: 15,
                          color:
                            colorScheme === "light" ? "#000000" : "#f1f1f1",
                          opacity: 0.8,
                        }}
                      >
                        {i18n.language.split("-")[0] === "en"
                          ? "At least 1 special character (!@#$%^&*=)"
                          : "١ رمز على الاقل (!@#$%^&*=)"}
                      </Text>
                    </View>
                  )}
                  {characterLength === true ? (
                    <View
                      style={{
                        flexDirection:
                          i18n.language.split("-")[0] === "en"
                            ? "row"
                            : "row-reverse",
                        paddingBottom: 5,
                      }}
                    >
                      <Ionicons name="close-circle" size={22} color="#ea3e29" />
                      <Text
                        style={{
                          marginTop:
                            i18n.language.split("-")[0] === "en" ? 3 : -3,
                          fontFamily:
                            i18n.language.split("-")[0] === "en"
                              ? "Ubuntu"
                              : "Noto",
                          marginLeft: 10,
                          marginRight: 10,
                          fontSize: 15,
                          color:
                            colorScheme === "light" ? "#000000" : "#f1f1f1",
                          opacity: 0.8,
                        }}
                      >
                        {i18n.language.split("-")[0] === "en"
                          ? "At least 8 characters"
                          : "٨ احرف على الاقل"}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection:
                          i18n.language.split("-")[0] === "en"
                            ? "row"
                            : "row-reverse",
                        paddingBottom: 5,
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
                            i18n.language.split("-")[0] === "en" ? 3 : -3,
                          fontFamily:
                            i18n.language.split("-")[0] === "en"
                              ? "Ubuntu"
                              : "Noto",
                          marginLeft: 10,
                          marginRight: 10,
                          color: "#525252",
                          fontSize: 15,
                          color:
                            colorScheme === "light" ? "#000000" : "#f1f1f1",
                          opacity: 0.8,
                        }}
                      >
                        {i18n.language.split("-")[0] === "en"
                          ? "At least 8 characters"
                          : "٨ احرف على الاقل"}
                      </Text>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    marginBottom: 35,
                  }}
                >
                  {checkValidation === true ? (
                    <TouchableOpacity
                      disabled={checkValidation}
                      style={styles.buttonx}
                    >
                      <Text
                        style={{
                          padding: 10,
                          paddingTop: 8,
                          paddingBottom: 8,
                          textAlign: "center",
                          fontSize: 18,
                          fontFamily:
                            i18n.language.split("-")[0] === "en"
                              ? "Ubuntu"
                              : "Noto",
                          color: "white",
                        }}
                      >
                        {i18n.language.split("-")[0] === "en"
                          ? "Next"
                          : "التالي"}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={checkValidation}
                      style={styles.button}
                      onPress={() => {
                        navigation.navigate("MyImage", { itemId: user });
                      }}
                    >
                      <Text
                        style={{
                          padding: 10,
                          paddingTop: 8,
                          paddingBottom: 8,
                          textAlign: "center",
                          fontSize: 18,
                          fontFamily:
                            i18n.language.split("-")[0] === "en"
                              ? "Ubuntu"
                              : "Noto",
                          color: "white",
                        }}
                      >
                        {i18n.language.split("-")[0] === "en"
                          ? "Next"
                          : "التالي"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Invalid Password */}
      <Modal
        transparent={true}
        visible={showInvalidPassword}
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
                fontSize: 24,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Invalid Password"
                : "كلمة سر غير صالحة"}
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
                ? "please try again"
                : "يرجى المحاولة مرة أخرى"}
            </Text>
            <TouchableOpacity
              style={{
                width: "50%",
                backgroundColor: "#e52b51",
                borderRadius: 50,
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => toggleAlertShowInvalidPassword()}
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
    backgroundColor: "#e52b51",
  },
  buttonx: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 10,
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
