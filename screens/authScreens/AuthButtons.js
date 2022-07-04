import { StyleSheet, Button, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Login from "./Login";
import { View } from "native-base";

export default function AuthButtons({ navigation }) {
  return (
    <View>
      <StatusBar style={"light"} />
      <Login />
      <Button
        title="Don't have an account? Register Now!!"
        style={styles.btn}
        size={"lg"}
        colorScheme={"blue"}
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    {/* </ImageBackground> */}
    </View>
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

{/* <ImageBackground */}
       {/* source={{ */}
    //     uri: "https://cdn.discordapp.com/attachments/988081537218146334/989540691384365076/My_project_85.jpg",
    //   }}
    //   resizeMode="cover"
    //   style={styles.image}
    // >
