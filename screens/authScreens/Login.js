import { StyleSheet, Text, View, TextInput } from "react-native";
import { Center, Square, Circle, Button } from "native-base";
import { useState } from "react";
import authStore from "../../stores/authStore";
import React from "react";
import Reinput from "reinput";
import * as Font from "expo-font";
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
  return (
    <View
      style={{
        justifyContent: "center",
        marginTop: 150,
        width: "50%",
        alignSelf: "center",
      }}
    >
      <Text style={styles.title}>Login</Text>
      <View>
        <Reinput
          label="Username"
          onChangeText={(text) => {
            handleChange("username", text);
          }}
          placeholder="Enter Username"
        />
        <Reinput
          label="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            handleChange("password", text);
          }}
          placeholder="Enter Password"
        />
        <Button
          colorScheme={"blue"}
          marginBottom={"5"}
          size={"lg"}
          onPress={handleSubmit}
        >
          Login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 40,
    marginTop: 60,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 5,
  },
});
