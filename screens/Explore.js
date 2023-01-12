import { observer } from "mobx-react";
import Carousel from "react-native-snap-carousel";
import {
  useColorScheme,
  SafeAreaView,
  StatusBar,
  LogBox,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import spotStore from "../stores/spotStore";
import categoryStore from "../stores/categoryStore";
import Spot from "./spots/Spot";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useScrollToTop } from "@react-navigation/native";
import { useFonts } from "expo-font";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";
import Calnder from "./Calnder";

LogBox.ignoreAllLogs(true);

function Explore() {
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      explore: "Explore",
    },
    ar: {
      explore: "اكتشف",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  const scrollViewRef = React.useRef(null);
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const navigation = useNavigation();
  const [category, setCategory] = useState();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(-1);
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
  const categories = categoryStore.getCategories();
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
    (spot) => new Date(spot?.startDate) >= today
  );
  const sortedSpots = spotsByDate.sort(
    (objA, objB) => new Date(objA.startDate) - new Date(objB.startDate)
  );
  const spots = sortedSpots
    .filter((spot) =>
      day !== null
        ? new Date(spot.startDate).getDate() === new Date(day).getDate()
        : spot
    )
    .filter((spot) => (!category ? spot : spot.category === category?._id))
    .filter((category) =>
      category?.name?.toLowerCase().includes(query.toLowerCase())
    );
  function renderSpot({ item: spot }) {
    return <Spot spot={spot} navigation={navigation} day={day} />;
  }
  const handleCategory = (index) => {
    setSelectedCategory(index);
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        zIndex: -1,
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
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
              height: "110%",
              marginTop: -35,
            }}
            viewBox="0 0 255 420"
            backgroundColor={colorScheme === "dark" ? "#313131" : "#d8d8d8"}
            foregroundColor={colorScheme === "dark" ? "#5a5a5a" : "#c2c2c2"}
          >
            <Rect x="80" y="57" rx="5" ry="5" width="60" height="8" />
            <Rect x="12" y="57" rx="5" ry="5" width="60" height="8" />
            <Rect x="22" y="92" rx="15" ry="15" width="213" height="355" />
            <Rect x="150" y="57" rx="5" ry="5" width="60" height="8" />
            <Rect x="220" y="57" rx="5" ry="5" width="60" height="8" />
            <Rect x="243" y="101" rx="10" ry="10" width="213" height="350" />
            <Rect x="15" y="0" rx="10" ry="10" width="97" height="31" />
            <Circle cx="223" cy="15" r="13" />
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
            <View
              style={{
                margin: 30,
                marginTop: 10,
                marginBottom: "4%",
                display: "flex",
                flexDirection:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "row"
                    : "row-reverse",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 35,
                  marginBottom: 10,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
              >
                {i18n.t("explore")}
              </Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ marginLeft: 5, marginRight: 5 }}
                  onPress={() => {
                    navigation.navigate("Search");
                  }}
                >
                  <Ionicons
                    style={{
                      fontSize: 30,
                      color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                    }}
                    name="search-outline"
                  ></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setCalendar(true);
                  }}
                  style={{
                    marginLeft:
                      i18n.locale === "en-US" || i18n.locale === "en" ? 20 : 10,
                    marginRight:
                      i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 20,
                  }}
                >
                  <Ionicons
                    style={{
                      fontSize: 30,
                      color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                    }}
                    name="md-calendar-outline"
                  ></Ionicons>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{
                display: "flex",
                borderRadius: 10,
                marginTop:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 0 : -30,
                marginBottom: "5%",
              }}
              contentContainerStyle={{
                display: "flex",
                flexDirection:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "row"
                    : "row-reverse",
                alignContent: "center",
                alignItems: "center",
              }}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? scrollViewRef.current.scrollTo({
                      x: 0,
                      y: 0,
                      animated: true,
                    })
                  : scrollViewRef.current.scrollToEnd({ animated: true })
              }
            >
              <TouchableOpacity
                style={
                  selectedCategory === -1
                    ? {
                        width: 80,
                        //height: 100,
                        borderRadius: 50,
                        zIndex: -1,
                        color: "#e52b51",
                        padding: 5,
                      }
                    : {
                        width: 80,
                        //height: 100,
                        zIndex: -1,
                        padding: 5,
                      }
                }
                onPress={() => {
                  setCategory();
                  handleCategory(-1);
                }}
              >
                <Text
                  style={
                    selectedCategory === -1
                      ? {
                          flexWrap: "wrap",

                          fontSize: 22,
                          alignSelf: "center",
                          fontFamily:
                            i18n.locale === "en-US" || i18n.locale === "en"
                              ? "Ubuntu"
                              : "Noto",
                          color: "#e52b51",
                        }
                      : {
                          color:
                            colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                          flexWrap: "wrap",

                          fontSize: 22,
                          alignSelf: "center",
                          fontFamily:
                            i18n.locale === "en-US" || i18n.locale === "en"
                              ? "Ubuntu"
                              : "Noto",
                        }
                  }
                >
                  {i18n.locale === "en-US" || i18n.locale === "en"
                    ? "All"
                    : "الكل"}
                </Text>
              </TouchableOpacity>
              {categories.map((category) => (
                <TouchableOpacity
                  key={categories.indexOf(category)}
                  style={
                    selectedCategory === categories.indexOf(category)
                      ? {
                          width: 100,
                          //height: 100,
                          borderRadius: 50,
                          zIndex: 99,
                          color: "#e52b51",
                          padding: 5,
                        }
                      : {
                          width: 100,
                          //height: 100,
                          zIndex: 99,
                          display: "flex",
                          padding: 5,
                        }
                  }
                  onPress={() => {
                    setCategory(category);
                    handleCategory(categories.indexOf(category));
                  }}
                >
                  <Text
                    style={
                      selectedCategory === categories.indexOf(category)
                        ? {
                            color:
                              colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                            flexWrap: "wrap",

                            fontSize: 22,
                            alignSelf: "center",
                            fontFamily:
                              i18n.locale === "en-US" || i18n.locale === "en"
                                ? "Ubuntu"
                                : "Noto",
                            color: "#e52b51",
                            zIndex: 99,
                          }
                        : {
                            color:
                              colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                            flexWrap: "wrap",

                            fontSize: 22,
                            alignSelf: "center",
                            fontFamily:
                              i18n.locale === "en-US" || i18n.locale === "en"
                                ? "Ubuntu"
                                : "Noto",
                            zIndex: 99,
                          }
                    }
                  >
                    {i18n.locale === "ar-US" && category?.name === "Food"
                      ? "طعام"
                      : i18n.locale === "ar-US" && category?.name === "Music"
                      ? "موسيقى"
                      : i18n.locale === "ar-US" && category?.name === "Sports"
                      ? "رياضة"
                      : i18n.locale === "ar-US" && category?.name === "Health"
                      ? "صحة"
                      : i18n.locale === "ar-US" &&
                        category?.name === "Education"
                      ? "تعليم"
                      : i18n.locale === "ar-US" && category?.name === "Fashion"
                      ? "موضة"
                      : i18n.locale === "ar-US" && category?.name === "Carnival"
                      ? "كرنفال"
                      : i18n.locale === "ar-US" && category?.name === "Other"
                      ? "اخرى"
                      : category?.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {spots.length === 0 ? (
              <View
                style={{
                  display: "flex",
                  alignSelf: "center",
                  height: "90%",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "91%",
                }}
              >
                <Text
                  style={{
                    color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                    fontSize:
                      i18n.locale === "en-US" || i18n.locale === "en" ? 40 : 35,
                    fontFamily:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    alignSelf: "center",
                    textAlign:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "left"
                        : "right",
                    lineHeight: 60,
                  }}
                >
                  {i18n.locale === "en-US" || i18n.locale === "en"
                    ? "No Destinations here yet!"
                    : "لا وجهات هنا حتى الآن!"}
                </Text>
              </View>
            ) : (
              <Carousel
                contentContainerCustomStyle={{
                  backgroundColor: "transparent",
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                data={spots}
                renderItem={renderSpot}
                windowSize={1}
                sliderWidth={420}
                itemWidth={350}
                layout={"default"}
                containerCustomStyle={{
                  alignSelf: "center",
                }}
                useScrollView={true}
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
