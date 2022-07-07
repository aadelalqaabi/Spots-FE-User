import { StyleSheet, Button, ImageBackground, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Login from "./Login";
import { View } from "native-base";

export default function AuthButtons({ navigation }) {
  return (
    <View>
      <StatusBar style={"light"} />
      <Login />
      <View style={{display:"flex", justifyContent: "center", alignContent:"center", flexDirection: "row", paddingTop: 10}}>
      <Text style={styles.reg}>Don't have an account?</Text>
      <Button
        title="Register Now!!"
        // style={styles.btn}
        size={30}
        // color="#0195f6"
        color="#4831d4"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    fontWeight: "400" 
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
 reg:{
  paddingTop:9,
  fontSize: 17,
 }
});
