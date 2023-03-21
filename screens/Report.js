import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Localization from "expo-localization";
import { Ionicons } from "@expo/vector-icons";
import { I18n } from "i18n-js";
import { useFonts } from "expo-font";
import TextInput from "react-native-text-input-interactive";
import Toast from "react-native-toast-message";
import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";
import reportStore from "../stores/reportStore";

export default function Report() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [rep, setREP] = useState({
    title: "",
    mssg: "",
    user: "",
  });
  const translations = {
    en: {
      Report: "Report A Problem",
      Title: "Title",
      Mssg: "Message",
    },
    ar: {
      Report: "الإبلاغ عن مشكلة",
      Title: "Title",
      Mssg: "Message",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu.ttf"),
    Noto: require("../assets/fonts/Noto.ttf"),
    NotoBold: require("../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }

  const handleChange = (name, value) => {
    setREP({ ...rep, [name]: value });
  };

  const handleSubmit = async () => {
    Toast.show({
      type: "success",
      text1:
        i18n.locale === "en-US" || i18n.locale === "en"
          ? "Problem Reported 👍"
          : "👍 تم الابلاغ عن المشكلة",
      position: "bottom",
    });
    navigation.goBack();
    await reportStore.createReports(rep);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          <View
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "6%",
              marginBottom: "4%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                zIndex: 99,
                alignSelf:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "flex-start"
                    : "flex-end",
                position: "absolute",
                marginLeft: 20,
                paddingRight: 20,
              }}
            >
              <Ionicons
                style={{
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                  zIndex: 99,
                  fontSize: 32,
                }}
                name={
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "chevron-back-outline"
                    : "chevron-forward-outline"
                }
              ></Ionicons>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                alignSelf: "center",
                fontSize: 28,
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              }}
            >
              {i18n.t("Report")}
            </Text>
          </View>
          <View
            style={{
              width: "80%",
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "70%",
              marginTop: "10%",
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
                  textAlign:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "left"
                      : "right",
                }}
                mainColor={"blue"}
                label="Password"
                onChangeText={(text) => {
                  handleChange("title", text);
                }}
                placeholder={
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Title"
                    : "العنوان"
                }
                placeholderTextColor={"grey"}
                keyboardType="web-search"
              />

              <TextInput
                textInputStyle={{
                  alignSelf: "center",
                  width: "103%",
                  height: 200,
                  padding: 10,
                  paddingTop: 15,
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
                  textAlign:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "left"
                      : "right",
                }}
                multiline
                label="Password"
                onChangeText={(text) => {
                  handleChange("mssg", text);
                }}
                placeholder={
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Message"
                    : "الرسالة"
                }
                placeholderTextColor={"grey"}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 32,
                  borderRadius: 10,
                  elevation: 3,
                  backgroundColor: "#e52b51",
                }}
              >
                <Button
                  color="white"
                  title={
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "Report Problem"
                      : "أبلغ عن المشكلة"
                  }
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
