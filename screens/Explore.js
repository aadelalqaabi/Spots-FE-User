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
} from "react-native";
import spotStore from "../stores/spotStore";
import categoryStore from "../stores/categoryStore";
import Spot from "./spots/Spot";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useScrollToTop } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
  const categories = categoryStore.getCategories();
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu.ttf"),
    Noto: require("../assets/fonts/Noto.ttf"),
    NotoBold: require("../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const today = new Date();
  today.setHours(3, 0, 0, 0);
  const spotsByDate = spotStore.spots.filter(
    (spot) => new Date(spot.startDate) >= today
  );
  const sortedSpots = spotsByDate.sort(
    (objA, objB) => new Date(objA.startDate) - new Date(objB.startDate)
  );
  const spots = sortedSpots
    .filter((spot) => (!category ? spot : spot.category === category?._id))
    .filter((category) =>
      category?.name?.toLowerCase().includes(query.toLowerCase())
    );
  function renderSpot({ item: spot }) {
    return <Spot spot={spot} navigation={navigation} />;
  }
  const handleCategory = (index) => {
    setSelectedCategory(index);
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
      }}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <SafeAreaView>
        {loading ? (
          <ContentLoader
            speed={2}
            viewBox="0 0 255 450"
            backgroundColor={"#f3f3f3"}
            foregroundColor={"#ecebeb"}
          >
            <Rect x="80" y="57" rx="5" ry="5" width="60" height="8" />
            <Rect x="15" y="51" rx="10" ry="10" width="55" height="20" />
            <Rect x="15" y="82" rx="15" ry="15" width="223" height="366" />
            <Rect x="150" y="57" rx="5" ry="5" width="60" height="8" />
            <Rect x="220" y="57" rx="5" ry="5" width="60" height="8" />
            <Rect x="243" y="101" rx="10" ry="10" width="201" height="329" />
            <Rect x="15" y="7" rx="10" ry="10" width="97" height="31" />
            <Circle cx="223" cy="26" r="13" />
          </ContentLoader>
        ) : (
          <>
            <View
              style={{
                margin: 30,
                marginTop: 10,
                marginBottom: i18n.locale === "en-US" ? 45 : 15,
                display: "flex",
                flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontFamily:
                    i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                  fontSize: 35,
                  marginBottom: 10,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
              >
                {i18n.t("explore")}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Search", { spots: sortedSpots });
                }}
              >
                <Ionicons
                  style={{
                    fontSize: 30,
                    color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                    margin: 5,
                  }}
                  name="search-outline"
                ></Ionicons>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{
                display: "flex",
                borderRadius: "10%",
                margin: 28,
                marginTop: -25,
                marginBottom: 0,
                height: 45,
              }}
              contentContainerStyle={{
                display: "flex",
                flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
              }}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                i18n.locale === "en-US"
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
                    ? styles.overleyactive
                    : styles.overley
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
                          borderRadius: "10%",
                          fontSize: 20,
                          alignSelf: "center",
                          marginTop: i18n.locale === "en-US" ? 11 : 0,
                          fontFamily:
                            i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                          color: "#9279f7",
                        }
                      : {
                          color:
                            colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                          flexWrap: "wrap",
                          borderRadius: "10%",
                          fontSize: 20,
                          alignSelf: "center",
                          marginTop: i18n.locale === "en-US" ? 11 : 0,
                          fontFamily:
                            i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                        }
                  }
                >
                  {i18n.locale === "en-US" ? "All" : "الكل"}
                </Text>
                <Text
                  style={
                    selectedCategory === -1 ? styles.catdot : styles.overley
                  }
                >
                  .
                </Text>
              </TouchableOpacity>
              {categories.map((category) => (
                <TouchableOpacity
                  key={categories.indexOf(category)}
                  style={
                    selectedCategory === categories.indexOf(category)
                      ? styles.overleyactive
                      : styles.overley
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
                            borderRadius: "10%",
                            fontSize: 20,
                            alignSelf: "center",
                            marginTop: i18n.locale === "en-US" ? 11 : 0,
                            fontFamily:
                              i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                            color: "#9279f7",
                          }
                        : {
                            color:
                              colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                            flexWrap: "wrap",
                            borderRadius: "10%",
                            fontSize: 20,
                            alignSelf: "center",
                            marginTop: i18n.locale === "en-US" ? 11 : 0,
                            fontFamily:
                              i18n.locale === "en-US" ? "Ubuntu" : "Noto",
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
                  <Text
                    style={
                      selectedCategory === categories.indexOf(category)
                        ? styles.catdot
                        : styles.overley
                    }
                  >
                    .
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Carousel
              style={styles.spotsList}
              contentContainerStyle={styles.spotsListContainer}
              data={spots}
              renderItem={renderSpot}
              windowSize={1}
              sliderWidth={450}
              itemWidth={360}
              layout={"default"}
              containerCustomStyle={{
                alignSelf: "center",
              }}
              useScrollView={true}
            />
          </>
        )}
      </SafeAreaView>
    </View>
  );
}

export default observer(Explore);

const styles = StyleSheet.create({
  spotsList: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row-reverse",
  },
  spotsListContainer: {
    backgroundColor: "#ffffff",
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
    color: "#9279f7",
    fontSize: 45,
    fontFamily: "Ubuntu",
    position: "absolute",
    alignSelf: "center",
    textAlign: "left",
  },
  catTextAtive: {
    color: "black",
    flexWrap: "wrap",
    borderRadius: "10%",
    fontWeight: "700",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 11,
    fontFamily: "Ubuntu",
    color: "#9279f7",
  },
  overley: {
    width: 100,
    height: 50,
    zIndex: -1,
    display: "flex",
  },
  overleyactive: {
    width: 100,
    height: 40,
    borderRadius: 50,
    zIndex: -1,
    color: "#9279f7",
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
