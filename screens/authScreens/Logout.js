import { StyleSheet, Text, View, Button } from "react-native";
import { useState } from "react";
import authStore from "../../stores/authStore";
import React from "react";

export default function Logout() {
  const handleLogOut = () => {
    authStore.logout();
  };
  return (
    <View>
      <Button color={"red"} title="🏃‍♂️" onPress={handleLogOut} />
    </View>
  );
}

const styles = StyleSheet.create({});
