import { StyleSheet, Text, View, Button } from "react-native";
import { Center, Square, Circle } from "native-base";
import { useState } from "react";
import authStore from "../../stores/authStore";
import React from "react";

export default function Logout() {
  const handleLogOut = () => {
    authStore.logout();
  };
  return (
    <Center>
      <Button color={"red"} title="Logout" onPress={handleLogOut} />
    </Center>
  );
}

const styles = StyleSheet.create({});
