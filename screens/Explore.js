import { observer } from "mobx-react";
import Carousel from "react-native-reanimated-carousel";
import {
  useColorScheme,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import spotStore from "../stores/spotStore";
import Spot from "./spots/Spot";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Calnder from "./Calnder";
import { DateTime } from "luxon";
import Categories from "./Categories";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authStore from "../stores/authStore";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
function Explore() {
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      explore: "Explore",
      empty: "No Dests yet",
    },
    ar: {
      explore: "اكتشف",
      empty: "لا يوجد ديست هنا",
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

  const navigation = useNavigation();
  const [category, setCategory] = useState(null);
  const [categoryModal, setCategoryModal] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [day, setDay] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await spotStore.fetchSpots();
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const setNotification = async () => {
      const value = await AsyncStorage.getItem("alreadyLaunched");
      if (value === "true") {
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
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          if (token.includes("ExponentPushToken")) {
            // add token
            if (authStore.user.notificationToken === "") {
              // only add token if user doesnt have one
              await authStore.addToken(token);
            }
          }
        } else {
          return;
        }

        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        }
      }
    };
    setNotification();
  }, []);
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu.ttf"),
    Noto: require("../assets/fonts/Noto.ttf"),
    NotoBold: require("../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }
  const today = new Date();
  today.setHours(3, 0, 0, 0);

  const spotsByDate = spotStore.spots.filter(
    (spot) =>
      (new Date(spot?.startDate) >= today ||
        new Date(spot?.endDate) >= today) &&
      spot?.isPublished === true
  );

  const sortedSpots = spotsByDate
    .sort((objA, objB) => parseInt(objA.startTime) - parseInt(objB.startTime))
    .sort((objA, objB) => new Date(objA.startDate) - new Date(objB.startDate));

  const spots = sortedSpots
    .filter((spot) => {
      if (day !== null) {
        if (spot?.isMultiple) {
          const startDate = new Date(spot?.startDate);
          const endDate = new Date(spot?.endDate);
          const selectedDate = new Date(day);
          return selectedDate >= startDate && selectedDate <= endDate;
        } else {
          return (
            new Date(spot?.startDate).getDate() === new Date(day).getDate()
          );
        }
      } else {
        return spot;
      }
    })
    .filter((spot) => (!category ? spot : spot?.category === category?._id))
    .filter((spot) => spot?.name?.toLowerCase().includes(query.toLowerCase()));

  function renderSpot({ item: spot }) {
    return <Spot spot={spot} navigation={navigation} day={day} />;
  }

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const dayHolder = DateTime.fromISO(day)
    .setLocale(Localization.locale)
    .toFormat("d");
  const dayStringHolder = DateTime.fromISO(day)
    .setLocale(Localization.locale)
    .toFormat("EEE");

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        zIndex: -1,
        backgroundColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
      }}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <SafeAreaView>
        {loading ? (
          <ContentLoader
            speed={3}
            style={{
              height: "100%",
            }}
            viewBox="0 0 255 440"
            backgroundColor={colorScheme === "dark" ? "#313131" : "#d8d8d8"}
            foregroundColor={colorScheme === "dark" ? "#5a5a5a" : "#c2c2c2"}
          >
            <Rect x="22" y="52" rx="15" ry="15" width="213" height="400" />
            <Rect x="243" y="53" rx="10" ry="10" width="213" height="395" />
            <Rect x="15" y="0" rx="10" ry="10" width="97" height="31" />
            <Circle cx="200" cy="15" r="13" />
            <Circle cx="170" cy="15" r="13" />
            <Circle cx="230" cy="15" r="13" />
          </ContentLoader>
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "99%",
            }}
          >
            <Calnder
              setCalendar={setCalendar}
              calendar={calendar}
              day={day}
              setDay={setDay}
            />
            <Categories
              categoryModal={categoryModal}
              setCategoryModal={setCategoryModal}
              setCategory={setCategory}
              category={category}
            />

            <View
              style={{
                margin: 20,
                marginTop: 0,
                marginBottom: 10,
                display: "flex",
                flexDirection:
                  i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily:
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 32,
                  marginBottom: 10,
                  color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                }}
              >
                {i18n.language.split("-")[0] === "en" ? "Explore" : "اكتشف"}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection:
                    i18n.language.split("-")[0] === "en"
                      ? "row"
                      : "row-reverse",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {day === null ? (
                  <TouchableOpacity
                    onPress={() => {
                      setCalendar(true);
                    }}
                    style={{
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  >
                    <Ionicons
                      style={{
                        fontSize: 30,
                        color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                      }}
                      name="md-calendar-outline"
                    ></Ionicons>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setCalendar(true);
                    }}
                    style={{
                      marginLeft: 10,
                      marginRight: 10,
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#e52b51",
                        fontSize: 20,
                        alignSelf: "center",
                        fontFamily:
                          i18n.language.split("-")[0] === "en"
                            ? "UbuntuBold"
                            : "NotoBold",
                        marginTop:
                          i18n.language.split("-")[0] === "en" ? 0 : -10,
                      }}
                    >
                      {dayHolder}
                    </Text>
                    <Text
                      style={{
                        color: "#e52b51",
                        fontSize: 15,
                        alignSelf: "center",
                        fontFamily:
                          i18n.language.split("-")[0] === "en"
                            ? "Ubuntu"
                            : "Noto",
                        marginTop:
                          i18n.language.split("-")[0] === "en" ? 0 : -10,
                      }}
                    >
                      {dayStringHolder}
                    </Text>
                  </TouchableOpacity>
                )}
                {category === null ? (
                  <TouchableOpacity
                    style={{ marginLeft: 5, marginRight: 5 }}
                    onPress={() => {
                      setCategoryModal(true);
                    }}
                  >
                    <Ionicons
                      style={{
                        fontSize: 30,
                        color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                      }}
                      name="filter-outline"
                    ></Ionicons>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{ marginLeft: 5, marginRight: 5 }}
                    onPress={() => {
                      setCategoryModal(true);
                    }}
                  >
                    <Ionicons
                      style={{
                        fontSize: 30,
                        color: "#e52b51",
                      }}
                      name="filter-outline"
                    ></Ionicons>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={{ marginLeft: 5, marginRight: 5 }}
                  onPress={() => {
                    navigation.navigate("Search");
                  }}
                >
                  <Ionicons
                    style={{
                      fontSize: 30,
                      color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                    }}
                    name="search-outline"
                  ></Ionicons>
                </TouchableOpacity>
              </View>
            </View>

            {spots.length === 0 ? (
              <View
                style={{
                  display: "flex",
                  alignSelf: "center",
                  height: height / 1.35,
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    width: 350,
                    height: 128,
                    alignSelf: "center",
                  }}
                  source={require("./../assets/EmptyDest.png")}
                ></Image>
                <Text
                  style={{
                    color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                    fontSize: 34,
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
                    ? "No Dest Here"
                    : "لا ديست هنا"}
                </Text>
              </View>
            ) : (
              <Carousel
                pagingEnabled
                snapEnabled
                mode="parallax"
                loop={false}
                data={spots}
                renderItem={renderSpot}
                width={width}
                height={height / 1.35}
                modeConfig={{
                  parallaxScrollingScale: 1,
                  parallaxScrollingOffset: 60,
                }}
                autoPlay={false}
                layout={"default"}
                style={{
                  alignSelf: "center",
                }}
              />
            )}
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

export default observer(Explore);

const styles = StyleSheet.create({
  spotsList: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row-reverse",
  },
  spotsListContainer: {
    backgroundColor: "transparent",
  },
  container: {
    width: "90%",
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
  },
  containercat: {
    backgroundColor: "grey",
  },
  formField: {
    padding: 14,
    paddingLeft: 50,
    borderRadius: 13,
    fontSize: 18,
    backgroundColor: "white",
    fontFamily: "Ubuntu",
  },

  catButton: {
    color: "white",
    flexWrap: "wrap",
    fontWeight: "700",
    fontSize: "16",
    fontFamily: "Ubuntu",
  },
  catdot: {
    color: "#e52b51",
    fontSize: 45,
    fontFamily: "Ubuntu",
    position: "absolute",
    alignSelf: "center",
    textAlign: "left",
  },
  catTextAtive: {
    color: "black",
    flexWrap: "wrap",
    borderRadius: 10,
    fontWeight: "700",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 11,
    fontFamily: "Ubuntu",
    color: "#e52b51",
  },
  overley: {
    width: 80,
    height: 50,
    zIndex: -1,
    display: "flex",
  },
  overleyactive: {
    width: 80,
    height: 100,
    borderRadius: 50,
    zIndex: -1,
    color: "#e52b51",
  },
  icon: {
    zIndex: 99,
    position: "absolute",
    marginLeft: 12,
    marginTop: 12,
    fontSize: 25,
    color: "grey",
  },

  searchView: {
    margin: 30,
    marginBottom: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  closeicon: {
    fontSize: 30,
    color: "#cecece",
  },
});
