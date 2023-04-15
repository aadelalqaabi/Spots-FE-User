import {
    Image,
    View,
    Text,
    StyleSheet,
    useColorScheme,
    StatusBar,
    TouchableOpacity
  } from "react-native";
  import React from "react";
import authStore from "../stores/authStore";
import MySpots from "./MySpots";
import MySpotsGuest from "./MySpotsGuest";
  
  export default function MySpotsSwitcher() {
    return (
      <View>
        {authStore.guest === false ? (
            <MySpots/>
        ) : (
            <MySpotsGuest/>
        )}
      </View>
    );
  }
  