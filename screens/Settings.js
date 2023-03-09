import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { I18n } from "i18n-js";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as Localization from "expo-localization";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import authStore from "../stores/authStore";
import { Alert } from "react-native";
import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";
import { observer } from "mobx-react";

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
      edit: "Edit Profile",
      Account: "Account",
      NotificationTitle: "Notifications",
      log: "Log out",
      Change: "Change Password",
      Notification: "Enable Notifications",
      DisNotification: "Disable Notifications",
      NotificationList: "View Registered Organizers",
      DeleteAccount: "Delete Account",
      Loading: "Processing Request...",
      Visit: "Visit Dest",
      info: "Information",
      Contact: "Contact us",
      terms: "Privacy Policy",
    },
    ar: {
      Settings: "الاعدادات",
      edit: "تعديل الحساب",
      Account: "الحساب",
      NotificationTitle: "الاشعارات",
      log: "تسجيل الخروج",
      Change: "تغير كلمة السر",
      Notification: "تفعيل الاشعارات",
      DisNotification: "ايقاف الاشعارات",
      NotificationList: "عرض اشتراكات المنضمين",
      DeleteAccount: "حذف الحساب",
      info: "معلومات",
      Contact: "تواصل معنا",
      terms: "سياسة الخصوصية",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;

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
        i18n.locale === "en-US" || i18n.locale === "en"
          ? Alert.alert("Enabling Notifcation Failed", "Plrease try again", [
              { text: "ok" },
            ])
          : Alert.alert("فشل تفعيل الاشعارات", "حاول مره اخرى", [
              { text: "حسنا" },
            ]);
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
      alert("Must use physical device for Push Notifications");
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
          i18n.locale === "en-US"
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

    // let [fontsLoaded] = useFonts({
    //   UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    //   Ubuntu: require("../assets/fonts/Ubuntu.ttf"),
    //   Noto: require("../assets/fonts/Noto.ttf"),
    //   NotoBold: require("../assets/fonts/NotoBold.ttf"),
    // });
    // if (!fontsLoaded) {
    //   return <MyAwesomeSplashScreen />;
    // }
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
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
        {/* Settings */}
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
          {i18n.t("Settings")}
        </Text>
        {/* Settings */}
      </View>
      {/* Notifications */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            alignSelf:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "flex-start"
                : "flex-end",
            marginTop: i18n.locale === "en-US" || i18n.locale === "en" ? 20 : 0,
            margin: i18n.locale === "en-US" || i18n.locale === "en" ? 30 : 25,
            marginBottom:
              i18n.locale === "en-US" || i18n.locale === "en" ? 0 : -10,
            fontSize: 25,
            fontFamily:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "Ubuntu"
                : "Noto",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          {i18n.t("NotificationTitle")}
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
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "row"
                : "row-reverse",
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
              color: "#1b1b1b",
              fontSize: 18,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              margin: 10,
              marginRight: 15,
              marginLeft: 15,
              opacity: 0.8,
            }}
          >
            {authStore.user.notificationToken === "" ? (
              <>{i18n.t("Notification")}</>
            ) : (
              <>{i18n.t("DisNotification")}</>
            )}
          </Text>
          {authStore.user.notificationToken === "" ? (
            <>
              <Ionicons
                style={{
                  color: "#1b1b1b",
                  fontSize: 22,
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "Ubuntu"
                      : "Noto",
                  margin: 18,
                  opacity: 0.8,
                }}
                name={
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "notifications"
                    : "notifications"
                }
              ></Ionicons>
            </>
          ) : (
            <>
              <Ionicons
                style={{
                  color: "#1b1b1b",
                  fontSize: 22,
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "Ubuntu"
                      : "Noto",
                  margin: 19,
                  opacity: 0.8,
                }}
                name={
                  i18n.locale === "en-US" || i18n.locale === "en"
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
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "row"
                : "row-reverse",
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
              color: "#1b1b1b",
              fontSize: 18,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              margin: 10,
              marginRight: 15,
              marginLeft: 15,
              opacity: 0.8,
            }}
          >
            {i18n.t("NotificationList")}
          </Text>
          <Ionicons
            style={{
              color: "#1b1b1b",
              fontSize: 18,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              margin: 22,
              opacity: 0.8,
            }}
            name={
              i18n.locale === "en-US" || i18n.locale === "en"
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
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "flex-start"
                : "flex-end",
            margin: i18n.locale === "en-US" || i18n.locale === "en" ? 30 : 25,
            marginBottom:
              i18n.locale === "en-US" || i18n.locale === "en" ? 0 : -10,
            fontSize: 25,
            fontFamily:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "Ubuntu"
                : "Noto",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          {i18n.t("Account")}
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
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "row"
                : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            marginTop: 15,

            justifyContent: "space-between",
          }}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Text
            style={{
              color: "#1b1b1b",
              fontSize: 18,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              margin: 10,
              marginRight: 15,
              marginLeft: 15,
              opacity: 0.8,
            }}
          >
            {i18n.t("Change")}
          </Text>
          <Ionicons
            style={{
              color: "#1b1b1b",
              fontSize: 18,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              margin: 22,
              opacity: 0.8,
            }}
            name={
              i18n.locale === "en-US" || i18n.locale === "en"
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
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "row"
                : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 10,
            justifyContent: "space-between",
          }}
          onPress={() =>
            Alert.alert(
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "Do You Want to Logout?"
                : "هل ترغب بالخروج؟",
              "",
              [
                {
                  text:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "Cancel"
                      : "الغاء",
                  onPress: () => console.log("cancel pressed"),
                  style: "cancel",
                },
                {
                  text:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "OK"
                      : "تسجيل الخروج",
                  onPress: () => authStore.logout(),
                },
              ]
            )
          }
        >
          <Text
            style={{
              color: "#1b1b1b",
              fontSize: 18,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              margin: 10,
              marginRight: 15,
              marginLeft: 15,
              opacity: 0.8,
            }}
          >
            {i18n.t("log")}
          </Text>
          <Ionicons
            style={{
              color: "#1b1b1b",
              fontSize: 18,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
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
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "row"
                : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
          onPress={() => toggleAlertDeleteClicked()}
        >
          <Text
            style={{
              color: "#1b1b1b",
              fontSize: 18,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              margin: 10,
              marginRight: 15,
              marginLeft: 15,
              opacity: 0.8,
            }}
          >
            {i18n.t("DeleteAccount")}
          </Text>
          <Ionicons
            style={{
              color: "#1b1b1b",
              fontSize: 22,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              margin: 18,
              opacity: 0.8,
            }}
            name={"trash"}
          ></Ionicons>
        </TouchableOpacity>
        <Text
          style={{
            alignSelf:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "flex-start"
                : "flex-end",
            margin: i18n.locale === "en-US" || i18n.locale === "en" ? 30 : 25,
            marginBottom:
              i18n.locale === "en-US" || i18n.locale === "en" ? 5 : -5,
            marginTop: i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 0,
            fontSize: 25,
            fontFamily:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "Ubuntu"
                : "Noto",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          {i18n.t("info")}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#e8e8e8",
            height: 60,
            width: "90%",
            alignSelf: "center",
            borderRadius: 10,
            display: "flex",
            flexDirection:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "row"
                : "row-reverse",
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
              color: "#1b1b1b",
              fontSize: 18,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              margin: 10,
              marginRight: 15,
              marginLeft: 15,
              opacity: 0.8,
            }}
          >
            {i18n.t("Contact")}
          </Text>
          <Ionicons
            style={{
              color: "#1b1b1b",
              fontSize: 18,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              margin: 22,
              opacity: 0.8,
            }}
            name={
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "chevron-forward-outline"
                : "chevron-back-outline"
            }
          ></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#e8e8e8",
            height: 60,
            width: "90%",
            alignSelf: "center",
            borderRadius: 10,
            display: "flex",
            flexDirection:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "row"
                : "row-reverse",
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
              color: "#1b1b1b",
              fontSize: 18,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              margin: 10,
              marginRight: 15,
              marginLeft: 15,
              opacity: 0.8,
            }}
          >
            {i18n.t("terms")}
          </Text>
          <Ionicons
            style={{
              color: "#1b1b1b",
              fontSize: 18,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              margin: 22,
              opacity: 0.8,
            }}
            name={
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "chevron-forward-outline"
                : "chevron-back-outline"
            }
          ></Ionicons>
        </TouchableOpacity>

        {/* Delete Account */}
        {/* Disable Modal */}
      </ScrollView>
      {/* is Loading */}
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
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
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
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Yes"
                    : "نعم"}
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
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.locale === "en-US" || i18n.locale === "en"
                    ? "No"
                    : "لا"}
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
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
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
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Yes"
                    : "نعم"}
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
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.locale === "en-US" || i18n.locale === "en"
                    ? "No"
                    : "لا"}
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
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
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
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                lineHeight: 30,
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
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
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? "ok"
                  : "حسنا"}
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
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
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
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 18,
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ok"
                  : "حسنا"}
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
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
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
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 18,
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ok"
                  : "حسنا"}
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
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
                ? "Are you sure?"
                : "هل أنت متأكد؟"}
            </Text>
            <Text
              style={{
                marginBottom: 20,
                width:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "90%"
                    : "70%",
                textAlign: "center",
                fontSize: 18,
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                lineHeight: 30,
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
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
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Yes"
                    : "نعم"}
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
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 18,
                  }}
                >
                  {i18n.locale === "en-US" || i18n.locale === "en"
                    ? "No"
                    : "لا"}
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
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
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
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? "ok"
                  : "حسنا"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Noti Enabled Modal */}
    </SafeAreaView>
  );
}
export default observer(Settings);
