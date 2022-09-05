import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import TextInput from "react-native-text-input-interactive";
import Spot from "./spots/Spot";
import Carousel from "react-native-snap-carousel";
import { FlatList } from "react-native-gesture-handler";
import SearchSpot from "./spots/SearchSpot";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

export default function Search({ route, navigation }) {
  const translations = {
    en: {
      suggested: "Suggested Spot",
      search: "Search",
    },
    ar: {
      suggested: "وجهة مقترحة",
      search: "ابحث",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  const [query, setQuery] = useState("");
  const [toggle, setToggle] = useState(true);
  const spots = route.params.spots;
  let suggested = [];
  const randomIndex = Math.floor(Math.random() * spots.length);
  const item = spots[randomIndex];
  suggested.push(item);
  const filteredSpots = spots.filter((spot) =>
    spot.name.toLowerCase().includes(query?.toLowerCase())
  );
  function renderSpot({ item: spot }) {
    return <Spot spot={spot} navigation={navigation} />;
  }
  function renderSearch({ item: spot }) {
    return <SearchSpot spot={spot} navigation={navigation} />;
  }
  return (
    <View style={{ backgroundColor: "white", height: "100%", width: "100%" }}>
      <View
        style={{
          marginTop: 60,
          marginRight: 20,
          marginLeft: 20,
          marginBottom: 15,
          display: "flex",
          alignSelf: "center",
          flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ zIndex: 99 }}
        >
          <Ionicons
            style={styles.back}
            name={
              i18n.locale === "en-US"
                ? "chevron-back-outline"
                : "chevron-forward-outline"
            }
          ></Ionicons>
        </TouchableOpacity>
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 1.41,
            elevation: 2,
            marginTop: 5,
            marginRight: 5,
            marginLeft: 5,
          }}
        >
          <TextInput
            textInputStyle={{
              padding: 14,
              paddingLeft: 50,
              paddingRight: 50,
              borderRadius: 13,
              fontSize: 18,
              fontFamily: "Ubuntu",
              width: "100%",
              textAlign: i18n.locale === "en-US" ? "left" : "right",
            }}
            placeholder={i18n.t("search")}
            placeholderTextColor={"grey"}
            onChangeText={(text) => {
              setQuery(text);
              setToggle(false);
              if (text === "") setToggle(true);
            }}
            mainColor="#4831d4"
          />
          <Ionicons style={styles.icon} name="search-outline"></Ionicons>
        </View>
      </View>

      {toggle ? (
        <>
          <Text
            style={{
              fontFamily: "UbuntuBold",
              fontSize: 20,
              margin: 32,
              marginBottom: 0,
              marginTop: 15,
              alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
            }}
          >
            {i18n.t("suggested")}
          </Text>
          <Carousel
            style={styles.spotsList}
            contentContainerStyle={styles.spotsListContainer}
            renderItem={renderSpot}
            windowSize={1}
            data={suggested}
            sliderWidth={450}
            itemWidth={360}
            layout={"default"}
            containerCustomStyle={{ alignSelf: "center" }}
            useScrollView={true}
          />
        </>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={styles.spotsList}
          >
            <FlatList
              nestedScrollEnabled={true}
              style={styles.spotsList}
              contentContainerStyle={styles.spotsListContainer}
              data={filteredSpots}
              renderItem={renderSearch}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </ScrollView>
        </>
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
