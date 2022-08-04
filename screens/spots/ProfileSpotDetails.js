import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  LogBox,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import spotStore from "../../stores/spotStore";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import Toast from "react-native-toast-message";
import ReviewList from "../reviews/ReviewList";
import reviewStore from "../../stores/reviewStore";
import offerStore from "../../stores/offerStore";
import TextInput from "react-native-text-input-interactive";
import OfferItem from "../offers/OfferItem";
import RewardItem from "../rewards/RewardItem";
import TextTicker from "react-native-text-ticker";
import rewardStore from "../../stores/rewardStore";
import { LinearGradient } from "expo-linear-gradient";
import { baseURL } from "../../stores/instance";
import pointStore from "../../stores/pointStore";
import authStore from "../../stores/authStore";
//import "moment/locale/ar";
LogBox.ignoreAllLogs();

export function ProfileSpotDetails({ route }) {
  const points = route.params.points;
  const spot = spotStore.getSpotsById(route.params.id);
  const point = pointStore.points.find(
    (point) => point?.user === authStore.user.id && point?.spot === spot?._id
  );
  if (points > 0) pointStore.updatePoint(point.amount + points, point?._id);
  const offers = offerStore.offers.filter((offer) => offer.spot === spot?._id);
  const rewards = rewardStore.rewards.filter(
    (offer) => offer.spot === spot?._id
  );
  function renderOffer({ item: offer }) {
    return <OfferItem offer={offer} />;
  }
  function renderReward({ item: reward }) {
    return <RewardItem reward={reward} />;
  }

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
  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.back}
          name="chevron-back-outline"
        ></Ionicons>

        <StatusBar barStyle="dark-content" />

        <View style={styles.titlelocation}>
          <Text style={styles.mainTitle}>Welcome to {spot.name}</Text>
        </View>
        <View
          style={{
            // backgroundColor: "#4831d4",
            width: "100%",
            margin: 10,
            alignSelf: "center",
          }}
        >
          <TextTicker
            style={{
              fontSize: 24,
              fontFamily: "Ubuntu",
              padding: 20,
              width: "100%",
              color: "black",
              borderRadius: 500,
            }}
            scroll
            duration={10000}
            bounce={false}
            repeatSpacer={0}
            shouldAnimateTreshold={40}
          >
            {spot.announcement}
          </TextTicker>
        </View>

        <LinearGradient
          colors={["#4831d4", "#2d3f6f"]}
          style={{
            opacity: 0.95,
            margin: 20,
            marginTop: 5,
            backgroundColor: "#434548",
            height: 240,
            width: "90%",
            borderRadius: 20,
            alignSelf: "center",
            zIndex: -1,
            display: "flex",
            flexDirection: "column",
            alignContent: "flex-start",
            paddingTop: 55,
            padding: 40,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",

              position: "absolute",
              marginLeft: 300,
              marginTop: 40,

              height: "120%",
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                marginBottom: 65,
              }}
              source={{ uri: `${baseURL}${authStore.user.image}` }}
            />

            <Ionicons
              style={{
                borderRadius: "50%",
                color: "white",
                fontSize: 55,
              }}
              name="scan-circle"
              onPress={() => navigation.navigate("Scanner", { spot: spot })}
            ></Ionicons>
          </View>
          <Text
            style={{
              fontFamily: "Ubuntu",
              fontSize: 24,
              color: "white",
            }}
          >
            Your Points
          </Text>
          <Text
            style={{
              fontFamily: "UbuntuBold",
              fontSize: 35,
              marginTop: 25,
              color: "white",
            }}
          >
            {point.amount}
          </Text>
          <Text
            style={{
              fontFamily: "Ubuntu",
              fontSize: 15,
              marginTop: 30,
              color: "white",
            }}
          >
            Valid during spot's date only
          </Text>
        </LinearGradient>
        <Text
          style={{
            fontFamily: "UbuntuBold",
            fontSize: 20,
            marginLeft: 28,
            marginTop: 20,
          }}
        >
          Rewards
        </Text>
        <FlatList
          horizontal={true}
          style={styles.spotsList}
          contentContainerStyle={styles.spotsListContainer}
          data={rewards}
          renderItem={renderReward}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        <Text
          style={{
            fontFamily: "UbuntuBold",
            fontSize: 20,
            marginLeft: 28,
            marginTop: 20,
          }}
        >
          Offers
        </Text>

        <FlatList
          horizontal={true}
          style={styles.spotsList}
          contentContainerStyle={styles.spotsListContainer}
          data={offers}
          renderItem={renderOffer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />

        <Text
          style={{
            fontFamily: "Ubuntu",
            fontSize: 20,
            marginLeft: 28,
            marginTop: 20,
          }}
        >
          Add A Review:
        </Text>
        <View>
          <Rating
            showRating
            startingValue={1}
            selectedColor="#4831d4"
            reviewColor="#4831d4"
            ratingBackgroundColor="#4831d4"
            ratingTextColor="grey"
            unSelectedColor="grey"
            onFinishRating={ratingCompleted}
            style={{ margin: 20 }}
          />
          <Text style={styles.heading}>Enter Description:</Text>
          <TextInput
            textInputStyle={{
              height: 100,
              margin: 20,
              paddingTop: 15,
            }}
            mainColor="#4831d4"
            multiline
            numberOfLines={4}
            label="Description"
            placeholder="Description"
            onChangeText={(text) => {
              handleChange("description", text);
            }}
            clearButtonMode="always"
          />
          <View style={styles.button}>
            <Button title="Submit" color="white" onPress={handleSubmit} />
          </View>
        </View>
        {spot?.reviews.length !== 0 ? (
          <ReviewList reviews={spot?.reviews} spotId={spot?._id} />
        ) : (
          <Text
            style={{
              fontFamily: "Ubuntu",
              fontSize: 20,
              marginTop: 40,
              alignSelf: "center",
            }}
          >
            No Reviews Yet
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  spotsList: {
    backgroundColor: "#fffffc",
    height: "100%",
    width: "100%",
  },
  spotsListContainer: {
    backgroundColor: "#fffffc",
    paddingRight: 40,
  },
  image: {
    width: "100%",
    height: 500,
    zIndex: -1,
  },
  back: {
    position: "absolute",
    color: "black",
    zIndex: 99,
    marginTop: 70,
    marginLeft: 25,
    fontSize: 35,
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
    fontSize: 30,
    margin: 66,
    marginBottom: 10,
    marginTop: 70,
    alignSelf: "center",
    fontFamily: "Ubuntu",
  },
  icon: {
    fontSize: 40,
    fontWeight: "700",
    color: "#4831d4",
    alignSelf: "center",
    paddingTop: 4,
  },
  scanIcon: {
    position: "absolute",
    fontSize: 60,
    fontWeight: "700",
    color: "white",
  },
  titlelocation: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
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
    marginLeft: 280,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputDesc: {
    height: 100,
    margin: 20,
    borderWidth: 0.3,
    borderColor: "grey",
    padding: 10,
    borderRadius: 8,

    fontSize: 17,
  },
  heading: {
    marginLeft: 12,
    fontFamily: "Ubuntu",
    fontSize: 20,
    marginLeft: 28,
  },
});
