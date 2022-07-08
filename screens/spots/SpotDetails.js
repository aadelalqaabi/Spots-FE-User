import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import spotStore from "../../stores/spotStore";
import { baseURL } from "../../stores/instance";
import { Ionicons } from "@expo/vector-icons";

export function SpotDetails({ navigation, route }) {
  const spot = spotStore.getSpotsById(route.params.id);

  return (
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

      <View>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{spot.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 550,
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
  mainTitle: {
    fontSize: 40,
    margin: 20,
    marginLeft: 30,
    marginTop: 23,
    marginRight: 10,
    fontWeight: "700",
  },
  icon: {
    fontSize: 40,
    fontWeight: "700",
    color: "#4831d4",
    alignSelf: "center",
    paddingTop: 1,
  },
  titlelocation: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
  },
  ownerContainer: {
    margin: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginLeft: 30,
    marginTop: 1,
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
  },
  descriptionTitle: {
    fontSize: 25,
    margin: 20,
    marginLeft: 30,
    marginTop: 3,
  },
  description: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30,
  },
});
