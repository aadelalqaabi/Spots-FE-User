import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import authStore from "../../stores/authStore";
import React from "react";
import TextInput from "react-native-text-input-interactive";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    authStore.login(user);
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
        justifyContent: "center",
        width: "105%",
        alignSelf: "center",
      }}
    >
      <Text style={styles.inputLabel}>Username</Text>

      <TextInput
        textInputStyle={{
          alignSelf: "center",
          width: "100%",
        }}
        mainColor="#4831d4"
        label="Username"
        onChangeText={(text) => {
          handleChange("username", text);
        }}
        placeholder=""
        keyboardType="web-search"
        onSubmitEditing={handleSubmit}
      />
      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        textInputStyle={{
          marginBottom: 20,
          alignSelf: "center",
          width: "100%",
        }}
        mainColor="#4831d4"
        label="Password"
        secureTextEntry={true}
        onChangeText={(text) => {
          handleChange("password", text);
        }}
        placeholder=""
        keyboardType="web-search"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttontitle}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 40,
    marginTop: 0,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 5,
  },
  button: {
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#4831d4",
  },
  buttontitle: {
    paddingVertical: 10,
    borderRadius: 15,
    elevation: 3,
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    alignSelf: "center",
  },
  inputLabel: {
    marginBottom: 8,
    marginTop: 20,
    fontFamily: "Ubuntu",
    fontSize: 16,
  },
});
