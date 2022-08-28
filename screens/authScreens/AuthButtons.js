import {
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            flex: 1,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              marginTop: -155,
              marginBottom: -50,
              width: "70%",
              alignSelf: "center",
              flex: 1,
            }}
          >
            <StatusBar style={"dark"} />
            <Image
              style={{
                width: 55,
                height: 75,
                alignSelf: "center",
                resizeMode: "contain",
              }}
              source={require("../../assets/icony.png")}
            />
            <Text style={styles.title}>Go Where You Want To</Text>

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
              <Text style={styles.checktext}>New to GoTo?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MainPageRegister");
                }}
                style={styles.signUp}
              >
                <Text style={styles.signUpText}>Register Here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  title: {
    fontSize: 45,
    fontFamily: "UbuntuBold",
    width: "100%",
    marginTop: 100,
    marginBottom: 30,
  },
  container: {
    flex: 1,
  },
});
