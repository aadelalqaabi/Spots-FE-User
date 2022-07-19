import { StyleSheet, Text, View, Image } from 'react-native';
import Stars from "./Stars";
import { baseURL } from "../../stores/instance";
import moment from 'moment';
import React from 'react'

function ReviewItem({ review }) {
    let date = moment(review?.date).format("LL")
  return (
    <View style={styles.card}>
      {/* <View style={styles.centerReview}> */}
      <View style={{display:"flex", justifyContent: "flex-start", alignContent:"center", flexDirection: "row", paddingTop: 10}}>
        <Image
        style={styles.reviewImage}
          source={{ uri: `${baseURL}${review?.user?.image}` }}
        />
        <Text style={styles.reviewName}>{review?.user?.username}</Text>
      </View>

      <Text style={styles.date}>{date}</Text>
      {/* <Text style={styles.date}>Jul 30, 2022</Text> */}
        <View>
            <Stars stars={review?.stars}/>
        </View>
        <Text style={styles.description}>{review?.description}</Text>
    </View>
  )
}
export default ReviewItem;

const styles = StyleSheet.create({
    reviewImage: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: "50%",
        shadowColor: "black",
        shadowOffset: {
        height: 0,
        width: 0,
        },
    },
    reviewName: {
        marginTop: 15,
        fontSize: 23
    },
    centerReview: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "center"
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowColor: 'black',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        elevation: 1,
        // marginVertical: 5,
        // marginRight: 8,
        // marginLeft: 8,
        margin: 20,
        marginBottom: 0,
        padding: 10
      },
      description: {
        marginTop: 8,
        fontSize: 19,
        marginLeft: 8,
        marginBottom: 8,
    },
    date: {
        marginTop: -30,
        marginBottom: 15,
        marginLeft: 68,
    },
})



