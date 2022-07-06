import { StyleSheet, Text, View } from "react-native";
import React from "react";
import spotStore from "../../stores/spotStore";

export function SpotDetails({ route }) {
  const spot = spotStore.getSpotsById(route.params.id);
  return (
    <View>
      <Text>{spot.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
