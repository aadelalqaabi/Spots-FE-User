import { StyleSheet, Text, View, Image, useColorScheme } from "react-native";
import Stars from "./Stars";
import { baseURL } from "../../stores/instance";
import moment from "moment";
import React from "react";

function ReviewItem({ review }) {
  let date = moment(review?.date).format("LL");
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        borderBottomColor: "rgba(178, 174, 174, 0.658)",
        borderBottomWidth: 0.4,
        borderBottomStyle: "solid",
        padding: 25,
        paddingBottom: 0,
      }}
    >
      <View style={styles.card}>
        <Image
          style={styles.reviewImage}
          source={{ uri: `${baseURL}${review?.user?.image}` }}
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
              marginBottom: 4,
              color: colorScheme === "light" ? "#1b1b1b" : "f1f1f1",
            }}
          >
            {review?.user?.username}
          </Text>
          <Text
            style={{
              fontSize: 16,
              margin: 0,
              marginBottom: 4,
              color: colorScheme === "light" ? "#1b1b1b" : "f1f1f1",
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
            color: "black",
            alignSelf: "flex-start",
            margin: 10,
            color: colorScheme === "light" ? "#1b1b1b" : "f1f1f1",
          }}
        >
          {review?.description}
        </Text>
      </View>
    </View>
  );
}
export default ReviewItem;

const styles = StyleSheet.create({
  reviewImage: {
    width: 50,
    height: 50,
    marginRight: 10,
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    textAlign: "center",
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
