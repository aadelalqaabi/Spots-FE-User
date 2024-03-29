import {
  StyleSheet,
  View,
  Text,
  Button,
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
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

export default function AppleUsername({ route }) {
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      name: "Enter Your Full Name",
      description:
        "Choose a name for your account\n (Must be at least 2 characters)",
      next: "Next",
    },
    ar: {
      name: "ادخل اسمك الكامل",
      description: "اختر اسم ليظهر في حسابك \n(يجب ان يكون حرفين على الاقل)",
      next: "التالي",
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

  const navigation = useNavigation();
  const { itemId } = route.params;
  const [user, setUser] = useState(itemId);
  const [checkValidation, setCheckValidation] = useState(true);
  const [checkValidationColor, setCheckValidationColor] = useState("#e52b51");
  const [begining, setBegining] = useState(true);
  const [showError, setShowError] = useState(true);

  const [showInvalidName, setShowInvalidName] = useState(false);
  const toggleAlertShowInvalidName = useCallback(() => {
    setShowInvalidName(!showInvalidName);
  }, [showInvalidName]);

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
      setBegining(false);
      setShowError(true);
    }
  };
  const checkEntry = (username) => {
    const re = new RegExp("^[a-zA-Z ]{2,}$");
    return re.test(username);
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
                fontSize: 32,
                marginTop: 80,
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
                marginTop: 130,
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
                  fontSize: 28,
                  margin: 20,
                  marginTop: 0,
                  marginBottom: i18n.language.split("-")[0] === "en" ? 20 : 10,
                  width: "100%",
                  textAlign: "center",
                  color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                }}
              >
                {i18n.language.split("-")[0] === "en"
                  ? "Enter Your Full Name"
                  : "ادخل اسمك الكامل"}
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
                  color: "#64666b",
                  lineHeight: 23,
                  color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                  opacity: 0.8,
                  paddingTop: 3,
                }}
              >
                {i18n.language.split("-")[0] === "en"
                  ? "Choose a name for your account\n (Must be at least 2 characters)"
                  : "اختر اسم ليظهر في حسابك \n(يجب ان يكون حرفين على الاقل)"}
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
                    label="Name"
                    onChangeText={(text) => {
                      handleChange("name", text);
                    }}
                    placeholder=""
                    keyboardType="ascii-capable"
                    autoCapitalize="none"
                    autoCorrect={false}
                    enableIcon="true"
                    onSubmitEditing={() => {
                      checkValidation === false
                        ? navigation.navigate("AppleImage", { itemId: user })
                        : toggleAlertShowInvalidName();
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
                      name="person-circle"
                      size={30}
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
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    marginBottom: 40,
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
                        navigation.navigate("AppleImage", { itemId: user });
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

      {/* Invalid Name */}
      <Modal
        transparent={true}
        visible={showInvalidName}
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
                ? "Invalid Name"
                : "اسمك غير صالح"}
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
              onPress={() => toggleAlertShowInvalidName()}
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
      {/* Invalid Name */}
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
