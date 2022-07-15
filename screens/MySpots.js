import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import React from "react";
import authStore from "../stores/authStore";
import spotStore from "../stores/spotStore";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "native-base";
import { useFonts } from "expo-font";
import Spotted from "./spots/Spotted";
import AppLoading from "expo-app-loading";

function MySpots() {
  let spots = [];
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  //for (let i = 0; i < spots.length; i++) {
  // for (let j = 0; j < spots.length - i - 1; j++) {
  //  if (spots[j]?.startDate > spots[j + 1]?.startDate) {
  //    let temp = spots[j];
  //  spots[j] = spots[j + 1];
  //   spots[j + 1] = temp;
  //  }
  // }
  // }
  authStore.user.spots.map((spotId) =>
    spots.push(spotStore.getSpotsById(spotId))
  );

  function renderSpot({ item: spot }) {
    return <Spotted spot={spot} navigation={navigation} />;
  }
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        marginBottom: 150,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          margin: 30,
          marginBottom: 10,
          marginTop: 15,
          fontFamily: "UbuntuBold",
        }}
      >
        My Spots
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <FlatList
          style={styles.spotsList}
          contentContainerStyle={styles.spotsListContainer}
          data={spots}
          renderItem={renderSpot}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default observer(MySpots);

const styles = StyleSheet.create({
  spotsList: {
    backgroundColor: "#fffffc",
    height: "100%",
    width: "100%",
  },
  spotsListContainer: {
    backgroundColor: "#fffffc",
  },
});
