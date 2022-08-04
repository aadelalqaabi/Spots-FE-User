import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import React, { useState } from "react";
import authStore from "../stores/authStore";
import spotStore from "../stores/spotStore";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "native-base";
import { useFonts } from "expo-font";
import Spotted from "./spots/Spotted";
import AppLoading from "expo-app-loading";
import ticketStore from "../stores/ticketStore";

function MySpots() {
  // let spots = [];
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // const tickets = authStore.user.tickets.map((ticketId) =>
  //   ticketStore.tickets.find((ticket) => ticket._id === ticketId)
  // );
  const today = new Date();
  const ticketsByDate = ticketStore.tickets.filter((ticket) => new Date(ticket.spot.startDate) > today,);
  const sortedTickets = ticketsByDate.sort(
    (objA, objB) => new Date(objA.spot.startDate) - new Date(objB.spot.startDate),
  );

  const tickets = sortedTickets.filter(ticket => ticket.user === authStore.user.id);
  // const today = new Date();
  // const ticketsByDate = tickets.filter((ticket) => new Date(ticket.spot.startDate) > today,);
  // const sortedTickets = ticketsByDate.sort(
  //   (objA, objB) => new Date(objA.spot.startDate) - new Date(objB.spot.startDate),
  // );
  // const tickets = ticketStore.tickets;
  console.log('tickets', tickets)
  // const tickets = ticketStore.tickets.filter((ticket) => ticket.user._id === authStore.user.id);

  // authStore.user.spots.map((spotId) =>
  //   spots.push(spotStore.getSpotsById(spotId))
  // );

  function renderTicket({ item: ticket }) {
    return <Spotted ticket={ticket} navigation={navigation} />;
  }
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        marginBottom: 150,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          margin: 30,
          marginBottom: 10,
          marginTop: 15,
          fontFamily: "UbuntuBold",
        }}
      >
        My Spots
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <FlatList
          nestedScrollEnabled={true}
          style={styles.spotsList}
          contentContainerStyle={styles.spotsListContainer}
          data={tickets}
          renderItem={renderTicket}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default observer(MySpots);

const styles = StyleSheet.create({
  spotsList: {
    backgroundColor: "#fffffc",
    height: "100%",
    width: "100%",
  },
  spotsListContainer: {
    backgroundColor: "#fffffc",
  },
});
