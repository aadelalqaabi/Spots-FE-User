import { TouchableOpacity, View, StyleSheet, Image, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import Login from "./Login";

export default function AuthButtons({ navigation }) {
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          marginTop: 150,
          width: "70%",
          alignSelf: "center",
        }}
      >
        <StatusBar style={"dark"} />
        <Image
          style={{
            width: 350,
            height: 300,
            alignSelf: "center",
            resizeMode: "contain",
          }}
          source={require("../../assets/Logo.png")}
        />
        <Login />
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Text style={styles.checktext}>New to Spots?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MainPageRegister");
            }}
            style={styles.signUp}
          >
            <Text style={styles.signUpText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signUp: {
    borderRadius: 15,
  },
  signUpText: {
    color: "#4831d4",
    fontFamily: "UbuntuBold",
    fontSize: 20,
  },
  checktext: {
    color: "#64666b",
    fontFamily: "Ubuntu",
    fontSize: 20,
    paddingRight: 8,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
