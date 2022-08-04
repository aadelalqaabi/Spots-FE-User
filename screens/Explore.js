import { observer } from "mobx-react";
import Carousel from "react-native-snap-carousel";
import {
  TextInput,
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
import ContentLoader, {
  Circle,
  Facebook,
  Rect,
} from "react-content-loader/native";
import PagerView from "react-native-pager-view";
LogBox.ignoreAllLogs(true);

function Explore() {
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const navigation = useNavigation();
  const [category, setCategory] = useState();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [toggleexplore, setToggleexplore] = useState(true);
  const [togglesearch, setTogglesearch] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
  const categories = categoryStore.getCategories();
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const spots = spotStore.spots
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
    <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
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
            {toggleexplore && (
              <View style={styles.exploreView}>
                <Text style={styles.maintitle}>Explore</Text>

                <TouchableOpacity
                  onPress={() => {
                    setTogglesearch(true);
                    setToggleexplore(false);
                  }}
                >
                  <Ionicons
                    style={styles.searchicon}
                    name="search-outline"
                  ></Ionicons>
                </TouchableOpacity>
              </View>
            )}
            {togglesearch && (
              <View style={styles.searchView}>
                <View style={styles.container}>
                  <TextInput
                    placeholder="Search"
                    style={styles.formField}
                    placeholderTextColor={"grey"}
                    onChangeText={(text) => setQuery(text)}
                  />
                  <Ionicons
                    style={styles.icon}
                    name="search-outline"
                  ></Ionicons>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setQuery("");
                    setTogglesearch(false);
                    setToggleexplore(true);
                  }}
                >
                  <Ionicons
                    style={styles.closeicon}
                    name="close-circle-outline"
                  ></Ionicons>
                </TouchableOpacity>
              </View>
            )}

            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.categories}
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
                      ? styles.catTextAtive
                      : styles.catText
                  }
                >
                  All
                </Text>
              </TouchableOpacity>
              {categories.map((category) => (
                <View style={styles.catButton}>
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
                          ? styles.catTextAtive
                          : styles.catText
                      }
                    >
                      {category?.name}
                    </Text>
                  </TouchableOpacity>
                </View>
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
              containerCustomStyle={{ alignSelf: "center" }}
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
  categories: {
    display: "flex",
    flexDirection: "row",
    borderRadius: "10%",
    margin: 28,
    marginTop: 15,
    marginBottom: 0,
    height: 40,
  },
  catButton: {
    color: "white",
    flexWrap: "wrap",
    marginRight: 8,
    borderRadius: "10%",
    fontWeight: "700",
    fontSize: "16",
    fontFamily: "Ubuntu",
  },
  catText: {
    color: "black",
    flexWrap: "wrap",
    borderRadius: "10%",
    fontWeight: "700",
    fontSize: 18,
    alignSelf: "center",
    marginVertical: 10,
    fontFamily: "Ubuntu",
  },
  catTextAtive: {
    color: "white",
    flexWrap: "wrap",
    borderRadius: "10%",
    fontWeight: "700",
    fontSize: 18,
    alignSelf: "center",
    marginVertical: 10,
    fontFamily: "Ubuntu",
  },
  overley: {
    width: 100,
    height: 40,
    borderRadius: 50,
    zIndex: -1,
  },
  overleyactive: {
    width: 100,
    height: 40,
    borderRadius: 50,
    zIndex: -1,
    backgroundColor: "#4831d4",
  },
  icon: {
    zIndex: 99,
    position: "absolute",
    marginLeft: 12,
    marginTop: 12,
    fontSize: 25,
    color: "grey",
  },
  searchicon: {
    fontSize: 30,
    color: "black",
    margin: 5,
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
  maintitle: {
    fontSize: 30,
    fontFamily: "UbuntuBold",
    fontSize: 35,
    marginBottom: 10,
  },
  exploreView: {
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
