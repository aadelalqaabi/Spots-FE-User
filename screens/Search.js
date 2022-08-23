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
import spotStore from "../stores/spotStore";
import { FlatList } from "react-native-gesture-handler";
import SearchSpot from "./spots/SearchSpot";

export default function Search({ route, navigation }) {
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
      <View style={styles.searchView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ zIndex: 99 }}
        >
          <Ionicons style={styles.back} name="chevron-back-outline"></Ionicons>
        </TouchableOpacity>
        <View style={styles.container}>
          <TextInput
            textInputStyle={styles.formField}
            placeholder="Search"
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
              marginLeft: 30,
              marginTop: 30,
              marginBottom: 0,
            }}
          >
            Suggested Spot
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
    marginRight: 15,
    marginLeft: 5,
  },
  searchView: {
    marginTop: 60,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 15,
    display: "flex",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
  },
  formField: {
    padding: 14,
    paddingLeft: 50,
    borderRadius: 13,
    fontSize: 18,
    fontFamily: "Ubuntu",
    width: "100%",
  },
  icon: {
    zIndex: 99,
    position: "absolute",
    marginLeft: 12,
    marginTop: 12,
    fontSize: 25,
    color: "grey",
  },
});
