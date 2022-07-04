import React, { useState } from "react";
import {
  Text,
  View,
  Animated,
  SafeAreaView,
  StatusBar,
  LogBox,
  FlatList,
} from "react-native";
import SearchComponent from "../searchBar/SearchComponent";
LogBox.ignoreAllLogs(true);

export default function Explore() {
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

  return (
    <Animated.View style={{ backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <SearchComponent clampedScroll={clampedScroll} />
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            margin: 20,
            backgroundColor: "white",
            paddingTop: 55,
          }}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
            { useNativeDriver: true },
            () => {} // Optional async listener
          )}
          contentInsetAdjustmentBehavior="automatic"
        >
          <Text style={{ margin: 3000 }}>fneknfenfonef</Text>
        </Animated.ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}
