import { StyleSheet, Image, View, Button } from "react-native";
import React from "react";

export default function Payment({ navigation, route }) {
  const spot = route.params.itemId;
  const tickets = route.params.quantity;
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <Image
        style={{
          marginBottom: 20,
          marginLeft: 70,
          marginTop: 200,
          height: 300,
          width: 300,
        }}
        source={{ uri: "https://kabkg.com/images/knet.png" }}
      ></Image>
      <Button
        onPress={navigation.navigate("Confirmation", {
          itemId: spot,
          quantity: tickets,
        })}
        title="Done"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
