import { StyleSheet, Text, View, TextInput } from "react-native";
import { Center, Square, Circle, Button } from "native-base";
import { useState } from "react";
import authStore from "../../stores/authStore";
import React from "react";
import Reinput from "reinput";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    authStore.register(user);
  };
  return (
    <View
      style={{
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ width: "60%", alignSelf: "center", marginBottom: 120 }}>
        <Text style={styles.title}>Register</Text>
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

        <Button size={"lg"} colorScheme={"blue"} onPress={handleSubmit}>
          Register
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
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 10,
  },
});
