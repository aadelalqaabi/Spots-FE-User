import { observer } from "mobx-react";
import React, { useState } from "react";
import {
  Animated,
  SafeAreaView,
  StatusBar,
  LogBox,
  FlatList,
  StyleSheet,
} from "react-native";
import SearchComponent from "../../searchBar/SearchComponent";
import spotStore from "../../stores/spotStore";
import Spot from "./Spot";
LogBox.ignoreAllLogs(true);

function Explore() {
  const spots = spotStore.getSpots();
  const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      new Animated.Value(0)
    ),
    0,
    50
  );

  function renderSpot({ item: spot }) {
    return (
      <Spot
        spot={spot}
        onPress={() => {
          navigation.navigate("SpotDetails", { id: spot._id });
        }}
      />
    );
  }

  return (
    <Animated.View style={{ backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <SearchComponent clampedScroll={clampedScroll} />
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingTop: 90,
            backgroundColor: "white",
          }}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            height: "100%",
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
            { useNativeDriver: true },
            () => {} // Optional async listener
          )}
          contentInsetAdjustmentBehavior="automatic"
        >
          <FlatList
            style={styles.spotsList}
            contentContainerStyle={styles.spotsListContainer}
            data={spots}
            renderItem={renderSpot}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </Animated.ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}

export default observer(Explore);

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
