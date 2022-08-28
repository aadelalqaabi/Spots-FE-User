import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function OnBoarding() {
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Going out never felt this fun</Text>
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MainPageRegister")}
        >
          <Text style={styles.text}>Get Started</Text>
          <Ionicons
            style={styles.icon}
            name="chevron-forward-outline"
          ></Ionicons>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            flexDirection: "row",
            marginTop: 5,
          }}
        >
          <Text style={styles.logintext}>Or</Text>
          <Text
            style={styles.loginbutton}
            onPress={() => navigation.navigate("Set Up Account")}
          >
            Login
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logintext: {
    fontSize: 18,
    fontFamily: "Ubuntu",
    marginTop: 10,
    marginRight: 5,
    alignSelf: "flex-end",
  },
  loginbutton: {
    fontSize: 22,
    fontFamily: "UbuntuBold",
    marginTop: 10,
    color: "#4831d4",
  },
  title: {
    fontSize: 48,
    fontFamily: "UbuntuBold",
    width: "75%",
    marginTop: 200,
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  button: {
    display: "flex",
    alignSelf: "center",
    borderRadius: 12,
    height: 70,
    width: "75%",
    backgroundColor: "#4831d4",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  icon: {
    color: "white",
    fontSize: 30,
    alignSelf: "center",
    zIndex: 99,
  },
  text: {
    color: "white",
    fontSize: 25,
    alignSelf: "center",
    marginLeft: 10,
    fontFamily: "Ubuntu",
  },
});
