import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import TextInput from "react-native-text-input-interactive";
import Spot from "./spots/Spot";
import Carousel from "react-native-reanimated-carousel";
import SearchSpot from "./spots/SearchSpot";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { useFonts } from "expo-font";
import spotStore from "../stores/spotStore";
import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";

export default function Search({ navigation }) {
  const colorScheme = useColorScheme();
  const width = Dimensions.get("window").width;

  const translations = {
    en: {
      suggested: "Suggested Dest",
      search: "Search",
    },
    ar: {
      suggested: "وجهة مقترحة",
      search: "ابحث",
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

  const today = new Date();
  today.setHours(3, 0, 0, 0);
  const [query, setQuery] = useState("");
  const [toggle, setToggle] = useState(true);
  const [day, setDay] = useState(null);
  const spots = spotStore.spots
    .filter((spot) => new Date(spot.startDate) >= today)
    .filter((spot) => spot.isPublished === true);
  let suggested = [];
  const randomIndex = Math.floor(Math.random() * spots.length);
  const item = spots[randomIndex];
  suggested.push(item);
  const filteredSpots = spots
    .filter(
      (spot) =>
        spot.name.toLowerCase().includes(query?.toLowerCase()) ||
        spot.nameAr.toLowerCase().includes(query?.toLowerCase())
    )
    .filter(
      (spot) =>
        spot.name.toLowerCase().includes(query?.toLowerCase()) ||
        spot.nameAr.toLowerCase().includes(query?.toLowerCase())
    )
    .filter((spot) => new Date(spot.startDate) >= today)
    .filter((spot) => spot.isPublished === true);
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu.ttf"),
    Noto: require("../assets/fonts/Noto.ttf"),
    NotoBold: require("../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <View style={{ backgroundColor: "transparent" }}></View>;
  }
  function renderSpot({ item: spot }) {
    return (
      <View style={{ width: "100%", alignSelf: "center" }}>
        <Spot spot={spot} navigation={navigation} day={day} />
      </View>
    );
  }
  function renderSearch({ item: spot }) {
    return <SearchSpot spot={spot} navigation={navigation} />;
  }
  return (
    <View
      style={{
        backgroundColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
        height: "95%",
        width: "100%",
      }}
    >
      <View
        style={{
          marginTop: 60,
          marginRight: 20,
          marginLeft: 20,
          marginBottom: 15,
          display: "flex",
          alignSelf: "center",
          flexDirection:
            i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
          alignItems: "center",
          alignContent: "center",
          width: "90%",
        }}
      >
        <View
          style={{
            width: "85%",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            flexDirection:
              i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
          }}
        >
          <TextInput
            textInputStyle={{
              height: 42,
              paddingLeft: 42,
              paddingRight: 42,
              borderRadius: 15,
              fontSize: 18,
              color: colorScheme === "light" ? "black" : "white",
              backgroundColor: colorScheme === "light" ? "#dfdfdf" : "#5e5e5e",
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              width: "98%",
              textAlign:
                i18n.language.split("-")[0] === "en" ? "left" : "right",
            }}
            placeholder={
              i18n.language.split("-")[0] === "en" ? "Search" : "ابحث"
            }
            placeholderTextColor={
              colorScheme === "light" ? "#9a9a9a" : "#aeaeae"
            }
            onChangeText={(text) => {
              setQuery(text);
              setToggle(false);
              if (text === "") setToggle(true);
            }}
            value={query}
            mainColor="transparent"
            cursorColor={colorScheme === "light" ? "#9a9a9a" : "#aeaeae"}
          />
          <Ionicons
            style={{
              zIndex: 99,
              position: "absolute",
              marginLeft: 15,
              marginRight: 15,
              marginTop: 12,
              fontSize: 22,
              color: colorScheme === "light" ? "#9a9a9a" : "#aeaeae",
              alignSelf: "center",
            }}
            name="search-outline"
          ></Ionicons>
          {!toggle ? (
            <TouchableOpacity
              style={{
                zIndex: 99,
                position: "absolute",
                right: 0,
                marginRight: i18n.language.split("-")[0] === "en" ? 22 : 0,
                paddingLeft: 22,
                alignSelf: "center",
              }}
              onPress={() => {
                setQuery("");
                setToggle(true);
              }}
            >
              <Ionicons
                style={{
                  fontSize: 22,
                  color: colorScheme === "light" ? "#9a9a9a" : "#aeaeae",
                }}
                name="close-circle-sharp"
              ></Ionicons>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <TouchableOpacity
          style={{
            width: "15%",
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              fontSize: i18n.language.split("-")[0] === "en" ? 15 : 18,
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            }}
          >
            {i18n.language.split("-")[0] === "en" ? "Cancel" : "الغاء"}
          </Text>
        </TouchableOpacity>
      </View>

      {toggle ? (
        <>
          <Text
            style={{
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              fontSize: 20,
              margin: i18n.language.split("-")[0] === "en" ? 25 : 32,
              marginBottom: 20,
              marginTop: 5,
              alignSelf:
                i18n.language.split("-")[0] === "en"
                  ? "flex-start"
                  : "flex-end",
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? "Suggested Dest"
              : "ديست مقترحة"}
          </Text>
          <Carousel
            pagingEnabled
            snapEnabled
            mode="parallax"
            loop={false}
            data={suggested}
            renderItem={renderSpot}
            width={width}
            height={width * 1.65}
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
        </>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
              nestedScrollEnabled={true}
              style={styles.spotsList}
              contentContainerStyle={styles.spotsListContainer}
              data={filteredSpots}
              renderItem={renderSearch}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  spotsList: {
    height: "100%",
  },
  back: {
    zIndex: 100,
    color: "#73757a",
    fontSize: 40,
    alignSelf: "center",
  },

  icon: {
    zIndex: 99,
    position: "absolute",
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
    fontSize: 25,
    color: "grey",
  },
});
