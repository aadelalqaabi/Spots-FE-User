import {
  StyleSheet,
  Text,
  SafeAreaView,
  RefreshControl,
  useColorScheme,
  View,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import authStore from "../stores/authStore";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Spotted from "./spots/Spotted";
import ticketStore from "../stores/ticketStore";
import ContentLoader, { Rect } from "react-content-loader/native";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";

function MySpots() {
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      myspots: "Tickets",
      empty: "No tickets yet",
    },
    ar: {
      myspots: "تذاكر",
      empty: "لا تذاكر حتى الآن",
    },
  };

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: translations,
    lng: Localization.locale,
    fallbackLng: true,
    interpolation: {
      escapeValue: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await ticketStore.fetchTickets();
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
    return <View style={{ backgroundColor: "transparent" }}></View>;
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
        backgroundColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
      }}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <Text
        style={{
          fontSize: 32,
          margin: 20,
          marginBottom: 10,
          marginTop: 15,
          fontFamily:
            i18n.language.split("-")[0] === "en" ? "UbuntuBold" : "NotoBold",
          alignSelf:
            i18n.language.split("-")[0] === "en" ? "flex-start" : "flex-end",
          color: colorScheme === "light" ? "#000000" : "#f1f1f1",
        }}
      >
        {i18n.language.split("-")[0] === "en" ? "My Dests" : "وجهاتي"}
      </Text>
      <View style={{ width: "100%", height: "91%", zIndex: 99 }}>
        {loading ? (
          <ContentLoader
            speed={3}
            viewBox="5 0 330 600"
            style={{
              height: "110%",
              marginTop: -18,
            }}
            backgroundColor={colorScheme === "dark" ? "#313131" : "#d8d8d8"}
            foregroundColor={colorScheme === "dark" ? "#5a5a5a" : "#c2c2c2"}
          >
            <Rect x="17" y="25" rx="15" ry="15" width="308" height="159" />
            <Rect x="17" y="205" rx="15" ry="15" width="308" height="159" />
            <Rect x="17" y="385" rx="15" ry="15" width="308" height="159" />
          </ContentLoader>
        ) : tickets.length !== 0 ? (
          <FlatList
            nestedScrollEnabled={true}
            style={styles.spotsList}
            contentContainerStyle={styles.spotsListContainer}
            data={tickets}
            renderItem={renderTicket}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
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
            <Image
              style={{
                width: 350,
                height: 262,
                alignSelf: "center",
              }}
              source={require("./../assets/EmptyTickets.png")}
            ></Image>
            <Text
              style={{
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                fontSize: 40,
                fontFamily:
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                alignSelf: "center",
                textAlign: "center",
                width: 350,
                marginTop: i18n.language.split("-")[0] === "en" ? 20 : 10,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "No tickets yet"
                : "لا تذاكر حتى الآن"}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default observer(MySpots);

const styles = StyleSheet.create({
  spotsList: {
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
  },
  spotsListContainer: {
    backgroundColor: "#fffffc",
  },
});
