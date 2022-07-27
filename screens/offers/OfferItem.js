import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { baseURL } from "../../stores/instance";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

function OfferItem({ offer }) {
  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
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
    fontSize: 25,
    color: "black",
    fontFamily: "Ubuntu",
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: "black",
    fontFamily: "Ubuntu",
    width: 300,
    textAlign: "justify",
  },
});
