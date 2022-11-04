import { StyleSheet, Text, View, Image, useColorScheme } from "react-native";
import Stars from "./Stars";
import { baseURL } from "../../stores/instance";
import moment from "moment";
import React from "react";

function ReviewItem({ review }) {
  let date = moment(review?.date).format("LL");
  const colorScheme = useColorScheme();
  const reviewImage = review?.user?.image;
  return (
    <View>
      <View
        style={{
          width: "95%",
          paddingTop: 5,
          alignSelf: "center",
        }}
      >
        <View style={styles.card}>
          <Image
            style={styles.reviewImage}
            source={
              reviewImage !== ""
                ? { uri: baseURL + reviewImage }
                : require("../../assets/PP.jpeg")
            }
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                margin: 0,
                //marginBottom: 4,
                color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
              }}
            >
              {review?.user?.username}
            </Text>
            <Text
              style={{
                fontSize: 14,
                margin: 0,
                marginBottom: 4,
                color: "grey",
              }}
            >
              {date}
            </Text>
          </View>
        </View>
        <View style={{ padding: 5 }}>
          <Stars stars={review?.stars} />
          <Text
            style={{
              fontSize: 20,
              alignSelf: "flex-start",
              margin: 10,
              color: colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b",
            }}
          >
            {review?.description}
          </Text>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}></View>
    </View>
  );
}
export default ReviewItem;

const styles = StyleSheet.create({
  reviewImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: 8,
    borderRadius: "50%",
    objectFit: "cover",
  },
  reviewName: {
    fontSize: 16,
    margin: 0,
    marginBottom: 4,
  },
  centerReview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "center",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    textAlign: "center",
    alignContent: "center",
  },
  description: {
    fontSize: 20,
    color: "black",
    alignSelf: "flex-start",
    margin: 10,
  },
  date: {
    marginTop: -30,
    marginBottom: 15,
    marginLeft: 68,
  },
});
