import * as React from "react";
import {
  useWindowDimensions,
  FlatList,
  View,
  StyleSheet,
  Text,
  ScrollView,
  useColorScheme,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ProfileSpot from "./screens/spots/ProfileSpot";
import authStore from "./stores/authStore";
import spotStore from "./stores/spotStore";
import FinishedSpot from "./screens/spots/FinishedSpot";
import { useFonts } from "expo-font";

import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "./MyAwesomeSplashScreen";

export default function ScrollTabs({ userSpots }) {
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      active: "Active",
      finished: "Finished",
      empty: "You don't have any active spots",
      emptyE: "You don't have any finished spots",
    },
    ar: {
      active: "نشط",
      finished: "انتهى",
      empty: "ليس لديك اي نقاط نشطة",
      emptyE: "ليس لديك اي نقاط منتهية",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  const layout = useWindowDimensions();
  const today = new Date();
  today.setHours(3, 0, 0, 0);
  const activeSpots = userSpots.filter(
    // Active spots
    (spot) => new Date(spot?.startDate) >= today
  );
  const finishedSpots = userSpots.filter(
    // Finshed spots
    (spot) => new Date(spot?.startDate) < today
  );
  const sortedActiveSpots = activeSpots.sort(
    // Sorted Active spots
    (objA, objB) => new Date(objA.startDate) - new Date(objB.startDate)
  );

  const sortedFinishedSpots = finishedSpots.sort(
    // Sorted Finshied spots
    (objA, objB) => new Date(objA.startDate) - new Date(objB.startDate)
  );

  const renderSpotActive = ({ item: spot }) => {
    return <ProfileSpot spot={spot} />;
  };
  const renderSpotFinished = ({ item: spot }) => {
    return <FinishedSpot spot={spot} />;
  };
  const FirstRoute = () => (
    <>
      {sortedActiveSpots.length === 0 ? (
        <View
          style={{
            display: "flex",
            alignSelf: "center",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            height: "70%",
          }}
        >
          <Text
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontSize: i18n.locale === "en-US" ? 35 : 30,
              padding: 35,
              fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
              textAlign: "center",
            }}
          >
            {i18n.t("empty")}
          </Text>
        </View>
      ) : (
        <ScrollView
          style={{
            flex: 1,
            zIndex: 99,
            marginBottom: 240,
            backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          <FlatList
            data={sortedActiveSpots}
            renderItem={renderSpotActive}
            style={{
              backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
            }}
            contentContainerStyle={styles.spotsListContainer}
          />
        </ScrollView>
      )}
    </>
  );

  const SecondRoute = () => (
    <>
      {sortedFinishedSpots.length === 0 ? (
        <View
          style={{
            display: "flex",
            alignSelf: "center",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            height: "70%",
          }}
        >
          <Text
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontSize: i18n.locale === "en-US" ? 35 : 30,
              padding: 35,
              fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
              textAlign: "center",
            }}
          >
            {i18n.t("emptyE")}
          </Text>
        </View>
      ) : (
        <ScrollView
          style={{
            flex: 1,
            zIndex: 99,
            marginBottom: 250,
            backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          <FlatList
            data={sortedFinishedSpots}
            renderItem={renderSpotFinished}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{
              backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
            }}
          />
        </ScrollView>
      )}
    </>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: i18n.t("active") },
    { key: "second", title: i18n.t("finished") },
  ]);
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("./assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("./assets/fonts/Ubuntu.ttf"),
    Noto: require("./assets/fonts/Noto.ttf"),
    NotoBold: require("./assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          renderLabel={({ focused, route }) => {
            return (
              <Text
                style={{
                  fontFamily: i18n === "en-US" ? "Ubuntu" : "Noto",
                  fontSize: 22,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                  margin: -10,
                }}
              >
                {route.title}
              </Text>
            );
          }}
          indicatorStyle={{
            backgroundColor: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            marginBottom: -1,
            opacity: 0.6,
            width: "20%",
            height: "6%",
            borderRadius: 100,
            marginLeft: 64,
          }}
          style={{ backgroundColor: "transparent", shadowOpacity: 0 }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  spotsList: {
    height: "100%",
  },
  spotsListContainer: {
    height: "100%",
  },
});
