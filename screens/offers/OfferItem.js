import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { baseURL } from "../../stores/instance";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

function OfferItem({ offer }) {
  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Cabin: require("../../assets/fonts/Cabin.ttf"),
    CabinMedium: require("../../assets/fonts/CabinMedium.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={{ margin: 20, marginRight: -5 }}>
      <View>
        <Image
          style={styles.thumb}
          source={{ uri: `${baseURL}${offer?.image}` }}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.name}>{offer?.title}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{offer?.description}</Text>
      </View>
    </View>
  );
}
export default observer(OfferItem);

const styles = StyleSheet.create({
  thumb: {
    alignSelf: "flex-start",
    width: 310,
    height: 200,
    borderRadius: 10,
  },
  titleContainer: {
    alignSelf: "flex-start",
    width: "90%",
  },
  descriptionContainer: {
    alignSelf: "flex-start",
    width: "90%",
  },
  name: {
    textTransform: "capitalize",
    marginTop: 10,
    fontSize: 22,
    color: "black",
    fontFamily: "UbuntuBold",
  },
  description: {
    marginTop: 10,
    fontSize: 18,
    color: "black",
    fontFamily: "Cabin",
    width: 300,
    lineHeight: 25,
  },
});
