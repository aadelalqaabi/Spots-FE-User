import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
  LogBox,
  useColorScheme,
  TouchableOpacity,
  Platform,
} from "react-native";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { useNavigation } from "@react-navigation/native";
import spotStore from "../stores/spotStore";
import authStore from "../stores/authStore";
import { observer } from "mobx-react";
import { baseURL } from "../stores/instance";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import ScrollTabs from "../ScrollTabs";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { Ionicons } from "@expo/vector-icons";
import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";
import Trophies from "./spots/Trophies";
LogBox.ignoreAllLogs();

function Profile() {
  const translations = {
    en: {
      spots: "Dests",
      edit: "Edit Profile",
    },
    ar: {
      spots: "وجهة",
      edit: "تعديل الحساب",
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
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await authStore.checkForToken();
        if (authStore.user.locale === "") {
          authStore.changeLocal(i18n.language);
        } else if (
          i18n?.language?.includes("en") &&
          authStore?.user?.locale?.includes("en")
        ) {
          authStore.changeLocal(i18n.language);
        } else {
          authStore.changeLocal(i18n.language);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const userSpots = authStore.user.spots.map((spotId) =>
    spotStore.getSpotsById(spotId)
  );

  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    CabinMedium: require("../assets/fonts/CabinMedium.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu.ttf"),
    Noto: require("../assets/fonts/Noto.ttf"),
    NotoBold: require("../assets/fonts/NotoBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        zIndex: -1,
        backgroundColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          zIndex: 99,
          backgroundColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
        }}
      >
        <StatusBar
          backgroundColor={colorScheme === "dark" ? "#000000" : "#f1f1f1"}
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
        <SafeAreaView>
          {loading ? (
            <ContentLoader
              speed={3}
              style={{
                height: "103%",
                marginTop: -15,
              }}
              viewBox="2 20 255 420"
              backgroundColor={colorScheme === "dark" ? "#313131" : "#d8d8d8"}
              foregroundColor={colorScheme === "dark" ? "#5a5a5a" : "#c2c2c2"}
            >
              <Rect x="102" y="8" rx="10" ry="10" width="55" height="20" />
              <Circle cx="236" cy="18" r="13" />
              <Circle cx="58" cy="86" r="48" />
              <Rect x="180" y="67" rx="5" ry="5" width="20" height="20" />
              <Rect x="166" y="94" rx="5" ry="5" width="48" height="14" />
              <Rect x="28" y="170" rx="5" ry="5" width="60" height="20" />
              <Rect x="166" y="170" rx="5" ry="5" width="60" height="20" />
              <Rect x="12" y="222" rx="15" ry="15" width="233" height="228" />
            </ContentLoader>
          ) : (
            // >
            <>
              <View
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignContent: "center",
                  marginTop: "4%",
                  marginBottom: "4%",
                }}
              >
                <TouchableOpacity
                  style={{
                    alignSelf:
                      i18n.language.split("-")[0] === "en"
                        ? "flex-end"
                        : "flex-start",
                    position: "absolute",
                    marginLeft: 20,
                    paddingRight: 20,
                  }}
                  onPress={() => navigation.navigate("Settings")}
                >
                  <Ionicons
                    style={{
                      color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                      fontSize: 26,
                    }}
                    name="settings-outline"
                  ></Ionicons>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 23,
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                    alignSelf: "center",
                  }}
                >
                  {authStore.user.name}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection:
                    i18n.language.split("-")[0] === "en"
                      ? "row"
                      : "row-reverse",

                  height: 140,
                  width: "100%",
                  marginBottom: 10,
                }}
              >
                <View>
                  {authStore.user.image === "" ? (
                    <Image
                      style={{
                        width: 115,
                        height: 115,
                        borderRadius: 100,
                        alignItems: "center",
                        alignSelf: "center",
                      }}
                      source={require("../assets/PP.png")}
                    />
                  ) : (
                    <>
                      <Image
                        style={{
                          width: 115,
                          height: 115,
                          borderRadius: 100,
                          alignItems: "center",
                          alignSelf: "center",
                        }}
                        source={{
                          uri: baseURL + authStore.user.image,
                        }}
                        onLoad={() => setIsImageLoading(false)}
                        loadingIndicatorSource={require("../assets/PP.png")}
                      />
                      {isImageLoading === true && (
                        <Image
                          style={{
                            width: 115,
                            height: 115,
                            borderRadius: 100,
                            alignItems: "center",
                            alignSelf: "center",
                            position: "absolute",
                            zIndex: 99,
                          }}
                          source={require("../assets/PP.png")}
                        />
                      )}
                    </>
                  )}
                  <Trophies userSpots={userSpots} />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    alignSelf: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      alignSelf: "center",
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "center",
                      justifyContent: "flex-start",
                      marginBottom:
                        i18n.language.split("-")[0] === "en" ? 6 : 3,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 32,
                        fontFamily: "Ubuntu",
                        color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                        paddingRight: 6,
                      }}
                    >
                      {userSpots?.length}
                    </Text>
                    <Image
                      style={{ width: 20, height: 24 }}
                      source={require("../assets/iconProfile.png")}
                    ></Image>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        colorScheme === "light" ? "#d7d7d7" : "#515151",
                      height: 32,
                      width: "90%",
                      alignSelf: "center",
                      borderRadius: 8,
                      display: "flex",
                      flexDirection:
                        i18n.language.split("-")[0] === "en"
                          ? "row"
                          : "row-reverse",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigation.navigate("Edit")}
                  >
                    <Text
                      style={{
                        color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                        fontSize: 19,
                        fontFamily:
                          i18n.language.split("-")[0] === "en"
                            ? "Ubuntu"
                            : "Noto",
                        alignSelf: "center",
                        marginTop:
                          i18n.language.split("-")[0] === "en" ? -2 : -5,
                      }}
                    >
                      {i18n.language.split("-")[0] === "en"
                        ? "Edit profile"
                        : "تعديل الحساب"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ height: "100%", marginBottom: "-10%" }}>
                <ScrollTabs userSpots={userSpots} />
              </View>
            </>
          )}
        </SafeAreaView>
      </View>
    </View>
  );
}
export default observer(Profile);

const styles = StyleSheet.create({
  imageUserNameEdit: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },

  edit: {
    borderRadius: 10,
    position: "absolute",
    marginTop: 360,
    marginLeft: "16%",
    backgroundColor: "#e7e7e7",
    borderRadius: 50,
    justifyContent: "center",
    paddingLeft: 80,
    paddingRight: 80,
  },
  bio: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "justify",
    margin: 12,
    padding: 10,
    paddingTop: 2,
    paddingBottom: 15,
    fontSize: 9,
  },
  bioText: {
    fontSize: 17,
    paddingBottom: 20,
  },
  tripList: {
    grid: 2,
    gridtemplate: "c1 c2",
  },
  imageCard: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
    zIndex: -1,
    opacity: 0.8,
  },
  spotsList: {
    backgroundColor: "#fffffc",
    height: "100%",
    width: "100%",
  },
  spotsListContainer: {
    backgroundColor: "#fffffc",
  },
  visited: {
    fontSize: 25,
    margin: 30,
    marginTop: 0,
    marginBottom: 10,
    fontFamily: "Ubuntu",
  },
});
