import {
    StyleSheet,
    Text,
    SafeAreaView,
    useColorScheme,
    TouchableOpacity,
    View,
    ScrollView,
    Keyboard,
    KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Button
  } from "react-native";
  import React, { useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import * as Localization from "expo-localization";
  import { Ionicons } from "@expo/vector-icons";
  import { I18n } from "i18n-js";
  import { useFonts } from "expo-font";
  import TextInput from "react-native-text-input-interactive";
  import MultilineTextInput from "react-native-text-input-interactive";
  import Toast from "react-native-toast-message";
  import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";
import reportStore from "../stores/reportStore";
  
  export default function Report() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [rep, setREP] = useState({
        title: "",
        mssg: "",
        user: ""
    })
    const translations = {
      en: {
        Report: "Report A Problem",
        Title: "Title", 
        Mssg: "Message"
      },
      ar: {
        Report: "الإبلاغ عن مشكلة",
        Title: "Title", 
        Mssg: "Message"
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
    }

    const handleSubmit = async () => {
        Toast.show({
            type: "success",
            text1:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "Problem Reported 👍"
                : "👍 تم تحديث الملف الشخصي",
            position: "bottom",
          });
          navigation.goBack();
        await reportStore.createReports(rep)
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
                marginTop: 100,
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
                {i18n.t("Report")}
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
                  
                  <MultilineTextInput
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
                  <View style={{
                    paddingVertical: 8,
                    paddingHorizontal: 32,
                    borderRadius: 10,
                    elevation: 3,
                    color: "#f1f1f1",
                    backgroundColor: "red"
                  }}>
                    <Button
                      title={
                        i18n.locale === "en-US" || i18n.locale === "en"
                          ? "Report Problem"
                          : "أبلغ عن المشكلة"
                      }
                      color="#f1f1f1"
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
  