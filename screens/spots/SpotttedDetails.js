import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { baseURL } from "../../stores/instance";
import ticketStore from "../../stores/ticketStore";
import spotStore from "../../stores/spotStore";
import React from "react";
import authStore from "../../stores/authStore";

export default function SpotttedDetails({ navigation, route }) {
  const spot = spotStore.getSpotsById(route.params.id);
  const ticket = route.params.ticket;
  // const ticket = ticketStore.tickets.find((ticket) => (ticket.spot === spot._id) && (ticket.user.username === authStore.user.username))
  //   const tickets = route.params.quantity;

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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Ionicons
              style={{
                marginRight: 5,
                color: "white",
                fontSize: 30,
              }}
              name="calendar-outline"
            ></Ionicons>
            <Text
              style={{
                fontFamily: "UbuntuBold",
                fontSize: 20,
                marginRight: 20,
                color: "white",
              }}
            >
              {date}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Ionicons
              style={{ marginRight: 5, fontSize: 30, color: "white" }}
              name="time-outline"
            ></Ionicons>
            <Text
              style={{ fontFamily: "UbuntuBold", fontSize: 20, color: "white" }}
            >
              {spot.startTime}
            </Text>
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
              style={{
                marginLeft: -4,
                marginRight: 5,
                fontSize: 30,
                color: "white",
              }}
              name="enter-outline"
            ></Ionicons>
            <Text
              style={{ fontFamily: "UbuntuBold", fontSize: 20, color: "white" }}
            >
              {ticket.isFree === false ? (
                <>
                  <Text
                    style={{
                      fontFamily: "UbuntuBold",
                      fontSize: 20,
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
                      fontSize: 20,
                      color: "white",
                    }}
                  >
                    Free Entry
                  </Text>
                </>
              )}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            borderColor: "#f7f7f7",
            borderWidth: 2,
            width: 160,
            height: 50,
            borderRadius: 10,
            margin: 50,
            marginBottom: 0,
            marginTop: 30,
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
          <Image
            style={{
              width: 23,
              height: 33,
              zIndex: 99,
            }}
            source={require("../../assets/gooogleMapsIcon.png")}
          ></Image>
          <Text style={styles.location}>Location</Text>
        </TouchableOpacity>
        {ticket.isFree === false ? (
          <>
            {/* <Image style={styles.QR} source={{ uri: baseURL + ticket.image }} /> */}
            <Image style={styles.QR} source={require("../../assets/QR.png")} />
          </>
        ) : (
          <>
            {/* <Text style={styles.tickets}>{ticket?.amount} x tickets</Text> */}
            <Image style={styles.QR} source={require("../../assets/QR.png")} />
            {/* <Text style={styles.tickets}>Wrong Info</Text> */}
          </>
        )}
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
    // fontWeight: 400,
    fontSize: 12.806,
    lineHeight: 15,
    textAlign: "center",
    alignSelf: "center",

    color: "#000000",
  },
  QR: {
    width: 300,
    height: 300,
    // marginLeft: 14,
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginTop: 10,
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
    fontSize: 40,
    alignSelf: "left",
    marginBottom: 30,
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
});
