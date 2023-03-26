import {
  StyleSheet,
  View,
  Button,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import TextInput from "react-native-text-input-interactive";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import * as Localization from "expo-localization";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import authStore from "../../stores/authStore";
import { Alert } from "react-native";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

export default function CheckOTP({ navigation, route }) {
  useEffect(() => {
    toggleAlertShowAccMssg();
  }, []);
  const colorScheme = useColorScheme();

  const { itemId, toggleAlertShowAccMssg } = route.params;
  const [user, setUser] = useState(itemId);
  const [givenOTP, setGivenOTP] = useState("");
  const [sent, setSent] = useState(true);

  const [otpCheck, setOtpCheck] = useState(false);
  const toggleAlertOtpCheck = useCallback(() => {
    setOtpCheck(!otpCheck);
  }, [otpCheck]);

  const [showNoAccMssg, setShowNoAccMssg] = useState(false);
  const toggleAlertShowNoAccMssg = useCallback(() => {
    setShowNoAccMssg(!showNoAccMssg);
  }, [showNoAccMssg]);

  const [showAccMssg, setShowAccMssg] = useState(false);
  const toggleAlertShowAccMssg2 = useCallback(() => {
    setShowAccMssg(!showAccMssg);
  }, [showAccMssg]);

  const translations = {
    en: {
      name: "Enter OTP code",
      description: "Enter the OTP code sent to your phone number",
      next: "Next",
      phone: "Phone Number",
      resend: "Resend OTP",
    },
    ar: {
      name: "ادخل رمز التأكيد",
      description: "اذا كان بريدك الالكتروني صحيح، سيصلك رمز تأكيد عليه",
      next: "التالي",
      phone: "رمز التأكيد",
      resend: "اعادة ارسالة رمز التأكيد",
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

  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }

  setTimeout(() => {
    setSent(false);
  }, 360000);

  const handleOTP = async () => {
    const status = await authStore.getOTP(user.email);
    if (status === "No User Found") {
      toggleAlertShowNoAccMssg();
    } else if (status === "User Found") {
      toggleAlertShowAccMssg2();
    }
    setSent(true);
  };

  const handleChange = (text) => {
    setGivenOTP(text);
  };

  const handleSubmit = async () => {
    const otpCode = parseInt(givenOTP);
    console.log("fiauthStore.OTPrst", authStore.OTP);
    console.log("otpCode", otpCode);
    if (authStore.OTP === otpCode) {
      navigation.navigate("ForgotPassword", { itemId: user });
    } else {
      console.log("fifi");
      toggleAlertOtpCheck();
    }
  };

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
                  fontSize: i18n.language.split("-")[0] === "en" ? 30 : 35,
                  margin: 20,
                  marginBottom: i18n.language.split("-")[0] === "en" ? 20 : 10,
                  marginTop: 0,
                  width: "100%",
                  textAlign: "center",
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
              >
                {i18n.language.split("-")[0] === "en"
                  ? "Enter OTP code"
                  : "ادخل رمز التأكيد"}
              </Text>
              <Text
                style={{
                  fontFamily:
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  fontSize: i18n.language.split("-")[0] === "en" ? 16 : 18,
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
                {i18n.language.split("-")[0] === "en"
                  ? "Enter the OTP code sent to your phone number"
                  : "اذا كان بريدك الالكتروني صحيح، سيصلك رمز تأكيد عليه"}
              </Text>
              <View
                style={{
                  alignSelf: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                  height: "73%",
                }}
              >
                <View style={styles.container}>
                  <TextInput
                    textInputStyle={{
                      alignSelf: "center",
                      width: "105%",
                      marginBottom: 10,
                      padding: 14,
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
                    mainColor="#9297f9"
                    placeholder=""
                    keyboardType="phone-pad"
                    enableIcon="true"
                    onChangeText={(text) => {
                      handleChange(text);
                    }}
                    onSubmitEditing={handleSubmit}
                  />
                  <TouchableOpacity
                    style={{
                      marginTop: "20%",
                      alignSelf: "center",
                      marginLeft: "5%",
                    }}
                    onPress={handleOTP}
                  >
                    <Text
                      style={{
                        color: "#e52b51",
                        fontSize: 19,
                        textAlign: "center",
                      }}
                    >
                      {i18n.language.split("-")[0] === "en"
                        ? "Resend OTP"
                        : "اعادة ارسال رمز التأكيد"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text
                  style={{ color: "white", alignSelf: "center", fontSize: 18 }}
                >
                  {i18n.language.split("-")[0] === "en" ? "Next" : "التالي"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Invalid OTP */}
      <Modal
        transparent={true}
        visible={otpCheck}
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
              {i18n.language.split("-")[0] === "en" ? "Wrong OTP" : "رمز خاطئ"}
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
              onPress={() => toggleAlertOtpCheck()}
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
      {/* Invalid OTP */}

      {/* No Account */}
      <Modal
        transparent={true}
        visible={showNoAccMssg}
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
                ? "No Account Found"
                : "لم يتم العثور على حساب"}
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
                ? `There is no account conneted to ${user.email.toLowerCase()}`
                : "تحقق من صلاحية البريد الإلكتروني الذي ادخلته"}
            </Text>
            <TouchableOpacity
              style={{
                width: "50%",
                backgroundColor: "#e52b51",
                borderRadius: 50,
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => toggleAlertShowNoAccMssg()}
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
      {/* No Account */}

      {/* Account */}
      <Modal
        transparent={true}
        visible={showAccMssg}
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
                ? "OTP sent"
                : "تم ارسال الرمز"}
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
                ? `We have sent an OTP to ${user.email.toLowerCase()}`
                : "لقد أرسلنا الرمز إلى عنوان البريد الإلكتروني الذي قدمته"}
            </Text>
            <TouchableOpacity
              style={{
                width: "50%",
                backgroundColor: "#e52b51",
                borderRadius: 50,
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => toggleAlertShowAccMssg2()}
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
                {i18n.language.split("-")[0] === "en" ? "Ok" : "حسناً"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Account */}
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
    height: 55,
    width: "110%",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#e52b51",
    marginTop: "-25%",
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
