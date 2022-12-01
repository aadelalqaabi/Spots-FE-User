import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  LogBox,
  Button,
  RefreshControl,
  TouchableOpacity,
  useColorScheme,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import spotStore from "../../stores/spotStore";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import { useNavigation, useScrollToTop } from "@react-navigation/native";
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
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
LogBox.ignoreAllLogs();

function ProfileSpotDetails({ route }) {
  const colorScheme = useColorScheme();
  const scrollViewRef = React.useRef(null);
  const scrollViewRef2 = React.useRef(null);
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const translations = {
    en: {
      explore: "Explore",
    },
    ar: {
      explore: "اكتشف",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
    rewardStore.fetchRewards();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    pointStore.fetchPoints();
    rewardStore.fetchRewards();
    offerStore.fetchOffers();
    reviewStore.fetchReviews();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);
  const spot = spotStore.getSpotsById(route.params.id);
  let point = pointStore.points.find(
    (point) => point?.user === authStore.user.id && point?.spot === spot?._id
  );
  const offers = offerStore.offers.filter((offer) => offer.spot === spot?._id);
  const rewards = rewardStore.rewards.filter(
    (offer) => offer.spot === spot?._id
  );
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
    toggleModal();
    Toast.show({
      type: "success",
      text1: "Review Added 👍",
    });
  };

  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
        <View
          style={{
            display: "flex",
            flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ zIndex: 99 }}
          >
            <Ionicons
              style={{
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                zIndex: 99,
                fontSize: 35,
                margin: 15,
              }}
              name={
                i18n.locale === "en-US"
                  ? "chevron-back-outline"
                  : "chevron-forward-outline"
              }
            ></Ionicons>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 26,
              alignSelf: "center",
              textAlign: "center",
              fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
              width: "70%",
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            }}
          >
            {i18n.locale === "en-US" ? spot.name : spot.nameAr}
          </Text>
          <Ionicons
            onPress={() => {
              navigation.navigate("Info", { spot: spot });
            }}
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              zIndex: 99,
              fontSize: 35,
              margin: 15,
            }}
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
                fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                padding: 15,
                width: "100%",
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                borderRadius: 500,
                marginBottom: i18n.locale === "en-US" ? 0 : -10,
                marginTop: i18n.locale === "en-US" ? 0 : -10,
              }}
              scroll
              duration={10000}
              bounce={false}
              repeatSpacer={0}
              shouldAnimateTreshold={40}
            >
              <FontAwesome name="bullhorn" size={22} color="#9279f7" />
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
            flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                fontSize: 20,
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                opacity: 0.8,
                textAlign: i18n.locale === "en-US" ? "left" : "right",
                marginBottom: i18n.locale === "en-US" ? 0 : -10,
                marginTop: i18n.locale === "en-US" ? 0 : -10,
              }}
            >
              {i18n.locale === "en-US" ? "My Points" : "نقاطي"}
            </Text>
            <Text
              style={{
                fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                fontSize: 40,
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                textAlign: i18n.locale === "en-US" ? "left" : "right",
                margin: 10,
                marginBottom: i18n.locale === "en-US" ? 20 : 0,
                marginTop: i18n.locale === "en-US" ? 15 : 0,
              }}
            >
              {point?.amount}
            </Text>
            <Text
              style={{
                fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                fontSize: 15,
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                opacity: 0.8,
                textAlign: i18n.locale === "en-US" ? "left" : "right",
                marginTop: i18n.locale === "en-US" ? 0 : -10,
              }}
            >
              {i18n.locale === "en-US"
                ? "Valid during spot's date only"
                : "صالح لمدة النقطة فقط"}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 120,
              height: 50,
              borderRadius: 10,
              borderColor: "#9279f7",
              borderWidth: 1,
              margin: 50,
              marginRight: 0,
              marginLeft: 0,
              marginBottom: 0,
              marginTop: 0,
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
              shadowOpacity: 0.2,
              shadowRadius: 10,
              shadowColor: "white",
              shadowOffset: {
                height: 0,
                width: 0,
              },
            }}
            onPress={() =>
              navigation.navigate("Scanner", { spot: spot, point: point })
            }
          >
            <Ionicons
              style={{
                fontSize: 25,
                zIndex: 99,
                color: "#9279f7",
              }}
              name="scan"
            ></Ionicons>

            <Text
              style={{
                color: "#9279f7",
                fontSize: 17,
                fontFamily: "Ubuntu",
                marginLeft: i18n.locale === "en-US" ? 10 : 0,
                marginRight: i18n.locale === "en-US" ? 0 : 10,
              }}
            >
              {i18n.locale === "en-US" ? "Scan QR" : "امسح Qr"}
            </Text>
          </TouchableOpacity>
        </View>
        {spot.rewards.length !== 0 ? (
          <>
            <Text
              style={{
                fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                fontSize: 20,
                marginLeft: 28,
                marginRight: 28,
                marginTop: 20,
                alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              }}
            >
              {i18n.locale === "en-US" ? "Rewards" : "المكافآت"}
            </Text>
            <ScrollView
              horizontal={true}
              style={{
                backgroundColor: "transparent",
                display: "flex",
              }}
              contentContainerStyle={{
                backgroundColor: "transparent",
                paddingRight: 30,
                paddingLeft: i18n.locale === "en-US" ? 10 : 30,
                display: "flex",
                flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
              }}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                i18n.locale === "en-US"
                  ? scrollViewRef.current.scrollTo({
                      x: 0,
                      y: 0,
                      animated: true,
                    })
                  : scrollViewRef.current.scrollToEnd({ animated: true })
              }
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              {rewards.map((reward) => (
                <RewardItem reward={reward} onRefresh={onRefresh} />
              ))}
            </ScrollView>
          </>
        ) : (
          <></>
        )}
        {spot.offers.length !== 0 ? (
          <>
            <Text
              style={{
                fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                fontSize: 20,
                marginLeft: 28,
                marginRight: 28,
                marginTop: 20,
                alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              }}
            >
              {i18n.locale === "en-US" ? "Offers" : "العروض"}
            </Text>
            <ScrollView
              horizontal={true}
              style={{
                backgroundColor: "transparent",
              }}
              contentContainerStyle={{
                backgroundColor: "transparent",
                paddingRight: 30,
                paddingLeft: i18n.locale === "en-US" ? 10 : 30,
                display: "flex",
                flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
              }}
              ref={scrollViewRef2}
              onContentSizeChange={() =>
                i18n.locale === "en-US"
                  ? scrollViewRef2.current.scrollTo({
                      x: 0,
                      y: 0,
                      animated: true,
                    })
                  : scrollViewRef2.current.scrollToEnd({ animated: true })
              }
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              {offers.map((offer) => (
                <OfferItem offer={offer} />
              ))}
            </ScrollView>
          </>
        ) : (
          <></>
        )}
        <View
          style={{
            display: "flex",
            flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            margin: 30,
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
              fontSize: 20,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            }}
          >
            {i18n.locale === "en-US" ? "Reviews" : "المراجعات"}
          </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text
              style={{
                fontFamily: "Ubuntu",
                fontSize: 19,
                borderWidth: 1,
                padding: 10,
                color: "#9279f7",
                borderColor: "#9279f7",
                borderRadius: 10,
              }}
            >
              {i18n.locale === "en-US" ? "Add Review" : "اضف مراجعة"}
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
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  borderRadius: 40,
                  height: "68%",
                  width: "105%",
                  display: "flex",
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    margin: 30,
                    marginBottom: i18n.locale === "en-US" ? 10 : -10,
                    marginTop: 0,
                    fontSize: 28,
                    fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                  }}
                >
                  {i18n.locale === "en-US" ? "Add Your Review" : "اضف مراجعتك"}
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
                      opacity: 0.9,
                      fontSize: 35,
                    }}
                    name="close-outline"
                  ></Ionicons>
                </TouchableOpacity>
                <Rating
                  startingValue={1}
                  selectedColor="#9279f7"
                  reviewColor="#9279f7"
                  ratingBackgroundColor="#9279f7"
                  ratingTextColor="grey"
                  unSelectedColor="grey"
                  onFinishRating={ratingCompleted}
                  style={{ margin: 20, marginBottom: 30, marginTop: 10 }}
                />
                <Text
                  style={{
                    fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                    fontSize: 20,
                    marginLeft: 28,
                    marginRight: 28,
                    margin: -16,
                    alignSelf:
                      i18n.locale === "en-US" ? "flex-start" : "flex-end",
                  }}
                >
                  {i18n.locale === "en-US" ? "Enter Description" : "اضف الوصف"}
                </Text>
                <TextInput
                  textInputStyle={{
                    height: 90,
                    width: "86%",
                    margin: 20,
                    paddingTop: 15,
                  }}
                  mainColor="#9279f7"
                  multiline
                  numberOfLines={4}
                  label="Description"
                  placeholder=""
                  onChangeText={(text) => {
                    handleChange("description", text);
                  }}
                  clearButtonMode="always"
                />
                <TouchableOpacity
                  style={{
                    borderRadius: 15,
                    elevation: 3,
                    backgroundColor: "#9279f7",
                    width: "86%",
                    height: 50,
                    alignSelf:
                      i18n.locale === "en-US" ? "flex-end" : "flex-start",
                    marginRight: 25,
                    marginLeft: 25,
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={handleSubmit}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      marginTop: i18n.locale === "en-US" ? 0 : -2,
                      fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                    }}
                  >
                    {i18n.locale === "en-US" ? "Submit" : "ارسال"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        {spot?.reviews.length !== 0 ? (
          <ReviewList reviews={spot?.reviews} spotId={spot?._id} />
        ) : (
          <Text
            style={{
              fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
              fontSize: 20,
              marginTop: 20,
              marginBottom: 80,
              alignSelf: "center",
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            }}
          >
            {i18n.locale === "en-US"
              ? " No Reviews Yet"
              : "لا يوجد مراجعات حتى الآن"}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
export default observer(ProfileSpotDetails);
const styles = StyleSheet.create({
  spotsList: {
    backgroundColor: "transparent",
  },
  spotsListContainer: {
    backgroundColor: "transparent",
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
    backgroundColor: "#9279f7",
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
    backgroundColor: "#9279f7",
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
    color: "#9279f7",
    fontSize: 17,
    fontFamily: "Ubuntu",
    marginLeft: 10,
  },
  icon: {
    fontSize: 40,
    fontWeight: "700",
    color: "#9279f7",
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
    backgroundColor: "#9279f7",
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
