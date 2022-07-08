import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
// import { Button } from "native-base";
import { useState } from "react";
import authStore from "../../stores/authStore";
import React from "react";
import Reinput from "reinput";

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
    <KeyboardAvoidingView>
      <View
        style={{
          justifyContent: "center",
          marginTop: 150,
          width: "70%",
          alignSelf: "center",
          // backgroundColor: "white"
        }}
      >
        {/* <Text style={styles.title}>Login</Text> */}
        <Image
          style={{
            width: 350,
            height: 350,
            marginBottom: 30,
            alignSelf: "center",
          }}
          source={{
            uri: "https://capital-placement.b-cdn.net/wp-content/uploads/2022/06/18-location-pin-outline1-unscreen.gif",
          }}
        />
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
          {/* <Button
          colorScheme={"blue"}
          marginBottom={"5"}
          size={"lg"}
          onPress={handleSubmit}
        >
          Login
        </Button> */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttontitle}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    paddingVertical: 12,
    paddingHorizontal: 32,
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
