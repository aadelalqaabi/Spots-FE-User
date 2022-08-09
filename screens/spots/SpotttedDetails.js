import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { baseURL } from "../../stores/instance";
import spotStore from "../../stores/spotStore";
import React from "react";
import organizerStore from "../../stores/organizerStore";

export default function SpotttedDetails({ navigation, route }) {
  const spot = spotStore.getSpotsById(route.params.id);
  const organizer = organizerStore.getOrganizerById(spot.organizer);
  const ticket = route.params.ticket;
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  let date = moment(spot.startDate).format("LL");

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#e0e3e7",
          height: 6,
          width: 150,
          margin: 20,
          alignSelf: "center",
          borderRadius: "100%",
        }}
      ></View>
      <Text style={styles.thanks}>Spot Details</Text>

      <View style={styles.box}>
        <Text style={styles.spotName}>{spot.name}</Text>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 50,
            marginTop: 0,
            marginBottom: 0,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}
        >
          <View style={styles.ownerContainer}>
            <Image
              style={styles.ownerthumb}
              source={{ uri: `${baseURL}${organizer.image}` }}
            />
            <Text style={styles.ownername}>{organizer.username}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              // alignItems: "center",
              margin: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Ubuntu",
                fontSize: 25,
                margin: 10,
                color: "white",
                marginLeft: 0,
              }}
            >
              Date
            </Text>
            <Text
              style={{
                fontFamily: "UbuntuBold",
                fontSize: 25,
                color: "white",
              }}
            >
              {date}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              // alignItems: "center",
              margin: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Ubuntu",
                fontSize: 25,
                margin: 10,
                color: "white",
                textAlign: "left",
                marginLeft: 0,
              }}
            >
              Time
            </Text>
            <Text
              style={{ fontFamily: "UbuntuBold", fontSize: 25, color: "white" }}
            >
              {spot.startTime}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              // alignItems: "center",
              margin: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Ubuntu",
                fontSize: 25,
                margin: 10,
                marginLeft: 0,
                color: "white",
                textAlign: "left",
              }}
            >
              Entry
            </Text>
            <Text
              style={{ fontFamily: "UbuntuBold", fontSize: 25, color: "white" }}
            >
              {ticket.isFree === false ? (
                <>
                  <Text
                    style={{
                      fontFamily: "UbuntuBold",
                      fontSize: 25,
                      color: "white",
                    }}
                  >
                    {ticket.amount} x tickets
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      fontFamily: "UbuntuBold",
                      fontSize: 25,
                      color: "white",
                    }}
                  >
                    Free
                  </Text>
                </>
              )}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            borderColor: "#f7f7f7",
            borderWidth: 1,
            width: 160,
            height: 50,
            borderRadius: 10,
            margin: 50,
            marginBottom: 0,
            marginTop: 35,
            alignSelf: "center",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}
          onPress={() => Linking.openURL(spot.location)}
        >
          <Ionicons
            style={{
              fontSize: 32,
              zIndex: 99,

              color: "white",
            }}
            name="location"
          ></Ionicons>

          <Text style={styles.location}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 300,
            height: 60,
            borderRadius: 10,
            backgroundColor: "white",
            margin: 50,
            marginBottom: 0,
            marginTop: 15,
            alignSelf: "center",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}
          onPress={() => navigation.navigate("SpottedScanner", { spot: spot })}
        >
          <Ionicons
            style={{
              fontSize: 35,
              zIndex: 99,
              color: "#4831d4",
            }}
            name="scan"
          ></Ionicons>

          <Text style={styles.scantext}>Scan QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: "#4831d4",
    borderRadius: "50%",
    margin: 15,
    marginTop: 40,
    height: "78%",
  },
  thanks: {
    fontFamily: "UbuntuLight",
    alignSelf: "center",
    letterSpacing: 4,
    fontSize: 40,
    color: "#000000",
    alignSelf: "center",
    marginTop: "9%",
  },
  confirmMessage: {
    position: "absolute",
    width: 301.52,
    height: 19.79,
    left: 69,
    top: 133.21,
    fontFamily: "Ubuntu",
    fontSize: 12.806,
    lineHeight: 15,
    textAlign: "center",
    alignSelf: "center",

    color: "#000000",
  },
  QR: {
    width: 250,
    height: 250,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.53,
    shadowRadius: 10,
    elevation: 4,
    marginTop: 30,
    borderRadius: 40,
  },
  BookingDetails: {
    color: "white",
    fontSize: 24,
    marginTop: 30,
    marginLeft: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: 20,
    fontFamily: "UbuntuBold",
  },
  spotName: {
    color: "white",
    margin: 50,
    fontSize: 35,
    alignSelf: "left",
    marginBottom: 10,
    fontFamily: "UbuntuBold",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  tickets: {
    color: "white",
    marginTop: 30,
    fontSize: 30,
    alignSelf: "center",
    fontFamily: "Ubuntu",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  location: {
    color: "white",
    fontSize: 20,
    fontFamily: "Ubuntu",
    marginLeft: 10,
  },
  scantext: {
    color: "#4831d4",
    fontSize: 20,
    fontFamily: "Ubuntu",
    marginLeft: 10,
  },
  spotext: {
    color: "white",
    fontSize: 22,
    alignSelf: "center",
    marginLeft: 10,
    fontFamily: "UbuntuBold",
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
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 770,
  },
  ticket: {
    width: 380,
    height: 620,
    left: 25,
    top: 150,
  },
  ownerContainer: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  ownerthumb: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    zIndex: -1,
    marginRight: 10,
  },
  ownername: {
    color: "white",
    fontSize: 22,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontFamily: "UbuntuBold",
    textTransform: "capitalize",
  },
});
