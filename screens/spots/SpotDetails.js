import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Share,
  useColorScheme,
  Dimensions,
  ScrollView,
  LayoutAnimation,
  StatusBar,
  ActivityIndicator,
} from "react-native";
const { width } = Dimensions.get("window");
import React, { useCallback, useState } from "react";
import spotStore from "../../stores/spotStore";
import { baseURL } from "../../stores/instance";
import { Ionicons } from "@expo/vector-icons";
import authStore from "../../stores/authStore";
import { useFonts } from "expo-font";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import organizerStore from "../../stores/organizerStore";
import ticketStore from "../../stores/ticketStore";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import "moment/locale/ar";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import Swiper from "react-native-swiper";
import * as StoreReview from "expo-store-review";

export function SpotDetails({ route }) {
  const spot = spotStore.getSpotsById(route.params.id);
  let dateEn = moment(spot?.startDate).locale("en").format("LL");
  let dateAr = moment(spot?.startDate).locale("ar").format("LL");

  let dateendEn = moment(spot?.endDate).locale("en").format("LL");
  let dateendAr = moment(spot?.endDate).locale("ar").format("LL");

  const translations = {
    en: {
      more: "More Info",
      Loading: "Processing Request...",
      Visit: "Visit Dest",
      ALE: "Already in your tickets",
    },
    ar: {
      more: "التفاصيل",
      Loading: "جاري معالجة الطلب...",
      Visit: "زيارة الوجهة",
      ALE: "موجودة في تذاكرك",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  const [newTicket, setNewTicket] = useState({
    amount: 0,
    image: "",
    isFree: true,
    locale: i18n.locale,
    startDateAr: dateAr,
    startDateEn: dateEn,
    endDateAr: dateendAr,
    endDateEn: dateendEn,
  });
  const [visible, setVisible] = useState(false);
  const toggleAlert = useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const toggleAlreadyExist = useCallback(() => {
    setAlreadyExist(!alreadyExist);
  }, [alreadyExist]);
  const organizer = organizerStore.getOrganizerById(spot.organizer);
  const reviewCount = spot.reviews.length;
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);
  const [checkSeats, setCheckSeats] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // const toggleIsLoading = useCallback(() => {
  //   setIsLoading(!isLoading);
  // }, [isLoading]);
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Cabin: require("../../assets/fonts/Cabin.ttf"),
    CabinMedium: require("../../assets/fonts/CabinMedium.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }
  const handleInc = () => {
    setCheckSeats(checkSeats + 1);
    if (spot.seatsRemaining >= checkSeats + 1) {
      setQuantity(quantity + 1);
      setCheckSeats(quantity + 1);
    } else {
      i18n.locale === "en-US" || i18n.locale === "en"
        ? Alert.alert("You exceeded the available amount of seats", "", ["ok"])
        : Alert.alert("لقد تجاوزت عدد المقاعد المتوفرة", "", [
            { text: "حَسَنًا" },
          ]);
    }
  };

  const handleDec = () => {
    setCheckSeats(checkSeats + 1);
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setCheckSeats(quantity - 1);
    }
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          i18n.locale === "en-US" || i18n.locale === "en"
            ? `${authStore.user.name} wants you to check this destination`
            : `يريد ${authStore.user.name} ان يشاركك هذه الوجهه`,
        url: `https://www.destkw.com/SpotDetails/${spot._id}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const handleSpots = async (newSpot) => {
    setIsLoading(true);
    const found = ticketStore.tickets.some(
      (ticket) =>
        ticket.spot?._id === newSpot._id && ticket.user === authStore.user.id
    );
    if (!found) {
      await ticketStore.createTicket(newTicket, newSpot._id);
      await ticketStore.fetchTickets();
      toggleAlert();
      setIsLoading(false);
    } else {
      toggleAlreadyExist();
    }
  };
  const handleBook = (spot) => {
    navigation.navigate("BookingDetails", {
      itemId: spot,
      quantity: quantity,
    });
  };
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View
        style={{
          display: "flex",
          flexDirection:
            i18n.locale === "en-US" || i18n.locale === "en"
              ? "row"
              : "row-reverse",
          justifyContent: "space-between",
          padding: 20,
          marginTop: "10%",
          zIndex: 99,
          width: "100%",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "row"
                : "row-reverse",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              style={{
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                fontSize: 30,
              }}
              name={
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "chevron-back-outline"
                  : "chevron-forward-outline"
              }
            ></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Organizer", {
                organizer: organizer,
              })
            }
            style={{
              display: "flex",
              flexDirection:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "row"
                  : "row-reverse",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                resizeMode: "cover",
                marginRight: 10,
                marginLeft: 10,
              }}
              source={{ uri: `${baseURL}${organizer.image}` }}
            />
            <Text
              style={{
                fontSize: 20,
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                alignSelf: "center",
                textAlign:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "left"
                    : "right",
                textTransform: "capitalize",
                width: "60%",
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
                ? organizer?.displayNameEn
                : organizer?.displayNameAr}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            onShare();
          }}
        >
          <Ionicons
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              marginTop: -4,
              fontSize: 29,
            }}
            name="share-outline"
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
        }}
        showsVerticalScrollIndicator={false}
      >
        {spot.galleryImage0 !== "" ||
        spot.galleryImage1 !== "" ||
        spot.galleryImage2 !== "" ||
        spot.galleryImage3 !== "" ||
        spot.galleryImage4 !== "" ? (
          <View
            style={{
              height: 330,
            }}
          >
            <Swiper
              height={330}
              showsButtons={false}
              activeDotColor={"#e52b51"}
              activeDotStyle={{ opacity: 0.8 }}
              dotColor={"white"}
              dotStyle={{ opacity: 0.8 }}
            >
              {spot.galleryImage0 && (
                <View style={styles.slide}>
                  <Image
                    style={{
                      flex: 1,
                      width: "100%",
                    }}
                    source={{ uri: `${baseURL}${spot.galleryImage0}` }}
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
              {spot.galleryImage1 && (
                <View style={styles.slide}>
                  <Image
                    style={{
                      flex: 1,
                      width: "100%",
                    }}
                    source={{ uri: `${baseURL}${spot.galleryImage1}` }}
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
              {spot.galleryImage2 && (
                <View style={styles.slide}>
                  <Image
                    style={{
                      flex: 1,
                      width: "100%",
                    }}
                    source={{ uri: `${baseURL}${spot.galleryImage2}` }}
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
              {spot.galleryImage3 && (
                <View style={styles.slide}>
                  <Image
                    style={{
                      flex: 1,
                      width: "100%",
                    }}
                    source={{ uri: `${baseURL}${spot.galleryImage3}` }}
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
              {spot.galleryImage4 && (
                <View style={styles.slide}>
                  <Image
                    style={{
                      flex: 1,
                      width: "100%",
                    }}
                    source={{ uri: `${baseURL}${spot.galleryImage4}` }}
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
        <View
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
            display: "flex",
            flexDirection: "column",
            marginBottom: 20,
            paddingTop: "2%",
          }}
        >
          <Text
            style={{
              fontSize: 27,
              fontWeight: "700",
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              textAlign:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "left"
                  : "right",
              alignSelf:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "flex-start"
                  : "flex-end",
              margin: 20,
              marginTop:
                i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 0,
              marginBottom:
                i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 5,
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? spot.name
              : spot.nameAr}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              alignSelf:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "flex-start"
                  : "flex-end",
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              textAlign:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "left"
                  : "right",
              margin: 20,
              lineHeight: 30,
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? spot.description
              : spot.descriptionAr}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "row"
                  : "row-reverse",
              alignContent: "center",
              alignItems: "center",
              margin: 15,
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <Ionicons
              style={{
                marginRight:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 5,
                marginLeft:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 5 : 10,
                color: "#e52b51",
                fontSize: 30,
              }}
              name="calendar-outline"
            ></Ionicons>

            <Text
              style={{
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                fontSize: 20,
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
                ? dateEn
                : dateAr}
            </Text>
            {spot.isMultiple && (
              <Text
                style={{
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 20,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
              >
                {" "}
                -{" "}
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? dateendEn
                  : dateendAr}
              </Text>
            )}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "row"
                  : "row-reverse",
              alignContent: "center",
              alignItems: "center",
              margin: 15,
              marginBottom: 10,
              marginTop: 0,
            }}
          >
            <Ionicons
              style={{
                marginRight:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 5,
                marginLeft:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 5 : 10,
                color: "#e52b51",
                fontSize: 32,
              }}
              name="time-outline"
            ></Ionicons>
            <Text
              style={{
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                fontSize: 20,
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
                ? spot.endTime
                  ? `${spot.startTime} - ${spot.endTime}`
                  : spot.startTime
                : spot.endTime
                ? `${spot.endTime} - ${spot.startTime}`
                : spot.startTime}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "row"
                  : "row-reverse",
              alignContent: "center",
              alignItems: "center",
              margin: 15,
              marginBottom: 10,
              marginTop: 0,
            }}
          >
            <Ionicons
              style={{
                marginRight:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 5,
                marginLeft:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 5 : 10,
                color: "#e52b51",
                fontSize: 32,
                transform: [
                  {
                    scaleX:
                      i18n.locale === "en-US" || i18n.locale === "en" ? 1 : -1,
                  },
                ],
              }}
              name="ios-call-outline"
            ></Ionicons>
            <View
              style={{
                borderBottomWidth: 2,
                paddingBottom: 3,
                borderColor: "#e52b51",
              }}
            >
              <Text
                onPress={() => Linking.openURL(`tel:${organizer.phone}`)}
                style={{
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 20,
                  marginBottom:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 0 : -5,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
              >
                {organizer.phone}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "row"
                  : "row-reverse",
              alignContent: "center",
              alignItems: "center",
              margin: 15,
              marginBottom: 10,
              marginTop: 0,
            }}
          >
            <Ionicons
              style={{
                marginRight:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 10 : 5,
                marginLeft:
                  i18n.locale === "en-US" || i18n.locale === "en" ? 5 : 10,
                color: "#e52b51",
                fontSize: 32,
              }}
              name="navigate-circle-outline"
            ></Ionicons>
            <View
              style={{
                paddingBottom: 3,
                borderBottomWidth: 2,
                borderColor: "#e52b51",
              }}
            >
              <Text
                style={{
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 20,
                  marginBottom:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 0 : -5,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
                onPress={() => Linking.openURL(spot.location)}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? "View Location"
                  : "عرض الموقع"}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              fontSize: 20,
              alignSelf:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "flex-start"
                  : "flex-end",
              margin: 20,
              marginTop: 10,
              marginBottom: 0,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? "Details"
              : "تفاصيل"}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              paddingTop: 3,
              margin: 20,
              marginBottom: 0,
              marginTop: 10,
              lineHeight: 25,
              textAlign:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "left"
                  : "right",
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? spot.details
              : spot.detailsAr}
          </Text>

          <TouchableOpacity
            style={{
              fontSize: 20,
              margin: 20,
              marginTop: 15,
              marginBottom: 10,
              height: 70,
              display: "flex",
              flexDirection:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "row"
                  : "row-reverse",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => navigation.navigate("ReviewsPage", { spot: spot })}
          >
            <View
              style={{
                display: "flex",
                flexDirection:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "row"
                    : "row-reverse",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 22,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Reviews"
                  : "التقييمات"}
              </Text>
              <Text
                style={{
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  marginBottom:
                    i18n.locale === "en-US" || i18n.locale === "en" ? 0 : -6,
                  fontSize: 20,
                  marginLeft: 15,
                  marginRight: 15,
                  alignSelf: "center",
                  borderRadius: 150,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? reviewCount + "+"
                  : "+" + reviewCount}
              </Text>
            </View>

            <Ionicons
              style={{
                marginRight: 5,
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                fontSize: 30,
                opacity: 1,
              }}
              name={
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "chevron-forward-outline"
                  : "chevron-back-outline"
              }
            ></Ionicons>
          </TouchableOpacity>

          <Modal transparent={true} visible={visible} animationType="fade">
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: "85%",
                  backgroundColor: "white",
                  padding: 25,
                  paddingTop: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    marginBottom: 10,
                    fontFamily:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    width: "90%",
                    textAlign: "center",
                    fontSize: 24,
                  }}
                >
                  {i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Can't wait to see you!"
                    : "لا نستطيع الانتظار لرؤيتك!"}
                </Text>
                <Text
                  style={{
                    marginBottom: 20,
                    width: "70%",
                    textAlign: "center",
                    fontSize: 17,
                    fontFamily:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "Ubuntu"
                        : "Noto",
                    lineHeight: 30,
                  }}
                >
                  {i18n.locale === "en-US" || i18n.locale === "en"
                    ? "To view your ticket details go to your tickets page"
                    : "لعرض تفاصيل الوجهة اذهب لصفحة وجهاتك"}
                </Text>
                <TouchableOpacity
                  style={{
                    width: "50%",
                    backgroundColor: "#e52b51",
                    borderRadius: 50,
                    height: 40,
                    justifyContent: "center",
                  }}
                  onPress={async () => {
                    toggleAlert();
                    if (authStore.user.tickets.length === 1)
                      if (await StoreReview.hasAction()) {
                        StoreReview.requestReview();
                      }
                    navigation.navigate("MySpots");
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#f1f1f1",
                      fontFamily:
                        i18n.locale === "en-US" || i18n.locale === "en"
                          ? "UbuntuBold"
                          : "NotoBold",
                      fontSize: 15,
                    }}
                  >
                    {i18n.locale === "en-US" || i18n.locale === "en"
                      ? "Close"
                      : "اغلاق"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal transparent={true} visible={alreadyExist} animationType="fade">
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: "85%",
                  backgroundColor: "white",
                  padding: 25,
                  paddingTop: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    marginBottom: 10,
                    fontFamily:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    width: "90%",
                    textAlign: "center",
                    fontSize: 24,
                  }}
                >
                  {i18n.t("ALE")}
                </Text>
                <Text
                  style={{
                    marginBottom: 20,
                    width: "70%",
                    textAlign: "center",
                    fontSize: 17,
                    fontFamily:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "Ubuntu"
                        : "Noto",
                    lineHeight: 30,
                  }}
                >
                  {i18n.locale === "en-US" || i18n.locale === "en"
                    ? "To view your ticket details go to your tickets page"
                    : "لعرض تفاصيل الوجهة اذهب لصفحة وجهاتك"}
                </Text>
                <TouchableOpacity
                  style={{
                    width: "50%",
                    backgroundColor: "#e52b51",
                    borderRadius: 50,
                    height: 40,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    toggleAlreadyExist();
                    setIsLoading(false);
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#f1f1f1",
                      fontFamily:
                        i18n.locale === "en-US" || i18n.locale === "en"
                          ? "UbuntuBold"
                          : "NotoBold",
                      fontSize: 15,
                    }}
                  >
                    {i18n.locale === "en-US" || i18n.locale === "en"
                      ? "Close"
                      : "اغلاق"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>

      {spot.isFree === true ? (
        <TouchableOpacity
          style={{
            display: "flex",
            alignSelf: "center",
            borderRadius: 25,
            height: 60,
            width: "90%",
            backgroundColor: isLoading ? "gray" : "#e52b51",
            marginTop: 20,
            marginBottom: 25,
            justifyContent: "center",
            zIndex: 99,
            flexDirection:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "row-reverse"
                : "row",
          }}
          disabled={isLoading}
          onPress={() => handleSpots(spot)}
        >
          <Text
            style={{
              color: "white",
              fontSize: 22,
              alignSelf: "center",
              marginLeft: 10,
              marginRight: 10,
              fontFamily: "Ubuntu",
            }}
          >
            {isLoading ? i18n.t("Loading") : i18n.t("Visit")}
          </Text>
          {isLoading ? (
            <>
              <ActivityIndicator size={"small"} color={"white"} />
            </>
          ) : (
            <>
              <Ionicons
                style={styles.spoticon}
                name="location-sharp"
              ></Ionicons>
            </>
          )}
        </TouchableOpacity>
      ) : (
        <>
          {spot.seats > 0 ? (
            <View
              style={{
                display: "flex",
                flexDirection:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "row"
                    : "row-reverse",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                width: "100%",
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignSelf: "flex-start",
                  borderRadius: 20,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  padding: 10,
                  marginBottom: 16,
                  borderColor: "#e52b51",
                  width: "30%",
                  alignSelf: "center",
                  height: 60,
                }}
              >
                <Ionicons
                  style={{
                    color: "#e52b51",
                    fontFamily: "Ubuntu",
                    fontSize: 28,
                    marginLeft: 10,
                  }}
                  name="add-outline"
                  onPress={handleInc}
                ></Ionicons>
                <Text
                  style={{
                    fontSize: 28,
                    fontFamily: "Ubuntu",
                    color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                  }}
                >
                  {quantity}
                </Text>
                <Ionicons
                  style={{
                    color: "#e52b51",
                    fontFamily:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "Ubuntu"
                        : "Noto",
                    fontSize: 28,
                    marginRight: 10,
                  }}
                  name="remove-outline"
                  onPress={handleDec}
                ></Ionicons>
              </View>
              <TouchableOpacity
                style={{
                  display: "flex",
                  alignSelf: "center",
                  borderRadius: 20,
                  height: 60,
                  width: "60%",
                  backgroundColor: "#e52b51",
                  margin: 10,
                  marginBottom: 25,
                  justifyContent: "center",
                  zIndex: 99,
                  flexDirection:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "row-reverse"
                      : "row",
                }}
                onPress={() => {
                  handleBook(spot);
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 22,
                    alignSelf: "center",
                    marginLeft: 10,
                    marginRight: 10,
                    fontFamily:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "Ubuntu"
                        : "Noto",
                  }}
                >
                  {i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Book"
                    : "احجز"}
                </Text>
                <Ionicons style={styles.spoticon} name="location"></Ionicons>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                display: "flex",
                alignSelf: "center",
                borderRadius: 25,
                height: 60,
                width: "90%",
                backgroundColor: "grey",
                margin: 10,
                justifyContent: "center",
                zIndex: 99,
                flexDirection: "row-reverse",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  alignSelf: "center",
                  marginLeft: 10,
                  marginRight: 10,
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "Ubuntu"
                      : "Noto",
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Sold Out"
                  : "نفذت الكمية"}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    position: "absolute",
    zIndex: 100,
    color: "white",
    marginTop: 70,
    marginLeft: 20,
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
  down: {
    position: "absolute",
    zIndex: 100,
    color: "white",
    opacity: 0.7,
    alignSelf: "center",
    marginTop: 855,
    fontSize: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
  share: {
    position: "absolute",
    zIndex: 100,
    color: "white",
    marginTop: 73,
    marginLeft: 368,
    fontSize: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  downText: {
    position: "absolute",
    zIndex: 100,
    color: "white",
    opacity: 0.7,
    alignSelf: "center",
    marginTop: 880,
    fontSize: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    fontFamily: "CabinMedium",
  },
  spotext: {
    color: "white",
    fontSize: 22,
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "Ubuntu",
  },
  spoticon: {
    color: "white",
    fontSize: 30,
    alignSelf: "center",
    zIndex: 99,
  },

  mainTitle: {
    fontSize: 45,
    margin: 10,
    marginLeft: 0,
    marginTop: 600,
    marginRight: 10,
    fontWeight: "700",
    color: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  icon: {
    fontSize: 40,
    fontWeight: "700",
    color: "#e52b51",
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
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  ownerthumb: {
    width: 45,
    height: 45,
    borderRadius: 50,
    zIndex: -1,
    marginRight: 10,
    marginLeft: 10,
  },
  isFree: {
    fontSize: 20,
    color: "white",
    fontFamily: "Ubuntu",
    paddingTop: 10,
  },
  isFreeHeader: {
    fontSize: 30,
    color: "white",
    fontFamily: "UbuntuBold",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  ownername: {
    color: "white",
    fontSize: 22,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    fontFamily: "CabinMedium",
    textTransform: "capitalize",
  },
  descriptionTitle: {
    fontSize: 22,
    marginBottom: 10,
    fontFamily: "Ubuntu",
  },
  description: {
    fontSize: 18,
    color: "white",
    fontFamily: "CabinMedium",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
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
  spotthisbookout: {
    display: "flex",
    alignSelf: "center",
    borderRadius: 25,
    height: 60,
    width: "90%",
    backgroundColor: "grey",
    margin: 10,
    justifyContent: "center",
    zIndex: 99,
    flexDirection: "row-reverse",
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
