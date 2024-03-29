import {
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  useColorScheme,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import spotStore from "../../stores/spotStore";
import { Ionicons } from "@expo/vector-icons";
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
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import Swiper from "react-native-swiper";
import { baseURL } from "../../stores/instance";

function ProfileSpotDetails({ route }) {
  const colorScheme = useColorScheme();
  const scrollViewRef = React.useRef(null);
  const scrollViewRef2 = React.useRef(null);
  const ref = React.useRef(null);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  useScrollToTop(ref);
  const translations = {
    en: {
      explore: "Explore",
    },
    ar: {
      explore: "اكتشف",
    },
  };

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: translations,
    lng: Localization.locale,
    fallbackLng: true,
    interpolation: {
      escapeValue: false,
    },
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await pointStore.fetchPoints();
        await rewardStore.fetchRewards();
        await offerStore.fetchOffers();
        await reviewStore.fetchReviews();
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    pointStore.fetchPoints();
    rewardStore.fetchRewards();
    offerStore.fetchOffers();
    reviewStore.fetchReviews();
    spotStore.fetchSpots();
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
      text1: "Review Added",
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
    return null;
  }
  return (
    <SafeAreaView style={{ paddingBottom: 20 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar
          backgroundColor={colorScheme === "dark" ? "#000000" : "#f1f1f1"}
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
        <View
          style={{
            display: "flex",
            flexDirection:
              i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: 5,
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
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                zIndex: 99,
                fontSize: 32,
                margin: 15,
              }}
              name={
                i18n.language.split("-")[0] === "en"
                  ? "chevron-back-outline"
                  : "chevron-forward-outline"
              }
            ></Ionicons>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 24,
              alignSelf: "center",
              textAlign: "center",
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              width: "70%",
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
            }}
          >
            {i18n.language.split("-")[0] === "en" ? spot.name : spot.nameAr}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Info", { spot: spot });
            }}
          >
            <Ionicons
              style={{
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                zIndex: 99,
                fontSize: 32,
                margin: 15,
              }}
              name="information-outline"
            ></Ionicons>
          </TouchableOpacity>
        </View>
        {spot.announcementEn && spot.announcementAr && (
          <View
            style={{
              width: "100%",
              alignSelf: "center",
              backgroundColor: colorScheme === "light" ? "#000" : "#fff",
            }}
          >
            <TextTicker
              style={{
                fontSize: 20,
                padding: 15,
                width: "100%",
                fontWeight: "600",
                color: colorScheme === "dark" ? "#000000" : "#f1f1f1",
                fontFamily:
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
              }}
              scroll
              duration={10000}
              bounce={false}
              repeatSpacer={0}
              shouldAnimateTreshold={40}
              isRTL={i18n.language.split("-")[0] === "en" ? false : true}
            >
              {i18n.language.split("-")[0] === "en"
                ? spot.announcementEn
                : spot.announcementAr}
            </TextTicker>
          </View>
        )}
        {spot.adImage0 !== "" ||
        spot.adImage1 !== "" ||
        spot.adImage2 !== "" ||
        spot.adImage3 !== "" ||
        spot.adImage4 !== "" ? (
          <View
            style={{
              height: 250,
              marginBottom: -5,
            }}
          >
            <Swiper
              height={240}
              showsButtons={false}
              activeDotStyle={{ opacity: 0 }}
              dotStyle={{ opacity: 0 }}
              autoplay
            >
              {spot.adImage0 && (
                <View style={styles.slide}>
                  <Image
                    style={{
                      flex: 1,
                      width: "100%",
                    }}
                    source={{ uri: `${baseURL}${spot.adImage0}` }}
                    loadingIndicatorSource={require("../../assets/Loading.gif")}
                    onLoad={() => setIsImageLoading(false)}
                  />
                  {isImageLoading === true && (
                    <Image
                      style={{ width: 80, height: 80, position: "absolute" }}
                      source={require("../../assets/Loading.gif")}
                    />
                  )}
                </View>
              )}
              {spot.adImage1 && (
                <View style={styles.slide}>
                  <Image
                    style={{
                      flex: 1,
                      width: "100%",
                    }}
                    source={{ uri: `${baseURL}${spot.adImage1}` }}
                    onLoad={() => setIsImageLoading(false)}
                    loadingIndicatorSource={require("../../assets/Loading.gif")}
                  />
                  {isImageLoading === true && (
                    <Image
                      style={{ width: 80, height: 80, position: "absolute" }}
                      source={require("../../assets/Loading.gif")}
                    />
                  )}
                </View>
              )}
              {spot.adImage2 && (
                <View style={styles.slide}>
                  <Image
                    style={{
                      flex: 1,
                      width: "100%",
                    }}
                    source={{ uri: `${baseURL}${spot.adImage2}` }}
                    onLoad={() => setIsImageLoading(false)}
                    loadingIndicatorSource={require("../../assets/Loading.gif")}
                  />
                  {isImageLoading === true && (
                    <Image
                      style={{ width: 80, height: 80, position: "absolute" }}
                      source={require("../../assets/Loading.gif")}
                    />
                  )}
                </View>
              )}
              {spot.adImage3 && (
                <View style={styles.slide}>
                  <Image
                    style={{
                      flex: 1,
                      width: "100%",
                    }}
                    source={{ uri: `${baseURL}${spot.adImage3}` }}
                    onLoad={() => setIsImageLoading(false)}
                    loadingIndicatorSource={require("../../assets/Loading.gif")}
                  />
                  {isImageLoading === true && (
                    <Image
                      style={{ width: 80, height: 80, position: "absolute" }}
                      source={require("../../assets/Loading.gif")}
                    />
                  )}
                </View>
              )}
              {spot.adImage4 && (
                <View style={styles.slide}>
                  <Image
                    style={{
                      flex: 1,
                      width: "100%",
                    }}
                    source={{ uri: `${baseURL}${spot.adImage4}` }}
                    onLoad={() => setIsImageLoading(false)}
                    loadingIndicatorSource={require("../../assets/Loading.gif")}
                  />
                  {isImageLoading === true && (
                    <Image
                      style={{ width: 80, height: 80, position: "absolute" }}
                      source={require("../../assets/Loading.gif")}
                    />
                  )}
                </View>
              )}
            </Swiper>
          </View>
        ) : (
          <></>
        )}
        {rewards.length > 0 && (
          <>
            <View
              style={{
                margin: 30,
                marginBottom: 10,
                display: "flex",
                flexDirection:
                  i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily:
                      i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                    fontSize: 20,
                    color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                    opacity: 0.8,
                    textAlign:
                      i18n.language.split("-")[0] === "en" ? "left" : "right",
                    marginBottom:
                      i18n.language.split("-")[0] === "en" ? 0 : -10,
                    marginTop: i18n.language.split("-")[0] === "en" ? 0 : -10,
                  }}
                >
                  {i18n.language.split("-")[0] === "en" ? "My Points" : "نقاطي"}
                </Text>
                <Text
                  style={{
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 40,
                    color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                    textAlign:
                      i18n.language.split("-")[0] === "en" ? "left" : "right",
                    marginBottom: i18n.language.split("-")[0] === "en" ? 20 : 0,
                    marginTop: i18n.language.split("-")[0] === "en" ? 15 : 0,
                  }}
                >
                  {point?.amount}
                </Text>
                <Text
                  style={{
                    fontFamily:
                      i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                    fontSize: 15,
                    color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                    opacity: 0.8,
                    textAlign:
                      i18n.language.split("-")[0] === "en" ? "left" : "right",
                    marginTop: i18n.language.split("-")[0] === "en" ? 0 : -10,
                  }}
                >
                  {i18n.language.split("-")[0] === "en"
                    ? "Valid during Dest's date only"
                    : "صالح لمدة صلاحية هذه الوجهه فقط"}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  width: 120,
                  height: 50,
                  borderRadius: 10,
                  borderColor: "#e52b51",
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
                  flexDirection:
                    i18n.language.split("-")[0] === "en"
                      ? "row"
                      : "row-reverse",
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
                    color: "#e52b51",
                  }}
                  name="scan"
                ></Ionicons>

                <Text
                  style={{
                    color: "#e52b51",
                    fontSize: 17,
                    fontFamily: "Ubuntu",
                    marginLeft: i18n.language.split("-")[0] === "en" ? 10 : 0,
                    marginRight: i18n.language.split("-")[0] === "en" ? 0 : 10,
                  }}
                >
                  {i18n.language.split("-")[0] === "en" ? "Scan QR" : "امسح Qr"}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection:
                  i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 28,
                paddingBottom: 0,
                paddingTop: 0,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontFamily:
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 20,
                  color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                }}
              >
                {i18n.language.split("-")[0] === "en" ? "Rewards" : "المكافآت"}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RewardsTerms", { spot: spot })
                }
              >
                <Ionicons
                  style={{
                    fontSize: 25,
                    zIndex: 99,
                    color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                  }}
                  name="information-circle"
                ></Ionicons>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              style={{
                backgroundColor: "transparent",
                display: "flex",
              }}
              contentContainerStyle={{
                backgroundColor: "transparent",
                paddingRight: 30,
                paddingLeft: i18n.language.split("-")[0] === "en" ? 10 : 30,
                display: "flex",
                flexDirection:
                  i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
              }}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                i18n.language.split("-")[0] === "en"
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
        )}
        {offers.length > 0 ? (
          <>
            <View
              style={{
                display: "flex",
                flexDirection:
                  i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 28,
                paddingBottom: 0,
                paddingTop: 0,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontFamily:
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 20,
                  color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                }}
              >
                {i18n.language.split("-")[0] === "en" ? "Offers" : "العروض"}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("OffersTerms", { spot: spot })
                }
              >
                <Ionicons
                  style={{
                    fontSize: 25,
                    zIndex: 99,
                    color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                  }}
                  name="information-circle"
                ></Ionicons>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              style={{
                backgroundColor: "transparent",
              }}
              contentContainerStyle={{
                backgroundColor: "transparent",
                paddingRight: 30,
                paddingLeft: i18n.language.split("-")[0] === "en" ? 10 : 30,
                display: "flex",
                flexDirection:
                  i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
              }}
              ref={scrollViewRef2}
              onContentSizeChange={() =>
                i18n.language.split("-")[0] === "en"
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
            flexDirection:
              i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            margin: 30,
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              fontSize: 20,
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
            }}
          >
            {i18n.language.split("-")[0] === "en" ? "Reviews" : "التقييمات"}
          </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text
              style={{
                fontFamily: "Ubuntu",
                fontSize: 19,
                borderWidth: 1,
                padding: 10,
                color: "#e52b51",
                borderColor: "#e52b51",
                borderRadius: 10,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Add Review"
                : "اضف تقييم"}
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
                    marginBottom:
                      i18n.language.split("-")[0] === "en" ? 10 : -10,
                    marginTop: 0,
                    fontSize: 28,
                    fontFamily:
                      i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  }}
                >
                  {i18n.language.split("-")[0] === "en"
                    ? "Add Your Review"
                    : "اضف تقييمك"}
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
                      color: "black",
                      opacity: 0.5,
                      fontSize: 35,
                    }}
                    name="close-outline"
                  ></Ionicons>
                </TouchableOpacity>
                <Rating
                  startingValue={1}
                  selectedColor="#e52b51"
                  reviewColor="#e52b51"
                  ratingBackgroundColor="#e52b51"
                  ratingTextColor="grey"
                  unSelectedColor="grey"
                  onFinishRating={ratingCompleted}
                  starContainerStyle={{
                    margin: 100,
                    justifyContent: "space-evenly",
                  }}
                  style={{
                    margin: 20,
                    marginBottom: 30,
                    marginTop: 10,
                  }}
                />
                <Text
                  style={{
                    fontFamily:
                      i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                    fontSize: 20,
                    marginLeft: 28,
                    marginRight: 28,
                    margin: -16,
                    alignSelf:
                      i18n.language.split("-")[0] === "en"
                        ? "flex-start"
                        : "flex-end",
                  }}
                >
                  {i18n.language.split("-")[0] === "en"
                    ? "Enter Description"
                    : "اكتب الوصف"}
                </Text>
                <TextInput
                  textInputStyle={{
                    height: 90,
                    width: "86%",
                    margin: 20,
                    paddingTop: 15,
                  }}
                  mainColor="#e52b51"
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
                    backgroundColor: "#e52b51",
                    width: "86%",
                    height: 50,
                    alignSelf:
                      i18n.language.split("-")[0] === "en"
                        ? "flex-end"
                        : "flex-start",
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
                      marginTop: i18n.language.split("-")[0] === "en" ? 0 : -2,
                      fontFamily:
                        i18n.language.split("-")[0] === "en"
                          ? "Ubuntu"
                          : "Noto",
                    }}
                  >
                    {i18n.language.split("-")[0] === "en" ? "Submit" : "ارسال"}
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
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              fontSize: 20,
              marginTop: 20,
              marginBottom: 80,
              alignSelf: "center",
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? " No Reviews Yet"
              : "لا يوجد تقييمات حتى الآن"}
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
    backgroundColor: "#e52b51",
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
    backgroundColor: "#e52b51",
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
    color: "#e52b51",
    fontSize: 17,
    fontFamily: "Ubuntu",
    marginLeft: 10,
  },
  icon: {
    fontSize: 40,
    fontWeight: "700",
    color: "#e52b51",
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
    borderRadius: 50,
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
    backgroundColor: "#e52b51",
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
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
