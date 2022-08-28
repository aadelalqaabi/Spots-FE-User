import * as React from "react";
import {
  useWindowDimensions,
  FlatList,
  View,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ProfileSpot from "./screens/spots/ProfileSpot";
import authStore from "./stores/authStore";
import spotStore from "./stores/spotStore";
import FinishedSpot from "./screens/spots/FinishedSpot";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function ScrollTabs() {
  const layout = useWindowDimensions();
  const userSpots = authStore.user.spots?.map((spotId) =>
    spotStore.getSpotsById(spotId)
  );
  const today = new Date();
  const activeSpots = userSpots.filter(
    // Active spots
    (spot) => new Date(spot.startDate) === today
  );
  const finishedSpots = userSpots.filter(
    // Finshed spots
    (spot) => new Date(spot.startDate) < today
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
    <ScrollView style={{ flex: 1, zIndex: 99, marginBottom: 240 }}>
      <FlatList
        data={sortedActiveSpots}
        renderItem={renderSpotActive}
        style={styles.spotsList}
        contentContainerStyle={styles.spotsListContainer}
      />
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView style={{ flex: 1, zIndex: 99, marginBottom: 250 }}>
      <FlatList
        data={sortedFinishedSpots}
        renderItem={renderSpotFinished}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Active" },
    { key: "second", title: "Finished" },
  ]);
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("./assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("./assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
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
              <Text style={{ fontFamily: "Ubuntu", fontSize: 22 }}>
                {route.title}
              </Text>
            );
          }}
          indicatorStyle={styles.indicatorStyle}
          style={{ backgroundColor: "white", shadowOpacity: 0 }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  spotsList: {
    backgroundColor: "#ffffff",
    height: "100%",
  },
  spotsListContainer: {
    backgroundColor: "#ffffff",
    height: "100%",
  },
  indicatorStyle: {
    backgroundColor: "black",
    marginBottom: -1,
    opacity: 0.6,
    width: "20%",
    marginLeft: 64,
  },
});
