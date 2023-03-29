import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import * as Localization from "expo-localization";
import { useFonts } from "expo-font";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import { Ionicons } from "@expo/vector-icons";
import authStore from "../../stores/authStore";
import organizerStore from "../../stores/organizerStore";
import RegisteredNotificationItem from "./RegisteredNotificationItem";

export default function RegisteredNotifications() {
  const colorScheme = useColorScheme();
  const scrollViewRef = React.useRef(null);
  const ref = React.useRef(null);
  const navigation = useNavigation();

  function renderOrganizer({ item: organizer }) {
    return <RegisteredNotificationItem organizerId={organizer._id} />;
  }
  useScrollToTop(ref);
  const translations = {
    en: {
      NotificationList: "Organizers",
      empty: "No organizers followed",
    },
    ar: {
      NotificationList: "المنظمون",
      empty: "لا تتابع اي منظم",
    },
  };

  const organizers = authStore.user.organizers.map((org) =>
    organizerStore.getOrganizerById(org)
  );
  const uniqueOrganizers = [
    ...new Map(organizers.map((org) => [org._id, org])).values(),
  ];
  // console.log(uniqueOrganizers)
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
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
    Cabin: require("../../assets/fonts/Cabin.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }
  return (
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
          marginTop: i18n.language.split("-")[0] === "en" ? "4%" : "2%",
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
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
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
        <Text
          style={{
            textAlign: "center",
            alignSelf: "center",
            fontSize: 28,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          {i18n.language.split("-")[0] === "en" ? "Organizers" : "المنظمون"}
        </Text>
      </View>
      {uniqueOrganizers.length === 0 ? (
        <View
          style={{
            display: "flex",
            alignSelf: "center",
            height: "90%",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: 268,
              height: 300,
              alignSelf: "center",
            }}
            source={require("../../assets/emptyOrg.png")}
          ></Image>
          <Text
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontSize: 40,
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              alignSelf: "center",
              textAlign: "center",
              width: 350,
              marginTop: i18n.language.split("-")[0] === "en" ? 20 : 10,
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? "No organizer followed"
              : "لا تتابع اي منظم"}
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          <View>
            <FlatList
              style={styles.spotsList}
              contentContainerStyle={styles.spotsListContainer}
              data={uniqueOrganizers}
              renderItem={renderOrganizer}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  spotsList: {
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
  },
  spotsListContainer: {
    backgroundColor: "transparent",
  },
});
