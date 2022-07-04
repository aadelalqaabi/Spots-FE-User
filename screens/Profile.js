import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Logout from './authScreens/Logout'
import authStore from '../stores/authStore'
import { baseURL } from "../stores/instance";

export default function Profile() {
  return (
    <View>
      <Text>Profile</Text>
      <Image
        style={styles.profileImage}
        source={{
          uri: baseURL + authStore.user.image,
        }}
      />
      <Logout/>

    </View>
  )
}

const styles = StyleSheet.create({
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 100,
    marginRight: 130,
    marginLeft: 130,
    marginTop: 80,
    borderWidth: 2,
  },
})