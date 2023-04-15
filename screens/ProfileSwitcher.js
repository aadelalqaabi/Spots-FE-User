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
import Profile from "./Profile";
import AuthButtons from "./authScreens/AuthButtons";
import authStore from "../stores/authStore";
  
  export default function ProfileSwitcher() {
    return (
      <View>
        {authStore.guest === false ? (
            <Profile/>
        ) : (
            <AuthButtons/>
        )}
      </View>
    );
  }
  