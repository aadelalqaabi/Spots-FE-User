import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as Localization from "expo-localization";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import authStore from "../stores/authStore";
import { observer } from "mobx-react";
import { useFonts } from "expo-font";
import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function Settings() {
  const notificationListener = useRef();
  const responseListener = useRef();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const translations = {
    en: {
      Settings: "Settings",
    },
    ar: {
      Settings: "الاعدادات",
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

  const [visibleRemove, setVisibleRemove] = useState(false);
  const toggleAlertRemoveNoti = useCallback(() => {
    setVisibleRemove(!visibleRemove);
  }, [visibleRemove]);

  const [visibleAdd, setVisibleAdd] = useState(false);
  const toggleAlertAddNoti = useCallback(() => {
    setVisibleAdd(!visibleAdd);
  }, [visibleAdd]);

  const [visibleSomethingWentWrong, setVisibleSomethingWentWrong] =
    useState(false);
  const toggleAlertSomethingWentWrong = useCallback(() => {
    setVisibleSomethingWentWrong(!visibleSomethingWentWrong);
  }, [visibleSomethingWentWrong]);

  const [visibleEnabled, setVisibleEnabled] = useState(false);
  const toggleAlertEnabled = useCallback(() => {
    setVisibleEnabled(!visibleEnabled);
  }, [visibleEnabled]);

  const [visibleDisabled, setVisibleDisabled] = useState(false);
  const toggleAlertDisabled = useCallback(() => {
    setVisibleDisabled(!visibleDisabled);
  }, [visibleDisabled]);

  const [deleteClicked, setDeleteClicked] = useState(false);
  const toggleAlertDeleteClicked = useCallback(() => {
    setDeleteClicked(!deleteClicked);
  }, [deleteClicked]);

  const [deleteMade, setDeleteMade] = useState(false);
  const toggleAlertDeleteMade = useCallback(() => {
    setDeleteMade(!deleteMade);
  }, [deleteMade]);

  const [notiFailed, setNotiFailed] = useState(false);
  const toggleAlertNotiFailed = useCallback(() => {
    setNotiFailed(!notiFailed);
  }, [notiFailed]);

  const [noDevice, setNoDevice] = useState(false);
  const toggleAlertNoDevice = useCallback(() => {
    setNoDevice(!noDevice);
  }, [noDevice]);

  const [logoutEnable, setLogoutEnable] = useState(false);
  const toggleAlertLogoutEnable = useCallback(() => {
    setLogoutEnable(!logoutEnable);
  }, [logoutEnable]);

  // Notifications.removeNotificationSubscription(notificationListener.current);
  // Notifications.removeNotificationSubscription(responseListener.current);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        toggleAlertNotiFailed();
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("token", token);
      if (token.includes("ExponentPushToken")) {
        // add token
        if (authStore.user.notificationToken === "") {
          // only add token if user doesnt have one
          await authStore.addToken(token).then(toggleAlertEnabled());
        }
      }
    } else {
      toggleAlertNoDevice();
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const removeNotificationFromUser = async () => {
    await authStore.removeToken().then(toggleAlertDisabled);
  };

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("entered listener");
        if (
          notification.data &&
          notification.data.locale === "en" &&
          i18n.language.split("-")[0] === "en"
        ) {
          console.log("entered if");
          console.log("Notification is in English");
          Notifications.presentedNotificationsAsync({
            title: notification.title,
            body: notification.body,
          });
        } else {
          console.log("Notification is not in English");
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);

        return () => {
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
        };
      });
  }, []);
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu.ttf"),
    Noto: require("../assets/fonts/Noto.ttf"),
    NotoBold: require("../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
        height: "100%",
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
              i18n.language.split("-")[0] === "en" ? "flex-start" : "flex-end",
            position: "absolute",
            marginLeft: 20,
            paddingRight: 20,
          }}
        >
          <Ionicons
            style={{
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
              zIndex: 99,
              fontSize: 32,
            }}
            name={
              i18n.language.split("-")[0] === "en"
                ? "chevron-back-outline"
                : "chevron-forward-outline"
            }
          ></Ionicons>
        </TouchableOpacity>
        {/* Settings */}
        <Text
          style={{
            textAlign: "center",
            alignSelf: "center",
            fontSize: 28,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            color: colorScheme === "light" ? "#000000" : "#f1f1f1",
          }}
        >
          {i18n.language.split("-")[0] === "en" ? "Settings" : "الاعدادات"}
        </Text>
        {/* Settings */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Notifications */}
        <Text
          style={{
            alignSelf:
              i18n.language.split("-")[0] === "en" ? "flex-start" : "flex-end",
            marginTop: i18n.language.split("-")[0] === "en" ? 20 : 0,
            margin: i18n.language.split("-")[0] === "en" ? 30 : 25,
            marginBottom: i18n.language.split("-")[0] === "en" ? 0 : -10,
            fontSize: 25,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            color: colorScheme === "light" ? "#000000" : "#f1f1f1",
          }}
        >
          {i18n.language.split("-")[0] === "en" ? "Notifications" : "الاشعارات"}
        </Text>
        {/* Notifications */}
        {/* Push Notifications */}
        <TouchableOpacity
          style={{
            backgroundColor: "#e8e8e8",
            height: 60,
            width: "90%",
            alignSelf: "center",
            borderRadius: 10,
            display: "flex",
            flexDirection:
              i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            marginTop: 15,
            justifyContent: "space-between",
          }}
          onPress={() => {
            if (authStore.user.notificationToken !== "") {
              toggleAlertRemoveNoti();
            } else if (authStore.user.notificationToken === "") {
              toggleAlertAddNoti();
            } else {
              toggleAlertSomethingWentWrong();
            }
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              margin: 10,
              marginRight: 15,
              marginLeft: 15,
              opacity: 0.8,
            }}
          >
            {authStore.user.notificationToken === "" ? (
              <>
                {i18n.language.split("-")[0] === "en"
                  ? "Enable notifications"
                  : "تفعيل الاشعارات"}
              </>
            ) : (
              <>
                {i18n.language.split("-")[0] === "en"
                  ? "Disable notifications"
                  : "تعطيل الاشعارات"}
              </>
            )}
          </Text>
          {authStore.user.notificationToken === "" ? (
            <>
              <Ionicons
                style={{
                  color: "#000000",
                  fontSize: 22,
                  fontFamily:
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  margin: 18,
                  opacity: 0.8,
                }}
                name={
                  i18n.language.split("-")[0] === "en"
                    ? "notifications"
                    : "notifications"
                }
              ></Ionicons>
            </>
          ) : (
            <>
              <Ionicons
                style={{
                  color: "#000000",
                  fontSize: 22,
                  fontFamily:
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  margin: 19,
                  opacity: 0.8,
                }}
                name={
                  i18n.language.split("-")[0] === "en"
                    ? "notifications-off"
                    : "notifications-off"
                }
              ></Ionicons>
            </>
          )}
        </TouchableOpacity>
        {/* Push Notifications */}
        {/* Notification List */}
        <TouchableOpacity
          style={{
            backgroundColor: "#e8e8e8",
            height: 60,
            width: "90%",
            alignSelf: "center",
            borderRadius: 10,
            display: "flex",
            flexDirection:
              i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            marginTop: 10,

            justifyContent: "space-between",
          }}
          onPress={() => {
            navigation.navigate("RegisteredOrganizers");
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              margin: 10,
              marginRight: 15,
              marginLeft: 15,
              opacity: 0.8,
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? "View Registered Organizers"
              : "عرض اشتاراكات المنظمين"}
          </Text>
          <Ionicons
            style={{
              color: "#000000",
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              margin: 22,
              opacity: 0.8,
            }}
            name={
              i18n.language.split("-")[0] === "en"
                ? "chevron-forward-outline"
                : "chevron-back-outline"
            }
          ></Ionicons>
        </TouchableOpacity>
        {/* Notification List */}
        {/* Account */}
        <Text
          style={{
            alignSelf:
              i18n.language.split("-")[0] === "en" ? "flex-start" : "flex-end",
            margin: i18n.language.split("-")[0] === "en" ? 30 : 25,
            marginBottom: i18n.language.split("-")[0] === "en" ? 0 : -10,
            fontSize: 25,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            color: colorScheme === "light" ? "#000000" : "#f1f1f1",
          }}
        >
          {i18n.language.split("-")[0] === "en" ? "Account" : "الحساب"}
        </Text>
        {/* Account */}
        {/* Change Password */}
        <TouchableOpacity
          style={{
            backgroundColor: "#e8e8e8",
            height: 60,
            width: "90%",
            alignSelf: "center",
            borderRadius: 10,
            display: "flex",
            flexDirection:
              i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            marginTop: 15,

            justifyContent: "space-between",
          }}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              margin: 10,
              marginRight: 15,
              marginLeft: 15,
              opacity: 0.8,
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? "Change password"
              : "تغيير كلمة السر"}
          </Text>
          <Ionicons
            style={{
              color: "#000000",
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              margin: 22,
              opacity: 0.8,
            }}
            name={
              i18n.language.split("-")[0] === "en"
                ? "chevron-forward-outline"
                : "chevron-back-outline"
            }
          ></Ionicons>
        </TouchableOpacity>
        {/* Change Password */}
        {/* Logout */}
        <TouchableOpacity
          style={{
            backgroundColor: "#e8e8e8",
            height: 60,
            width: "90%",
            alignSelf: "center",
            borderRadius: 10,
            display: "flex",
            flexDirection:
              i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "space-between",
          }}
          onPress={() => toggleAlertLogoutEnable()}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              margin: 10,
              marginRight: 15,
              marginLeft: 15,
              opacity: 0.8,
            }}
          >
            {i18n.language.split("-")[0] === "en" ? "Logout" : "تسجيل الخروج"}
          </Text>
          <Ionicons
            style={{
              color: "#000000",
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              margin: 22,
              marginBottom: 0,
              marginTop: 0,
              opacity: 0.8,
            }}
            name={"power"}
          ></Ionicons>
        </TouchableOpacity>
        {/* Logout */}
        {/* Delete Account */}
        <TouchableOpacity
          style={{
            backgroundColor: "#e8e8e8",
            height: 60,
            width: "90%",
            alignSelf: "center",
            borderRadius: 10,
            display: "flex",
            flexDirection:
              i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
          onPress={() => toggleAlertDeleteClicked()}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              margin: 10,
              marginRight: 15,
              marginLeft: 15,
              opacity: 0.8,
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? "Delete account"
              : "حذف الحساب"}
          </Text>
          <Ionicons
            style={{
              color: "#000000",
              fontSize: 22,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              margin: 18,
              opacity: 0.8,
            }}
            name={"trash"}
          ></Ionicons>
        </TouchableOpacity>
        {/* Delete Account */}
        {/* Information */}
        <Text
          style={{
            alignSelf:
              i18n.language.split("-")[0] === "en" ? "flex-start" : "flex-end",
            margin: i18n.language.split("-")[0] === "en" ? 30 : 25,
            marginBottom: i18n.language.split("-")[0] === "en" ? 5 : -5,
            marginTop: i18n.language.split("-")[0] === "en" ? 10 : 0,
            fontSize: 25,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            color: colorScheme === "light" ? "#000000" : "#f1f1f1",
          }}
        >
          {i18n.language.split("-")[0] === "en" ? "Information" : "معلومات"}
        </Text>
        {/* Information */}
        {/* Contact Us */}
        <TouchableOpacity
          style={{
            backgroundColor: "#e8e8e8",
            height: 60,
            width: "90%",
            alignSelf: "center",
            borderRadius: 10,
            display: "flex",
            flexDirection:
              i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            marginTop: 10,

            justifyContent: "space-between",
          }}
          onPress={() => {
            navigation.navigate("ContactUs");
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              margin: 10,
              marginRight: 15,
              marginLeft: 15,
              opacity: 0.8,
            }}
          >
            {i18n.language.split("-")[0] === "en" ? "Contact Us" : "تواصل معنا"}
          </Text>
          <Ionicons
            style={{
              color: "#000000",
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              margin: 22,
              opacity: 0.8,
            }}
            name={
              i18n.language.split("-")[0] === "en"
                ? "chevron-forward-outline"
                : "chevron-back-outline"
            }
          ></Ionicons>
        </TouchableOpacity>
        {/* Contact Us */}
        {/* Privacy Policy */}
        <TouchableOpacity
          style={{
            backgroundColor: "#e8e8e8",
            height: 60,
            width: "90%",
            alignSelf: "center",
            borderRadius: 10,
            display: "flex",
            flexDirection:
              i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            marginTop: 10,

            justifyContent: "space-between",
          }}
          onPress={() => {
            navigation.navigate("PrivacyPolicy");
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              margin: 10,
              marginRight: 15,
              marginLeft: 15,
              opacity: 0.8,
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? "Privacy Policy"
              : "سياسة الخصوصية"}
          </Text>
          <Ionicons
            style={{
              color: "#000000",
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              margin: 22,
              opacity: 0.8,
            }}
            name={
              i18n.language.split("-")[0] === "en"
                ? "chevron-forward-outline"
                : "chevron-back-outline"
            }
          ></Ionicons>
        </TouchableOpacity>
        {/* Privacy Policy */}
        {/* Report a Problem */}
        <TouchableOpacity
          style={{
            backgroundColor: "#e8e8e8",
            height: 60,
            width: "90%",
            alignSelf: "center",
            borderRadius: 10,
            display: "flex",
            flexDirection:
              i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            marginTop: 10,

            justifyContent: "space-between",
          }}
          onPress={() => {
            navigation.navigate("Report");
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              margin: 10,
              marginRight: 15,
              marginLeft: 15,
              opacity: 0.8,
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? "Report a problem"
              : "ابلاغ عن مشكلة"}
          </Text>
          <Ionicons
            style={{
              color: "#000000",
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              margin: 22,
              opacity: 0.8,
            }}
            name={
              i18n.language.split("-")[0] === "en"
                ? "chevron-forward-outline"
                : "chevron-back-outline"
            }
          ></Ionicons>
        </TouchableOpacity>
        {/* Report a Problem */}
        <Text
          style={{
            color: colorScheme === "light" ? "#000000" : "#f1f1f1",
            fontSize: 18,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            alignSelf: "center",
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          Version 1.2.7
        </Text>
      </ScrollView>
      {/* Disable Modal */}
      <Modal
        transparent={true}
        visible={visibleRemove}
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
                marginBottom: 20,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Do you want to turn off Notifications?"
                : "هل تريد إيقاف تفعيل الاشعارات؟"}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "25%",
                  backgroundColor: "#e52b51",
                  borderRadius: 50,
                  height: 40,
                  justifyContent: "center",
                }}
                onPress={() =>
                  removeNotificationFromUser().then(toggleAlertRemoveNoti())
                }
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#f1f1f1",
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.language.split("-")[0] === "en" ? "Yes" : "نعم"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "25%",
                  backgroundColor: "#e52b51",
                  borderRadius: 50,
                  height: 40,
                  marginLeft: 50,
                  justifyContent: "center",
                }}
                onPress={() => toggleAlertRemoveNoti()}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#f1f1f1",
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.language.split("-")[0] === "en" ? "No" : "لا"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Disable Modal */}

      {/* Enable Modal */}
      <Modal
        transparent={true}
        visible={visibleAdd}
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
                marginBottom: 20,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Do you want to turn on Notifications?"
                : "هل تريد تفعيل الاشعارات؟"}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "25%",
                  backgroundColor: "#e52b51",
                  borderRadius: 50,
                  height: 40,
                  justifyContent: "center",
                }}
                onPress={() =>
                  registerForPushNotificationsAsync().then(toggleAlertAddNoti())
                }
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#f1f1f1",
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.language.split("-")[0] === "en" ? "Yes" : "نعم"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "25%",
                  backgroundColor: "#e52b51",
                  borderRadius: 50,
                  height: 40,
                  marginLeft: 50,
                  justifyContent: "center",
                }}
                onPress={() => toggleAlertAddNoti()}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#f1f1f1",
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.language.split("-")[0] === "en" ? "No" : "لا"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Enable Modal */}

      {/* Somthing Went Wrong Modal */}
      <Modal
        transparent={true}
        visible={visibleSomethingWentWrong}
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
                ? "Something went wrong!"
                : "حدث خطأ ما"}
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
              onPress={() => toggleAlertSomethingWentWrong()}
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
                {i18n.language.split("-")[0] === "en" ? "ok" : "حسنا"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Somthing Went Wrong Modal */}

      {/* Noti Enabled Modal */}
      <Modal
        transparent={true}
        visible={visibleEnabled}
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
                marginBottom: 20,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Notifcations Enabled"
                : "تم تفعيل الاشعارات"}
            </Text>
            <TouchableOpacity
              style={{
                width: "30%",
                backgroundColor: "#e52b51",
                borderRadius: 50,
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => toggleAlertEnabled()}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#f1f1f1",
                  fontFamily:
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 18,
                }}
              >
                {i18n.language.split("-")[0] === "en" ? "Ok" : "حسنا"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Noti Enabled Modal */}

      {/* Noti Disabled Modal */}
      <Modal
        transparent={true}
        visible={visibleDisabled}
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
                marginBottom: 20,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Notifcations Disabled"
                : "تم ايقاف الاشعارات"}
            </Text>
            <TouchableOpacity
              style={{
                width: "30%",
                backgroundColor: "#e52b51",
                borderRadius: 50,
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => toggleAlertDisabled()}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#f1f1f1",
                  fontFamily:
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 18,
                }}
              >
                {i18n.language.split("-")[0] === "en" ? "Ok" : "حسنا"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Noti Disabled Modal */}

      {/* Are you sure Modal */}
      <Modal
        transparent={true}
        visible={deleteClicked}
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
                ? "Are you sure?"
                : "هل أنت متأكد؟"}
            </Text>
            <Text
              style={{
                marginBottom: 20,
                width: i18n.language.split("-")[0] === "en" ? "90%" : "70%",
                textAlign: "center",
                fontSize: 18,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                lineHeight: 30,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Your account will be deleted along with its information forever!"
                : "سيتم حذف حسابك مع المعلومات الخاصة به إلى الأبد!"}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "25%",
                  backgroundColor: "#e52b51",
                  borderRadius: 50,
                  height: 40,
                  justifyContent: "center",
                }}
                onPress={() =>
                  authStore.deleteUser().then(toggleAlertDeleteMade)
                }
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#f1f1f1",
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.language.split("-")[0] === "en" ? "Yes" : "نعم"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "25%",
                  backgroundColor: "#e52b51",
                  borderRadius: 50,
                  height: 40,
                  marginLeft: 50,
                  justifyContent: "center",
                }}
                onPress={() => toggleAlertDeleteClicked()}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#f1f1f1",
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.language.split("-")[0] === "en" ? "No" : "لا"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Are you sure Modal */}

      {/* Noti Enabled Modal */}
      <Modal
        transparent={true}
        visible={deleteMade}
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
                marginBottom: 30,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Account Deleted"
                : "تم حذف الحساب"}
            </Text>
            <TouchableOpacity
              style={{
                width: "50%",
                backgroundColor: "#e52b51",
                borderRadius: 50,
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => toggleAlertEnabled()}
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
                {i18n.language.split("-")[0] === "en" ? "ok" : "حسنا"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Noti Enabled Modal */}

      {/* Notification Enable Failure */}
      <Modal
        transparent={true}
        visible={notiFailed}
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
                ? "Enabling Notifcation Failed!"
                : "فشل تفعيل الاشعارات"}
            </Text>
            <Text
              style={{
                marginBottom: 20,
                width: i18n.language.split("-")[0] === "en" ? "100%" : "90%",
                textAlign: "center",
                fontSize: 16,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                lineHeight: 30,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Ensure that you have enabled notifications within your device's settings, and try again"
                : "تأكد من تمكين الإشعارات داخل إعدادات جهازك، ثم حاول مرة أخرى"}
            </Text>
            <TouchableOpacity
              style={{
                width: "50%",
                backgroundColor: "#e52b51",
                borderRadius: 50,
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => toggleAlertNotiFailed()}
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
                {i18n.language.split("-")[0] === "en" ? "ok" : "حسنا"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Notification Enable Failure */}

      {/* No Physical Device */}
      <Modal
        transparent={true}
        visible={noDevice}
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
                ? "Must use physical device for Push Notifications"
                : "يجب استخدام جهاز مادي لتفعيل لإشعارات"}
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
              onPress={() => toggleAlertNoDevice()}
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
                {i18n.language.split("-")[0] === "en" ? "ok" : "حسنا"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* No Physical Device */}

      {/* Logout Modal */}
      <Modal
        transparent={true}
        visible={logoutEnable}
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
                marginBottom: 30,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Do You Want to Logout?"
                : "هل ترغب بالخروج؟"}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "25%",
                  backgroundColor: "#e52b51",
                  borderRadius: 50,
                  height: 40,
                  justifyContent: "center",
                }}
                onPress={() => authStore.logout()}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#f1f1f1",
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.language.split("-")[0] === "en" ? "Yes" : "نعم"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "25%",
                  backgroundColor: "#e52b51",
                  borderRadius: 50,
                  height: 40,
                  marginLeft: 50,
                  justifyContent: "center",
                }}
                onPress={() => toggleAlertLogoutEnable()}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#f1f1f1",
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.language.split("-")[0] === "en" ? "No" : "إلغاء"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Logout Modal */}
    </SafeAreaView>
  );
}
export default observer(Settings);
