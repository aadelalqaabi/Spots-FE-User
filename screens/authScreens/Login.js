import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import authStore from "../../stores/authStore";
import React from "react";
import Reinput from "reinput";
import { ScrollView } from "native-base";
import { Header, useHeaderHeight } from "@react-navigation/stack";

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
        width: "100%",
        alignSelf: "center",
      }}
    >
      <View>
        <Reinput
          label="Username"
          onChangeText={(text) => {
            handleChange("username", text);
          }}
          placeholder="Enter Username"
          keyboardType="web-search"
          onSubmitEditing={handleSubmit}
        />
        <Reinput
          label="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            handleChange("password", text);
          }}
          placeholder="Enter Password"
          keyboardType="web-search"
          onSubmitEditing={handleSubmit}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttontitle}>Login</Text>
        </TouchableOpacity>
      </View>
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
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#4831d4",
  },
  buttontitle: {
    paddingVertical: 10,
    borderRadius: 15,
    elevation: 3,
    color: "white",
    fontSize: 20,
    fontWeight: "800",
    alignSelf: "center",
  },
});
