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
} from "react-native";
import { useState } from "react";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import TextInput from "react-native-text-input-interactive";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import authStore from "../../stores/authStore";
import { Alert } from "react-native";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

export default function CheckOTP({ navigation, route }) {
  const colorScheme = useColorScheme();

  const { itemId } = route.params;
  const [user, setUser] = useState(itemId);
  const [givenOTP, setGivenOTP] = useState("")
  const [sent, setSent] = useState(true);

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
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
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

  const handleOTP = () => {
    authStore.getOTP(user.email);
    setSent(true);
  };

  const handleChange = (text) => {
    setGivenOTP(text)
  }

  const handleSubmit = async () => {
    const otpCode = parseInt(givenOTP);
    if (authStore.OTP === otpCode) {
      navigation.navigate("ForgotPassword", { itemId: user });
    } else {
      if (i18n.locale === "en-US" || i18n.locale === "en") {
        Alert.alert("Wrong OTP", "", ["Try Again"]);
      } else {
        Alert.alert("اسم المستخدم غير صالح", "", [{ text: "حاول مرة اخرى" }]);
      }
    }
  };
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
                marginBottom:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 20 : 10,
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
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                fontSize:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 16 : 18,
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
                    {i18n.t("resend")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
                   
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text
               style={{color:"white", alignSelf:"center", fontSize:18}}
              >{i18n.t("next")}</Text>
            </TouchableOpacity> 
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
    height: 55,
    width: "110%",
    display:"flex",
    justifyContent:"center",
    alignSelf:"center",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#e52b51",
    marginTop:"-25%"  },
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
