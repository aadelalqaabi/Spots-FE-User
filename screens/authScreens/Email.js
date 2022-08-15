import { StyleSheet, View, Button, Text } from "react-native";
import { useState } from "react";
import React from "react";
import TextInput from "react-native-text-input-interactive";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function Email({ navigation, route }) {
  const { itemId } = route.params;
  const [user, setUser] = useState(itemId);
  const [checkValidation, setCheckValidation] = useState(true);
  const [showError, setShowError] = useState(true);

  const handleChange = (name, value) => {
    const check = checkEntry(value);
    if(check === true){
      setUser({ ...user, [name]: value });
      setCheckValidation(false);
      setShowError(false);
    } else{
      setCheckValidation(true);
      setShowError(true);
    } 
  };
  const checkEntry = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
          Enter Email
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
          Add an email for your account to recive confirmation emails
        </Text>
        <View style={{ width: "100%", alignSelf: "center" }}>
          <TextInput
            textInputStyle={{
              alignSelf: "center",
              width: "100%",
              marginBottom: 10,
            }}
            mainColor="#4831d4"
            label="Email"
            onChangeText={(text) => {
              handleChange("email", text);
            }}
            placeholder="Email"
            keyboardType="web-search"
            onSubmitEditing={() => {
              navigation.navigate("Password", { itemId: user });
            }}
          />
          {showError === true ? 
            <View style={styles.errorContainer}>
              <Ionicons name="close-outline" size={18} color="red" />
              <Text style={styles.errorText}>Invalid Email</Text>
            </View>
            :
            <View style={styles.errorContainer}>
              <Ionicons name="checkmark" size={16} color="green" />
              <Text style={styles.correctText}>Valid Email</Text>
            </View>
          }
          <View style={styles.button}>
            <Button
              title="Next"
              color="white"
              disabled={checkValidation}
              onPress={() => {
                navigation.navigate("Password", { itemId: user });
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
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#4831d4",
  },
  errorContainer: {
    // borderWidth: 2,
    // borderTopWidth: 5,
    // borderBottomWidth: 5,
    // borderLeftWidth: 5,
    // borderRightWidth: 5,
    // borderColor: '#000',
    // paddingBottom: 10,
    flexDirection: 'row',
    // borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
    marginTop: -12,
    marginLeft: 8
  },
  errorText: {
    marginTop: 3,
    marginLeft: -3,
    color:"red",
    fontSize: 10
  },
  correctText: {
    marginTop: 3,
    marginLeft: -2,
    color:"green",
    fontSize: 10
  }
});

{
  /* marginBottom: 120*/
}
