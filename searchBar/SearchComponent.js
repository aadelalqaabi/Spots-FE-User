import { View } from "native-base";
import React from "react";
import {
  Animated,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

const SearchComponent = (props) => {
  const { clampedScroll } = props;
  const searchBarTranslate = clampedScroll.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -250],
    extrapolate: "clamp",
  });
  const searchBarOpacity = clampedScroll.interpolate({
    inputRange: [0, 10],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: searchBarTranslate,
            },
          ],
          opacity: searchBarOpacity,
        },
      ]}
    >
      <TextInput
        placeholder="Search"
        style={styles.formField}
        placeholderTextColor={"#888888"}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "90%",
    top: 65,
    left: 20,
    alignSelf: "center",
    zIndex: 99,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: 13,
    elevation: 3,
  },
  formField: {
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 13,
    fontSize: 18,
    height: 50,
  },
});

export default SearchComponent;
