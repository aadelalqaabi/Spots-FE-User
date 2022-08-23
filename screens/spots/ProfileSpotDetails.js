import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  LogBox,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import spotStore from "../../stores/spotStore";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
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
import pointStore from "../../stores/pointStore";
import authStore from "../../stores/authStore";
import Modal from "react-native-modal";
import { observer } from "mobx-react";
//import "moment/locale/ar";
LogBox.ignoreAllLogs();

function ProfileSpotDetails({ route }) {
  const spot = spotStore.getSpotsById(route.params.id);
  let point = pointStore.points.find(
    (point) => point?.user === authStore.user.id && point?.spot === spot?._id
  );
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
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: "white" }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.titlelocation}>
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.back}
          name="chevron-back-outline"
        ></Ionicons>
        <Text style={styles.mainTitle}>{spot.name}</Text>
        <Ionicons
          onPress={() => {
            navigation.navigate("Info");
          }}
          style={styles.back}
          name="information-outline"
        ></Ionicons>
      </View>
      {spot.announcement !== "" && (
        <View
          style={{
            width: "100%",
            alignSelf: "center",
            margin: 10,
            marginBottom: 0,
          }}
        >
          <TextTicker
            style={{
              fontSize: 20,
              fontFamily: "UbuntuBold",
              padding: 15,
              width: "100%",
              color: "black",
              borderRadius: 500,
              backgroundColor: "#f2f4f6",
            }}
            scroll
            duration={10000}
            bounce={false}
            repeatSpacer={0}
            shouldAnimateTreshold={40}
          >
            <FontAwesome name="bullhorn" size={22} color="#4831d4" />
            {"  "}
            {spot.announcement}
          </TextTicker>
        </View>
      )}
      <View
        style={{
          margin: 30,
          marginBottom: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Ubuntu",
              fontSize: 20,
              color: "grey",
            }}
          >
            Your Points
          </Text>
          <Text
            style={{
              fontFamily: "UbuntuBold",
              fontSize: 40,
              color: "black",
              margin: 10,
              marginLeft: 0,
              marginBottom: 20,
              marginTop: 15,
            }}
          >
            {point?.amount}
          </Text>
          <Text
            style={{
              fontFamily: "Ubuntu",
              fontSize: 15,

              color: "grey",
            }}
          >
            Valid during spot's date only
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 120,
            height: 50,
            borderRadius: 10,
            borderColor: "#4831d4",
            borderWidth: 1,
            margin: 50,
            marginRight: 0,
            marginBottom: 0,
            marginTop: 15,
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={() =>
            navigation.navigate("Scanner", { spot: spot, point: point })
          }
        >
          <Ionicons
            style={{
              fontSize: 25,
              zIndex: 99,
              color: "#4831d4",
            }}
            name="scan"
          ></Ionicons>

          <Text style={styles.scantext}>Scan QR</Text>
        </TouchableOpacity>
      </View>

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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          margin: 30,
          marginTop: 20,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "UbuntuBold",
            fontSize: 20,
          }}
        >
          Reviews
        </Text>
        <TouchableOpacity onPress={toggleModal}>
          <Text
            style={{
              fontFamily: "Ubuntu",
              fontSize: 19,
              borderWidth: 1,
              padding: 10,
              color: "#4831d4",
              borderColor: "#4831d4",
              borderRadius: 10,
            }}
          >
            Add Review
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={{ height: 450 }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 40,
                height: 450,
                width: 400,
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  margin: 30,
                  marginBottom: 10,
                  marginTop: 0,
                  fontSize: 30,
                  fontFamily: "UbuntuLight",
                }}
              >
                Add Your Review
              </Text>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  margin: 20,
                  marginTop: 15,
                }}
                onPress={toggleModal}
              >
                <Ionicons
                  style={{
                    color: "#aba9aa",
                    opacity: 0.8,
                    fontSize: 35,
                  }}
                  name="close-outline"
                ></Ionicons>
              </TouchableOpacity>
              <Rating
                showRating
                startingValue={1}
                selectedColor="#4831d4"
                reviewColor="#4831d4"
                ratingBackgroundColor="#4831d4"
                ratingTextColor="grey"
                unSelectedColor="grey"
                onFinishRating={ratingCompleted}
                style={{ margin: 20, marginBottom: 30, marginTop: 10 }}
              />
              <Text style={styles.heading}>Enter Description:</Text>
              <TextInput
                textInputStyle={{
                  height: 100,
                  width: 350,
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
          </View>
        </Modal>
      </View>

      {spot?.reviews.length !== 0 ? (
        <ReviewList reviews={spot?.reviews} spotId={spot?._id} />
      ) : (
        <Text
          style={{
            fontFamily: "Ubuntu",
            fontSize: 20,
            marginTop: 40,
            marginBottom: 40,
            alignSelf: "center",
          }}
        >
          No Reviews Yet
        </Text>
      )}
    </ScrollView>
  );
}
export default observer(ProfileSpotDetails);
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
    color: "black",
    zIndex: 99,
    fontSize: 35,
    margin: 15,
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
    fontSize: 26,
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Ubuntu",
    width: "50%",
  },
  scantext: {
    color: "#4831d4",
    fontSize: 17,
    fontFamily: "Ubuntu",
    marginLeft: 10,
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
    justifyContent: "space-between",
    marginTop: 50,
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
    alignSelf: "flex-end",
    marginRight: 25,
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
    alignSelf: "flex-start",
  },
});
