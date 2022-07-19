import { StyleSheet, Text, View, FlatList } from 'react-native'
import { observer } from "mobx-react";
import spotStore from "../../stores/spotStore";
import reviewStore from "../../stores/reviewStore";
import ReviewItem from "./ReviewItem";
import React from 'react'

function ReviewList({ reviews, spotId }) {
    // const reviewList = reviews?.map(reviewID => reviewStore?.reviews?.find(review => reviewID === review?._id));
    // const arrangedReviewList = reviewList.reverse();
// console.log(reviewStore.reviews[27].spot)
    const reviewList = reviewStore.reviews.filter(review => review.spot === spotId);
    const arrangedReviewList = reviewList.reverse();
    console.log("reviewList: "+reviewList)
  function renderReview({ item: review }) {
    return <ReviewItem key={review?._id} review={review} />;
  }

  return (
    <View>
        <Text style={{ fontFamily: "Ubuntu", fontSize: 20, marginLeft: 28, marginTop: 20 }}>Reviews</Text>
        <FlatList
              style={styles.spotsList}
              contentContainerStyle={styles.spotsListContainer}
              data={arrangedReviewList}
              renderItem={renderReview}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
          />
    </View>
  )
}
export default observer(ReviewList);

const styles = StyleSheet.create({
    spotsList: {
        backgroundColor: "#fffffc",
        height: "100%",
        width: "100%",
      },
      spotsListContainer: {
        backgroundColor: "#fffffc",
      },
      descriptionTitle: {
        fontSize: 22,
        marginBottom: 10,
        fontFamily: "Ubuntu",
        
      },
})








  


