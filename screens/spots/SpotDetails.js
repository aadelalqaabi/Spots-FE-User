import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  LogBox,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import spotStore from "../../stores/spotStore";
import { baseURL } from "../../stores/instance";
import { Ionicons } from "@expo/vector-icons";
import authStore from "../../stores/authStore";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import ReadMore from "@fawazahmed/react-native-read-more";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import Toast from "react-native-toast-message";
import ReviewList from "../reviews/ReviewList";
import reviewStore from "../../stores/reviewStore";
//import "moment/locale/ar";
LogBox.ignoreAllLogs();

export function SpotDetails({ route }) {
  const spot = spotStore.getSpotsById(route.params.id);
  const [reviewText, setReviewText] = useState({
    stars: "",
    description: "",
  });
  const [numOfSrtars, setNumOfSrtars] = useState("0");

  const ratingCompleted = (rating) => {
    setNumOfSrtars(rating.toString());
  };

  const handleChange = (name, value) => {
    setReviewText({ ...reviewText, [name]: value });
  };

  const handleSubmit = () => {
    reviewStore.createReview(reviewText, numOfSrtars, spot?._id);
    Toast.show({
      type: "success",
      text1: "Review Added 👍",
    });
  };

  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);
  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const handleSpots = (spot) => {
    if (!authStore.user.spots.includes(spot._id)) {
      authStore.spotAdd(spot._id);
      Alert.alert("Added to your spots");
    } else {
      Alert.alert("Already in your spots");
    }
  };
  const handleBook = (spot) => {
    navigation.navigate("BookingDetails", {
      itemId: spot,
      quantity: quantity,
    });
  };
  let date = moment(spot.startDate).format("LL");
  let month = moment(spot.startDate).format("MMMM");
  let year = moment(spot.startDate).format("YYYY");
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons style={styles.back} name="arrow-back-outline"></Ionicons>
        </TouchableOpacity>
        <StatusBar barStyle="light-content" />
        <Image
          style={styles.image}
          source={{ uri: `${baseURL}${spot.image}` }}
        ></Image>

        <View style={styles.titlelocation}>
          <Text style={styles.mainTitle}>{spot.name}</Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => Linking.openURL(spot.location)}
          >
            <Ionicons style={styles.icon} name="navigate-circle"></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={styles.ownerContainer}>
          <Image
            style={styles.ownerthumb}
            source={{ uri: `${baseURL}${spot.organizer.image}` }}
          />
          <Text style={styles.ownername}>{spot.organizer.username}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: 15,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              style={{
                marginRight: 5,
                color: "#4831d4",
                fontSize: 30,
              }}
              name="calendar-outline"
            ></Ionicons>
            {spot.numOfDays === 1 ? (
              <Text style={{ fontFamily: "Ubuntu", fontSize: 20 }}>{date}</Text>
            ) : (
              <Text style={{ fontFamily: "Ubuntu", fontSize: 20 }}>
                {month}, {year}
              </Text>
            )}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              style={{ marginRight: 5, color: "#4831d4", fontSize: 30 }}
              name="time-outline"
            ></Ionicons>
            <Text style={{ fontFamily: "Ubuntu", fontSize: 20 }}>
              {spot.startTime}
            </Text>
          </View>
        </View>
        <View style={{ margin: 20, marginLeft: 30, marginTop: 10 }}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <ReadMore numberOfLines={3} style={styles.description}>
            {spot.description}
          </ReadMore>
        </View>
        <Text>Add A Review: </Text>
        <View>
          {/* <Text style={styles.heading}>Select Stars:-</Text> /}
          {/ <TextInput
            style={styles.input}
            label="Stars"
            onChangeText={(text) => {
              handleChange("stars", text);
            }}
            placeholder="How Many Stars"
          /> */}
          <Rating
            showRating
            startingValue={1}
            selectedColor="#4831d4"
            reviewColor="#4831d4"
            ratingBackgroundColor="#4831d4"
            // tintColor = "#4831d4"
            ratingTextColor="grey"
            unSelectedColor="grey"
            onFinishRating={ratingCompleted}
            style={{ paddingVertical: 10 }}
          />
          <Text style={styles.heading}>Enter Description:-</Text>
          <TextInput
            style={styles.inputDesc}
            multiline
            numberOfLines={4}
            label="Description"
            onChangeText={(text) => {
              handleChange("description", text);
            }}
            clearButtonMode="always"
          />
          <View style={styles.button}>
            <Button title="Add Review" color="white" onPress={handleSubmit} />
          </View>
        </View>
        {spot?.reviews.length !== 0 ? (
          <ReviewList reviews={spot?.reviews} spotId={spot?._id} />
        ) : (
          <Text>No Reviews Yet</Text>
        )}
      </ScrollView>

      {spot.isFree === true ? (
        <TouchableOpacity
          style={styles.spotthis}
          onPress={() => {
            handleSpots(spot);
          }}
        >
          <Text style={styles.spotext}>Spot this</Text>
          <Ionicons style={styles.spoticon} name="location"></Ionicons>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignSelf: "flex-start",
              borderRadius: 25,
              borderWidth: 1,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              padding: 10,
              borderColor: "#4831d4",
              width: "30%",
              alignSelf: "center",
              height: 60,
            }}
          >
            <Ionicons
              style={{
                color: "#4831d4",
                fontFamily: "Ubuntu",
                fontSize: 28,
                marginLeft: 10,
              }}
              name="add-outline"
              onPress={() => setQuantity(quantity + 1)}
            ></Ionicons>
            <Text style={{ fontSize: 28, fontFamily: "Ubuntu" }}>
              {quantity}
            </Text>
            <Ionicons
              style={{
                color: "#4831d4",
                fontFamily: "Ubuntu",
                fontSize: 28,
                marginRight: 10,
              }}
              name="remove-outline"
              onPress={() => quantity > 0 && setQuantity(quantity - 1)}
            ></Ionicons>
          </View>
          <TouchableOpacity
            style={styles.spotthisbook}
            onPress={() => {
              handleBook(spot);
            }}
          >
            <Text style={styles.spotext}>Book ({spot.price} KD)</Text>
            <Ionicons style={styles.spoticon} name="location"></Ionicons>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 500,
    zIndex: -1,
  },
  back: {
    position: "absolute",
    color: "white",
    zIndex: 99,
    marginTop: 70,
    marginLeft: 25,
    fontSize: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  spotext: {
    color: "white",
    fontSize: 22,
    alignSelf: "center",
    marginLeft: 10,
    fontFamily: "Ubuntu",
  },
  spoticon: {
    color: "white",
    fontSize: 30,
    alignSelf: "center",
    zIndex: 99,
  },
  spotthisbook: {
    display: "flex",
    alignSelf: "center",
    borderRadius: 25,
    height: 60,
    width: "60%",
    backgroundColor: "#4831d4",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    margin: 10,
    justifyContent: "center",
    zIndex: 99,
    flexDirection: "row-reverse",
  },
  spotthis: {
    display: "flex",
    alignSelf: "center",
    borderRadius: 25,
    height: 60,
    width: 380,
    backgroundColor: "#4831d4",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    margin: 10,
    justifyContent: "center",
    zIndex: 99,
    flexDirection: "row-reverse",
  },
  mainTitle: {
    fontSize: 40,
    margin: 10,
    marginLeft: 30,
    marginTop: 15,
    marginRight: 10,
    fontWeight: "700",
    fontFamily: "Ubuntu",
  },
  icon: {
    fontSize: 40,
    fontWeight: "700",
    color: "#4831d4",
    alignSelf: "center",
    paddingTop: 4,
  },
  titlelocation: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
  },
  ownerContainer: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 0,
  },
  ownerthumb: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    zIndex: -1,
    marginRight: 10,
  },
  ownername: {
    fontSize: 20,
    color: "black",
    fontFamily: "Ubuntu",
  },
  descriptionTitle: {
    fontSize: 22,
    marginBottom: 10,
    fontFamily: "Ubuntu",
  },
  description: {
    fontSize: 18,
    fontFamily: "Ubuntu",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  button: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#4831d4",
    width: 125,
    height: 40,
    marginLeft: 290,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputDesc: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  heading: {
    marginLeft: 12,
  },
});
