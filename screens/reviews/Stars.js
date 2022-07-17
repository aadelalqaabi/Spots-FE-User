import { StyleSheet, Text, View, Image } from "react-native";
import { observer } from "mobx-react";
import React from "react";

function Stars({ stars }) {
  console.log("stars: " + stars);
  let starsTotal;
  if (stars === "5") {
    return (starsTotal = (
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "center",
          flexDirection: "row",
          marginLeft: 6,
          marginTop: -8,
        }}
      >
        <Image style={styles.star} source={require("../../assets/star.png")} />
        <Image style={styles.star} source={require("../../assets/star.png")} />
        <Image style={styles.star} source={require("../../assets/star.png")} />
        <Image style={styles.star} source={require("../../assets/star.png")} />
        <Image style={styles.star} source={require("../../assets/star.png")} />
      </View>
    ));
  } else if (stars === "4") {
    return (starsTotal = (
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "center",
          flexDirection: "row",
          marginLeft: 6,
          marginTop: -8,
        }}
      >
        <Image style={styles.star} source={require("../../assets/star.png")} />
        <Image style={styles.star} source={require("../../assets/star.png")} />
        <Image style={styles.star} source={require("../../assets/star.png")} />
        <Image style={styles.star} source={require("../../assets/star.png")} />
      </View>
    ));
  } else if (stars === "3") {
    return (starsTotal = (
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "center",
          flexDirection: "row",
          marginLeft: 6,
          marginTop: -8,
        }}
      >
        <Image style={styles.star} source={require("../../assets/star.png")} />
        <Image style={styles.star} source={require("../../assets/star.png")} />
        <Image style={styles.star} source={require("../../assets/star.png")} />
      </View>
    ));
  } else if (stars === "2") {
    return (starsTotal = (
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "center",
          flexDirection: "row",
          marginLeft: 6,
          marginTop: -8,
        }}
      >
        <Image style={styles.star} source={require("../../assets/star.png")} />
        <Image style={styles.star} source={require("../../assets/star.png")} />
      </View>
    ));
  } else {
    return (starsTotal = (
      <View style={{ marginLeft: 6 }}>
        <Image style={styles.star} source={require("../../assets/star.png")} />
      </View>
    ));
  }
  // else {
  // return starsTotal =
  // (
  //    <Text>No Stars</Text>
  // )
  // }
}

export default observer(Stars);

const styles = StyleSheet.create({
  star: {
    width: 25,
    height: 25,
    borderRadius: "50%",
  },
});
