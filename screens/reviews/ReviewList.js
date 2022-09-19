import { StyleSheet, Text, View, FlatList } from "react-native";
import { observer } from "mobx-react";
import spotStore from "../../stores/spotStore";
import reviewStore from "../../stores/reviewStore";
import ReviewItem from "./ReviewItem";
import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

function ReviewList({ reviews, spotId }) {
  const reviewList = reviewStore.reviews.filter(
    (review) => review.spot === spotId
  );
  const arrangedReviewList = reviewList.reverse();
  function renderReview({ item: review }) {
    return <ReviewItem key={review?._id} review={review} />;
  }
  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View>
      <FlatList
        style={styles.spotsList}
        contentContainerStyle={styles.spotsListContainer}
        data={arrangedReviewList}
        renderItem={renderReview}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
export default observer(ReviewList);

const styles = StyleSheet.create({
  spotsList: {
    backgroundColor: "transparent",
  },
  spotsListContainer: {
    backgroundColor: "transparent",
  },
  descriptionTitle: {
    fontSize: 22,
    marginBottom: 10,
    fontFamily: "Ubuntu",
  },
});
