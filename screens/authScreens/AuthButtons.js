import { StyleSheet, Button, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Login from "./Login";

export default function AuthButtons({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri: "https://cdn.discordapp.com/attachments/988081537218146334/989540691384365076/My_project_85.jpg",
      }}
      resizeMode="cover"
      style={styles.image}
    >
      <StatusBar style={"light"} />
      <Login />
      <Button
        title="Not a tripper? Register"
        style={styles.btn}
        size={"lg"}
        colorScheme={"blue"}
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginVertical: 8,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
