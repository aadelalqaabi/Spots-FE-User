import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import authStore from "../../stores/authStore";
import spotStore from "../../stores/spotStore";
import React, { useState } from "react";
import ticketStore from "../../stores/ticketStore";

export default function Confirmation({ navigation, route }) {
  const spot = route.params.itemId;
  const tickets = route.params.quantity;
  const [newTicket, setNewTicket] = useState({
    amount: 0,
    image: "",
    isFree: false
  });

  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  let date = moment(spot.startDate).format("LL");

  const handleBooking = async () => {
   spot.seats = spot.seats - tickets;
   spot.spotRevenue = tickets * spot.price;
   newTicket.amount = tickets;
  //  add QR Code later
  
    try {
     await spotStore.updateSpot(spot, spot._id);
    //  await authStore.spotAdd(spot._id);
     await ticketStore.createTicket(newTicket, spot._id)
     authStore.sendBookingEmail(tickets, spot);
     navigation.navigate("Explore");
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <View style={{
      width: "100%",
      height: "100%",
      backgroundColor: "white",
    }}>
      <Text style={styles.thanks}>Thank You!</Text>
      <Text style={styles.confirmMessage}>You have purchased your ticket successfully!</Text>
      <View style={styles.box}>
        <Text style={styles.BookingDetails}>Booking Details</Text>
        <Text style={styles.spotName}>{spot.name}</Text>
        <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "space-evenly",
              alignSelf: "center",
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
                    color: "white",
                    fontSize: 30,
                  }}
                  name="calendar-outline"
                ></Ionicons>
                <Text
                  style={{ fontFamily: "UbuntuBold", fontSize: 20, marginRight: 20, color: "white" }}
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
                }}
              >
                <Ionicons
                  style={{ marginRight: 5, fontSize: 30, color: "white" }}
                  name="time-outline"
                ></Ionicons>
                <Text style={{ fontFamily: "UbuntuBold", fontSize: 20, color: "white" }}>
                  {spot.startTime}
                </Text>
              </View>
            </View>
        <Text style={styles.tickets}>{tickets} x tickets</Text>
        <Image style={styles.QR} source={require("../../assets/QR.png")} />
      </View>
      <TouchableOpacity
        style={styles.spotthis}
        onPress={handleBooking}
      >
        <Text style={styles.spotext}>Back to Spots</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    width: 380,
    height: 540,
    left: 25,
    top: 186,
    // width: 380,
    // height: 500,
    backgroundColor: "#4831d4",
    // backgroundColor: "#B4E155",
    // backgroundColor: "#C9fb5f",
    // boxShadow: 0 4 11 rgba(0, 0, 0, 0.25),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 31,
  },
  thanks: {
    position: "absolute",
    width: 242.15,
    height: 47.75,
    left: 95,
    top: 75,
    fontFamily: "UbuntuBold",
    fontWeight: "400",
    fontSize: 40.9266,
    lineHeight: 47,
    textAlign: "center",
    color: "#000000",
    alignSelf: "center",

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
    width: 188,
    height: 188,
    // marginLeft: 14,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,

  },
  BookingDetails: {
    color: "white",
    // margin: 10,
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
    margin: 10,
    fontSize: 40,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: 30,
    fontFamily: "UbuntuBold",
  },
  tickets: {
    color: "white",
    marginTop: 30,
    margin: 10,
    fontSize: 24,
    marginLeft: 18,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: 30,
    fontFamily: "UbuntuBold",
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
    marginTop: 770
  },
});
