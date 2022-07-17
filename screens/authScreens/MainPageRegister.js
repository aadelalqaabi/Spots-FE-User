import { StyleSheet, View, Text, Button } from "react-native";
import { useState } from "react";
import React from "react";
import Reinput from "reinput";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";

export default function MainPageRegister() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    image: "",
  });
  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };
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
      <Ionicons
        style={{
          position: "absolute",
          fontSize: 35,
          marginTop: 80,
          marginLeft: 20,
        }}
        name="chevron-back-outline"
        onPress={() => navigation.goBack()}
      ></Ionicons>
      <View
        style={{
          justifyContent: "center",
          marginTop: 130,
          width: "70%",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "UbuntuBold",
            fontSize: 30,
            margin: 20,
            marginTop: 0,
            width: "100%",
            textAlign: "center",
          }}
        >
          Enter username
        </Text>
        <Text
          style={{
            fontFamily: "Ubuntu",
            fontSize: 16,
            margin: 20,
            marginTop: 0,
            width: "100%",
            textAlign: "center",
            color: "#64666b",
            lineHeight: 20,
          }}
        >
          Choose a username for your account and to login with later
        </Text>
        <View style={{ width: "100%", alignSelf: "center" }}>
          <Reinput
            label="Username"
            onChangeText={(text) => {
              handleChange("username", text);
            }}
            placeholder="Enter Username"
          />
          <View style={styles.button}>
            <Button
              title="Next"
              color="white"
              onPress={() => {
                navigation.navigate("Email", { itemId: user });
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 40,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#4831d4",
  },
});

{
  /* marginBottom: 120*/
}
