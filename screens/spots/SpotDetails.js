import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  LogBox,
} from "react-native";
import React, { useState } from "react";
import spotStore from "../../stores/spotStore";
import { baseURL } from "../../stores/instance";
import { Ionicons } from "@expo/vector-icons";
import authStore from "../../stores/authStore";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import ReadMore from "@fawazahmed/react-native-read-more";
import moment from "moment";
LogBox.ignoreAllLogs();

export function SpotDetails({ navigation, route }) {
  const spot = spotStore.getSpotsById(route.params.id);
  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const handleSpots = (spot) => {
    if (!authStore.user.spots.includes(spot._id)) {
      authStore.spotAdd(spot._id);
      Alert.alert("Added to your spots");
    } else {
      Alert.alert("Already in your spots");
    }
  };
  let date = moment(spot.startDate).format("LL");
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <StatusBar barStyle="light-content" />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Explore");
          }}
        >
          <Ionicons style={styles.back} name="arrow-back-outline"></Ionicons>
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={{ uri: `${baseURL}${spot.image}` }}
        ></Image>

        <View style={styles.titlelocation}>
          <Text style={styles.mainTitle}>{spot.name}</Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => Linking.openURL(spot.location)}
          >
            <Ionicons style={styles.icon} name="navigate-circle"></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={styles.ownerContainer}>
          <Image
            style={styles.ownerthumb}
            source={{ uri: `${baseURL}${spot.organizer.image}` }}
          />
          <Text style={styles.ownername}>{spot.organizer.username}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: 15,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              style={{
                marginRight: 5,
                color: "#4831d4",
                fontSize: 30,
              }}
              name="calendar-outline"
            ></Ionicons>
            <Text style={{ fontFamily: "Ubuntu", fontSize: 20 }}>{date}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              style={{ marginRight: 5, color: "#4831d4", fontSize: 30 }}
              name="time-outline"
            ></Ionicons>
            <Text style={{ fontFamily: "Ubuntu", fontSize: 20 }}>
              {spot.startTime}
            </Text>
          </View>
        </View>
        <View style={{ margin: 20, marginLeft: 30, marginTop: 10 }}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <ReadMore numberOfLines={3} style={styles.description}>
            {spot.description}
          </ReadMore>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.spotthis}
        onPress={() => {
          handleSpots(spot);
        }}
      >
        <Text style={styles.spotext}>Spot this</Text>
        <Ionicons style={styles.spoticon} name="location"></Ionicons>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 500,
    zIndex: -1,
  },
  back: {
    position: "absolute",
    color: "white",
    zIndex: 99,
    marginTop: 70,
    marginLeft: 25,
    fontSize: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  spotext: {
    color: "white",
    fontSize: 25,
    alignSelf: "center",
    marginLeft: 10,
    fontFamily: "Ubuntu",
  },
  spoticon: {
    color: "white",
    fontSize: 30,
    alignSelf: "center",
    zIndex: 99,
  },
  spotthis: {
    display: "flex",
    alignSelf: "center",
    borderRadius: 25,
    height: 60,
    width: 380,
    backgroundColor: "#4831d4",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    margin: 10,
    justifyContent: "center",
    zIndex: 99,
    flexDirection: "row-reverse",
  },
  mainTitle: {
    fontSize: 40,
    margin: 10,
    marginLeft: 30,
    marginTop: 15,
    marginRight: 10,
    fontWeight: "700",
    fontFamily: "Ubuntu",
  },
  icon: {
    fontSize: 40,
    fontWeight: "700",
    color: "#4831d4",
    alignSelf: "center",
    paddingTop: 4,
  },
  titlelocation: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
  },
  ownerContainer: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 0,
  },
  ownerthumb: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    zIndex: -1,
    marginRight: 10,
  },
  ownername: {
    fontSize: 20,
    color: "black",
    fontFamily: "Ubuntu",
  },
  descriptionTitle: {
    fontSize: 22,
    marginBottom: 10,
    fontFamily: "Ubuntu",
  },
  description: {
    fontSize: 18,

    fontFamily: "Ubuntu",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
