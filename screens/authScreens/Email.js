import {
  StyleSheet,
  View,
  Button,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  useColorScheme,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import TextInput from "react-native-text-input-interactive";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import authStore from "../../stores/authStore";

export default function Email({ navigation, route }) {
  const colorScheme = useColorScheme();
  const { itemId } = route.params;
  const [user, setUser] = useState(itemId);
  const [checkValidation, setCheckValidation] = useState(true);
  const [checkValidationColor, setCheckValidationColor] = useState("#e52b51");
  const [begining, setBegining] = useState(true);
  const [showError, setShowError] = useState(true);
  const [existsError, setExistsError] = useState(false);
  const translations = {
    en: {
      name: "Enter Your Email",
      description:
        "Choose an email for your account\n to receive confirmation emails",
      next: "Next",
      email: "Email",
    },
    ar: {
      name: "ادخل بريدك الالكتروني",
      description:
        "اختر البريد الالكتروني الخاص بك \nلاستلام بريد تأكيد حجز لاحقا",
      next: "التالي",
      email: "بريدك الالكتروني",
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

  const [showInvalidEmail, setShowInvalidEmail] = useState(false);
  const toggleAlertShowInvalidEmail = useCallback(() => {
    setShowInvalidEmail(!showInvalidEmail);
  }, [showInvalidEmail]);

  useEffect(() => {
    authStore.getEmails();
  }, []);
  const handleChange = (name, value) => {
    const check = checkEntry(value);
    const checkExists = authStore?.userEmails?.some(
      (user) => user.email === value
    );
    if (check === true) {
      if (checkExists === false) {
        setUser({ ...user, [name]: value });
        setCheckValidation(false);
        setCheckValidationColor("green");
        setShowError(false);
        setExistsError(false);
      } else {
        setCheckValidation(false);
        setCheckValidationColor("#ea3e29");
        setShowError(true);
        setExistsError(true);
      }
    } else {
      setExistsError(true);
      setCheckValidation(true);
      setCheckValidationColor("#ea3e29");
      setBegining(false);
      setShowError(true);
      setExistsError(false);
    }
  };
  const checkEntry = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
            backgroundColor: colorScheme === "dark" ? "#8d8d8d" : "#d8d8d8",
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
              backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
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
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
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
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
              >
                {i18n.language.split("-")[0] === "en"
                  ? "Enter Your Email"
                  : "ادخل بريدك الالكتروني"}
              </Text>
              <Text
                style={{
                  fontFamily:
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  fontSize: i18n.language.split("-")[0] === "en" ? 16 : 18,
                  margin: 20,
                  marginTop: 0,
                  marginBottom: i18n.language.split("-")[0] === "en" ? 20 : 10,
                  paddingTop: 3,
                  width: "100%",
                  textAlign: "center",
                  color: "#64666b",
                  lineHeight: 23,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                  opacity: 0.8,
                }}
              >
                {i18n.language.split("-")[0] === "en"
                  ? "Choose an email for your account\n to receive confirmation emails"
                  : "اختر البريد الالكتروني الخاص بك \nلاستلام بريد تأكيد حجز لاحقا"}
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
                        i18n.language.split("-")[0] === "en"
                          ? "Ubuntu"
                          : "Noto",
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
                    mainColor={checkValidationColor}
                    label="Email"
                    onChangeText={(text) => {
                      handleChange("email", text);
                    }}
                    placeholder=""
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => {
                      checkValidation === false
                        ? navigation.navigate("Password", { itemId: user })
                        : toggleAlertShowInvalidEmail();
                    }}
                  />
                  {begining === true ? (
                    <Ionicons
                      style={{
                        zIndex: 99,
                        position: "absolute",
                        margin: 12,
                        fontSize: 25,
                        alignSelf:
                          i18n.language.split("-")[0] === "en"
                            ? "flex-start"
                            : "flex-end",
                      }}
                      name="mail"
                      size={18}
                      color="#e52b51"
                    />
                  ) : (
                    <>
                      {showError === true ? (
                        <Ionicons
                          style={{
                            zIndex: 99,
                            position: "absolute",
                            margin: 12,
                            fontSize: 25,
                            alignSelf:
                              i18n.language.split("-")[0] === "en"
                                ? "flex-start"
                                : "flex-end",
                          }}
                          name="close-outline"
                          size={18}
                          color="#ea3e29"
                        />
                      ) : (
                        <Ionicons
                          style={{
                            zIndex: 99,
                            position: "absolute",
                            margin: 12,
                            fontSize: 25,
                            alignSelf:
                              i18n.language.split("-")[0] === "en"
                                ? "flex-start"
                                : "flex-end",
                          }}
                          name="checkmark"
                          size={16}
                          color="#5fcf40"
                        />
                      )}
                    </>
                  )}

                  {i18n.language.split("-")[0] === "en" ? (
                    <Text
                      style={{
                        color: "#ea3e29",
                        margin: 5,
                        marginTop: 2,
                        textAlign:
                          i18n.language.split("-")[0] === "en"
                            ? "left"
                            : "right",
                      }}
                    >
                      {existsError === true ? "Email already exists" : ""}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "#ea3e29",
                        margin: 5,
                        marginTop: 2,
                        textAlign:
                          i18n.language.split("-")[0] === "en"
                            ? "left"
                            : "right",
                      }}
                    >
                      {existsError === true ? "البريد الالكتروني مستخدم" : ""}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    marginBottom: 40,
                  }}
                >
                  {checkValidation === true ? (
                    <View style={styles.buttonx}>
                      <Button
                        title={
                          i18n.language.split("-")[0] === "en"
                            ? "Next"
                            : "التالي"
                        }
                        color="white"
                        disabled={checkValidation}
                        onPress={() => {
                          navigation.navigate("Password", { itemId: user });
                        }}
                      />
                    </View>
                  ) : (
                    <View style={styles.button}>
                      <Button
                        title={
                          i18n.language.split("-")[0] === "en"
                            ? "Next"
                            : "التالي"
                        }
                        color="white"
                        disabled={checkValidation}
                        onPress={() => {
                          navigation.navigate("Password", { itemId: user });
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

      {/* Invalid Email */}
      <Modal
        transparent={true}
        visible={showInvalidEmail}
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
                ? "Invalid Email Adress"
                : "البريد الإلكتروني غير صالح"}
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
              onPress={() => toggleAlertShowInvalidEmail()}
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
      {/* Invalid Email */}
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
