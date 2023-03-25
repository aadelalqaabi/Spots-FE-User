import { View, Image, useColorScheme } from "react-native";
import React from "react";

export default function MyAwesomeSplashScreen() {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
      }}
    >
      <Image
        style={{
          width: 90,
          height: 102,
          alignSelf: "center",
        }}
        source={require("./assets/Loading.gif")}
      ></Image>
    </View>
  );
}
