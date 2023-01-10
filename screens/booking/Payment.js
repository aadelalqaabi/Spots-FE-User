import { StyleSheet, Image, View, Button } from "react-native";
import React, { useState } from "react";
import spotStore from "../../stores/spotStore";
import ticketStore from "../../stores/ticketStore";
import authStore from "../../stores/authStore";
import { observer } from "mobx-react";

function Payment({ navigation, route }) {
  const spot = route.params.itemId;
  const tickets = route.params.quantity;
  const [newTicket, setNewTicket] = useState({
    amount: 0,
    image: "",
    isFree: false,
  });
  const handleBooking = async () => {
    spot.seatsRemaining = spot.seatsRemaining - tickets;
    spot.spotRevenue = spot.spotRevenue + tickets * spot.price;
    console.log("spot", spot);
    newTicket.amount = tickets;
    try {
      await spotStore.updateSpot(spot, spot._id);
      await ticketStore.createTicket(newTicket, spot._id);
      //authStore.sendBookingEmail(tickets, spot);
      navigation.navigate("MySpots");
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <Image
        style={{
          marginBottom: 20,
          marginLeft: 60,
          marginTop: 200,
          height: 300,
          width: 300,
        }}
        source={{ uri: "https://kabkg.com/images/knet.png" }}
      ></Image>
      <View style={styles.button}>
        <Button onPress={handleBooking} title="Done" color={"white"} />
      </View>
    </View>
  );
}
export default observer(Payment);
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#e52b51",
    width: 125,
    height: 40,
    alignSelf: "center",
  },
});
