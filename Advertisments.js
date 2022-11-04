import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Advertisments() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, margin: 100 }}>
      <Text>Advertisments</Text>
      <Button title="here" onPress={() => navigation.navigate("Explore")} />
    </View>
  );
}
