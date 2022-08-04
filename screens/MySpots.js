import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import authStore from "../stores/authStore";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView } from "native-base";
import { useFonts } from "expo-font";
import Spotted from "./spots/Spotted";
import AppLoading from "expo-app-loading";
import ticketStore from "../stores/ticketStore";
import ContentLoader, { Facebook, Rect } from "react-content-loader/native";

function MySpots() {
  // let spots = [];
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
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

  const tickets = ticketStore.tickets.filter(
    (ticket) => ticket.user._id === authStore.user.id
  );
  // console.log('tickets', tickets.length)
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

      {loading ? (
        <ContentLoader
          speed={2}
          viewBox="0 0 400 675"
          height={850}
          width={490}
          backgroundColor={"#f3f3f3"}
          foregroundColor={"#ecebeb"}
        >
          <Rect x="80" y="25" rx="15" ry="15" width="248" height="159" />
          <Rect x="15" y="75" rx="15" ry="15" width="48" height="59" />
          <Rect x="80" y="205" rx="15" ry="15" width="248" height="159" />
          <Rect x="15" y="255" rx="15" ry="15" width="48" height="59" />
          <Rect x="80" y="385" rx="15" ry="15" width="248" height="159" />
          <Rect x="15" y="435" rx="15" ry="15" width="48" height="59" />
        </ContentLoader>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
      )}
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
