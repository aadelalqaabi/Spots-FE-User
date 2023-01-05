import { View, Image } from "react-native";
import React from "react";

export default function MyAwesomeSplashScreen() {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Image
        style={{ height: "100%", width: "100%" }}
        source={require("./assets/DestSplash.png")}
      ></Image>
    </View>
  );
}
