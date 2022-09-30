import {
  StyleSheet,
  View,
  Button,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  useColorScheme,
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

export default function Email({ navigation, route }) {
  const colorScheme = useColorScheme();
  const { itemId } = route.params;
  const [user, setUser] = useState(itemId);
  const [checkValidation, setCheckValidation] = useState(true);
  const [checkValidationColor, setCheckValidationColor] = useState("#4831d4");
  const [begining, setBegining] = useState(true);
  const [showError, setShowError] = useState(true);
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
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  const handleChange = (name, value) => {
    const check = checkEntry(value);
    if (check === true) {
      setUser({ ...user, [name]: value });
      setCheckValidation(false);
      setCheckValidationColor("#7758F6");
      setShowError(false);
    } else {
      setCheckValidation(true);
      setCheckValidationColor("#ea3e29");
      setBegining(false);
      setShowError(true);
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
                fontSize: 30,
                margin: 20,
                marginTop: 0,
                marginBottom: i18n.locale === "en-US" ? 20 : 10,
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
                marginTop: 0,
                marginBottom: i18n.locale === "en-US" ? 20 : 10,
                paddingTop: 3,
                width: "100%",
                textAlign: "center",
                color: "#64666b",
                lineHeight: 23,
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
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
                <TextInput
                  textInputStyle={{
                    alignSelf: "center",
                    width: "103%",
                    marginBottom: 10,
                    padding: 14,
                    paddingLeft: 50,
                    paddingRight: 50,
                    fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                    textAlign: i18n.locale === "en-US" ? "left" : "right",
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
                  onSubmitEditing={() => {
                    checkValidation === false
                      ? navigation.navigate("Password", { itemId: user })
                      : i18n.locale === "en-US" ? (
                          Alert.alert("Invalid Email Adress", "", [{ text: "Try Again" },])
                        ) : (
                          Alert.alert("البريد الإلكتروني غير صالح", "", [{ text: "حاول مرة اخرى" },])
                        )
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
                        i18n.locale === "en-US" ? "flex-start" : "flex-end",
                    }}
                    name="mail"
                    size={18}
                    color="#7758F6"
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
                            i18n.locale === "en-US" ? "flex-start" : "flex-end",
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
                            i18n.locale === "en-US" ? "flex-start" : "flex-end",
                        }}
                        name="checkmark"
                        size={16}
                        color="#5fcf40"
                      />
                    )}
                  </>
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
                        navigation.navigate("Password", { itemId: user });
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
    backgroundColor: "#7758F6",
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
