import * as React from "react";
import {
  useWindowDimensions,
  FlatList,
  View,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ProfileSpot from "./screens/spots/ProfileSpot";
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
      empty: "No active dests yet",
      emptyE: "No finished dests yet",
    },
    ar: {
      active: "نشط",
      finished: "انتهى",
      empty: "لا وجهات نشطة حتى الآن",
      emptyE: "لا وجهات منتهية حتى الآن",
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
    (spot) => new Date(spot?.startDate) >= today && spot.isPublished === true
  );
  const finishedSpots = userSpots.filter(
    // Finshed spots
    (spot) => new Date(spot?.startDate) < today && spot.isPublished === true
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
          <Image
            style={{
              width: 300,
              height: 229,
              alignSelf: "center",
              marginTop: "-30%",
            }}
            source={require("./assets/Active.png")}
          ></Image>
          <Text
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontSize:
                i18n.locale === "en-US" || i18n.locale === "en" ? 30 : 25,
              padding: 35,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              textAlign: "center",
            }}
          >
            {i18n.t("empty")}
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedActiveSpots}
          nestedScrollEnabled={true}
          renderItem={renderSpotActive}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            backgroundColor: "transparent",
            height: "100%",
            width: "100%",
            marginBottom: 400,
          }}
          contentContainerStyle={styles.spotsListContainer}
        />
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
          <Image
            style={{
              width: 300,
              height: 237,
              alignSelf: "center",
              marginTop: "-28%",
            }}
            source={require("./assets/finished.png")}
          ></Image>
          <Text
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontSize:
                i18n.locale === "en-US" || i18n.locale === "en" ? 30 : 25,
              padding: 35,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              textAlign: "center",
            }}
          >
            {i18n.t("emptyE")}
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedFinishedSpots}
          renderItem={renderSpotFinished}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{
            backgroundColor: "transparent",
            height: "100%",
            width: "100%",
            marginBottom: 400,
          }}
        />
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
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "Ubuntu"
                      : "Noto",
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
            width: "15%",
            height: "5%",
            borderRadius: 100,
            marginLeft: 74,
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
  spotsListContainer: {},
});
