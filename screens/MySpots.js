import {
  StyleSheet,
  Text,
  SafeAreaView,
  RefreshControl,
  useColorScheme,
  View,
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
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { StatusBar } from "react-native";

function MySpots() {
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      myspots: "My Spots",
      empty: "You don't have any spots",
    },
    ar: {
      myspots: "النقاط الخاصة بي",
      empty: "ليس لديك اي نقاط",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
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
    ticketStore.fetchTickets();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    NotoBold: require("../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const today = new Date();
  today.setHours(3, 0, 0, 0);
  let ticketsByDate = ticketStore.tickets.filter(
    (ticket) => new Date(ticket.spot?.startDate) >= today
  );
  const sortedTickets = ticketsByDate.sort(
    (objA, objB) =>
      new Date(objA.spot?.startDate) - new Date(objB.spot?.startDate)
  );
  const tickets = sortedTickets.filter(
    (ticket) => ticket.user === authStore.user.id
  );
  function renderTicket({ item: ticket }) {
    return <Spotted ticket={ticket} navigation={navigation} />;
  }

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
        marginBottom: 150,
      }}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <Text
        style={{
          fontSize: 30,
          margin: 30,
          marginBottom: 10,
          marginTop: 15,
          fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
          alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
          color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
        }}
      >
        {i18n.t("myspots")}
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
      ) : tickets.length !== 0 ? (
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
      ) : (
        <View
          style={{
            display: "flex",
            alignSelf: "center",
            height: "90%",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontSize: i18n.locale === "en-US" ? 50 : 40,
              fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
              alignSelf: "center",
            }}
          >
            {i18n.t("empty")}
          </Text>
        </View>
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
