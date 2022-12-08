import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
  StatusBar,
  LogBox,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { useNavigation } from "@react-navigation/native";
import spotStore from "../stores/spotStore";
import authStore from "../stores/authStore";
import { observer } from "mobx-react";
import { baseURL } from "../stores/instance";
import { useFonts } from "expo-font";

import React, { useEffect, useState } from "react";
import pointStore from "../stores/pointStore";
import ScrollTabs from "../ScrollTabs";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { Ionicons } from "@expo/vector-icons";
import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";
LogBox.ignoreAllLogs();

function Profile() {
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    try {
      setLoading(true);
      await authStore.checkForToken();
    } finally {
      setLoading(false);
    }
  }, []);
  const colorScheme = useColorScheme();
  // let num = 1;
  // const spotId = route?.params?.id;
  //if (spotId) {
  //  pointStore.createPoint(spotId);
  //}
  const navigation = useNavigation();
  let userSpotIds = [];
  const userPoints = pointStore.points
    .filter(
      (point) =>
        // spotStore.getSpotsById(spotId)
        authStore.user.id === point.user
    )
    .map((point) => userSpotIds.push(point.spot));
  const userSpots = userSpotIds.map((spotId) => spotStore.getSpotsById(spotId));
  //const found = userSpots?.some((spot) => spot?._id === spotId);
  //if (!found && num === 1) {
  // authStore.spotAdd(spotId);
  //num--;
  //}
  const translations = {
    en: {
      spots: "Spots",
    },
    ar: {
      spots: "نقاطي",
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
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        zIndex: -1,
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "90%",
          zIndex: 99,
          backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
        }}
      >
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
        <SafeAreaView>
          {/* style={{
         backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
         height: "100%",
       }} */}
          {loading ? (
            <ContentLoader
              speed={3}
              style={{
                height: "110%",
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
              {/* 
          <Rect x="243" y="101" rx="10" ry="10" width="201" height="329" /> */}
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
                  marginTop: "2%",
                }}
              >
                <TouchableOpacity
                  style={{
                    alignSelf:
                      i18n.locale === ("en-US" || "en")
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
                      color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                      fontSize: 30,
                    }}
                    name="settings-outline"
                  ></Ionicons>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily:
                      i18n.locale === ("en-US" || "en")
                        ? "UbuntuBold"
                        : "NotoBold",
                    color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                    alignSelf: "center",
                  }}
                >
                  {authStore.user.username}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection:
                    i18n.locale === ("en-US" || "en") ? "row" : "row-reverse",
                  marginBottom: 10,
                  marginRight: 80,
                  marginLeft: 40,
                  borderRadius: 20,
                  height: 180,
                }}
              >
                {authStore.user.image === "" ? (
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 150,
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                    source={require("../assets/PP.jpeg")}
                  />
                ) : (
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 150,
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                    source={{
                      uri: baseURL + authStore.user.image,
                    }}
                  />
                )}
                <View
                  style={{
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "bold",
                      fontFamily: "Ubuntu",
                      color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                    }}
                  >
                    {userSpots?.length}
                  </Text>
                  <Text
                    style={{
                      fontSize: 25,
                      fontFamily:
                        i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
                      color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                    }}
                  >
                    {i18n.t("spots")}
                  </Text>
                </View>
              </View>
              <View style={{ height: "100%" }}>
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
    borderRadius: "50%",
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
