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
  Share,
  useColorScheme,
} from "react-native";
import React, { useCallback, useState } from "react";
import spotStore from "../../stores/spotStore";
import { baseURL } from "../../stores/instance";
import { Ionicons } from "@expo/vector-icons";
import authStore from "../../stores/authStore";
import { useFonts } from "expo-font";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import ReviewList from "../reviews/ReviewList";
import organizerStore from "../../stores/organizerStore";
import ticketStore from "../../stores/ticketStore";
import { Popup, Root } from "popup-ui";
import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import "moment/locale/ar";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
LogBox.ignoreAllLogs();

export function SpotDetails({ route }) {
  const spot = spotStore.getSpotsById(route.params.id);
  const translations = {
    en: {
      more: "More Info",
    },
    ar: {
      more: "التفاصيل",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  const [newTicket, setNewTicket] = useState({
    amount: 0,
    image: "",
    isFree: true,
  });
  const [visible, setVisible] = useState(false);
  const toggleAlert = useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  const organizer = organizerStore.getOrganizerById(spot.organizer);
  const reviewCount = spot.reviews.length;
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);
  const [checkSeats, setCheckSeats] = useState(quantity);
  const [toggle, setToggle] = useState(false);
  const userTickets = ticketStore.tickets.filter(
    (ticket) => ticket.user === authStore.user.id
  );
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
    if (spot.seats >= checkSeats + 1) {
      setQuantity(quantity + 1);
      setCheckSeats(quantity + 1);
    } else {
      i18n.locale === "en-US"
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
        message: `${authStore.user.username} wants you to check this spot out!!!`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handleSpots = async (spot) => {
    const found = userTickets.some((ticket) => ticket.spot._id === spot._id);
    if (!found) {
      await ticketStore.createTicket(newTicket, spot._id);
      await ticketStore.fetchTickets();
      toggleAlert();
    } else {
      Alert.alert(
        i18n.locale === "en-US" ? "Already in your spots" : "موجودة في نقاطك"
      );
    }
  };
  const handleBook = (spot) => {
    navigation.navigate("BookingDetails", {
      itemId: spot,
      quantity: quantity,
    });
  };

  let dateEn = moment(spot?.startDate).locale("en").format("LL");
  let dateAr = moment(spot?.startDate).locale("ar").format("LL");
  let monthEn = moment(spot?.startDate).locale("en").format("MMMM");
  let monthAr = moment(spot?.startDate).locale("ar").format("MMMM");
  let yearEn = moment(spot?.startDate).locale("en").format("YYYY");
  let yearAr = moment(spot?.startDate).locale("ar").format("YYYY");

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{ zIndex: 99 }}
      >
        <Ionicons
          style={{
            position: "absolute",
            alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
            zIndex: 100,
            color: "white",
            marginTop: 70,
            marginLeft: 20,
            paddingRight: 20,
            fontSize: 40,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.46,
            shadowRadius: 11.14,

            elevation: 17,
          }}
          name={
            i18n.locale === "en-US"
              ? "chevron-back-outline"
              : "chevron-forward-outline"
          }
        ></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onShare();
        }}
        style={{ zIndex: 99 }}
      >
        <Ionicons
          style={{
            position: "absolute",
            alignSelf: i18n.locale === "en-US" ? "flex-end" : "flex-start",
            zIndex: 100,
            color: "white",
            marginTop: 70,
            marginLeft: 20,
            paddingRight: 20,
            paddingLeft: 10,
            fontSize: 40,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.46,
            shadowRadius: 11.14,

            elevation: 17,
          }}
          name="share-outline"
        ></Ionicons>
      </TouchableOpacity>
      <ImageHeaderScrollView
        scrollViewBackgroundColor="transparent"
        maxHeight={950}
        minHeight={0}
        maxOverlayOpacity={0.8}
        minOverlayOpacity={0.45}
        headerImage={{ uri: `${baseURL}${spot.image}` }}
        showsVerticalScrollIndicator={false}
        bounces={true}
        renderFixedForeground={() => (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            <View
              style={{
                zIndex: 99,
                marginTop: "193%",
                position: "absolute",
                width: "100%",
              }}
            >
              <Ionicons
                style={{
                  zIndex: 100,
                  color: "#f1f1f1",
                  opacity: 0.8,
                  fontSize: 30,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.46,
                  shadowRadius: 11.14,
                  elevation: 17,
                  alignSelf: "center",
                }}
                name="chevron-up-outline"
              ></Ionicons>
              <Text
                style={{
                  position: "absolute",
                  zIndex: 100,
                  color: "#f1f1f1",
                  opacity: 0.8,
                  marginTop: 20,

                  fontSize: i18n.locale === "en-US" ? 20 : 16,
                  paddingTop: 5,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.46,
                  shadowRadius: 11.14,
                  elevation: 17,
                  fontFamily:
                    i18n.locale === "en-US" ? "CabinMedium" : "NotoBold",
                  alignSelf: "center",
                }}
              >
                {i18n.t("more")}
              </Text>
            </View>
            <View
              style={{
                margin: "3%",
                alignSelf: "center",
                marginTop: "128%",
              }}
            >
              <Text
                style={{
                  fontSize: 40,
                  fontWeight: "700",
                  fontFamily:
                    i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                  color: "white",
                  shadowColor: "#000",
                  alignSelf:
                    i18n.locale === "en-US" ? "flex-start" : "flex-end",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,
                  elevation: 7,
                }}
              >
                {i18n.locale === "en-US" ? spot.name : spot.nameAr}
              </Text>
              <View
                style={{
                  marginBottom: i18n.locale === "en-US" ? 10 : 20,
                  display: "flex",
                  flexDirection:
                    i18n.locale === "en-US" ? "row" : "row-reverse",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    alignSelf: "center",
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    zIndex: -1,
                    marginRight: i18n.locale === "en-US" ? 10 : 0,
                    marginLeft: i18n.locale === "en-US" ? 0 : 10,
                    borderWidth: 1.5,
                    borderColor: "white",
                    backgroundColor: "white",
                    resizeMode: "contain",
                  }}
                  source={{ uri: `${baseURL}${organizer.image}` }}
                />
                <Text
                  style={{
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
                    fontFamily:
                      i18n.locale === "en-US" ? "CabinMedium" : "NotoBold",
                    textTransform: "capitalize",
                  }}
                >
                  {organizer.username}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  fontFamily:
                    i18n.locale === "en-US" ? "CabinMedium" : "NotoBold",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,
                  elevation: 7,
                  lineHeight: 28,
                  textAlign: i18n.locale === "en-US" ? "left" : "right",
                }}
              >
                {i18n.locale === "en-US"
                  ? spot.description
                  : spot.descriptionAr}
              </Text>
            </View>
          </View>
        )}
      >
        <StatusBar barStyle="light-content" />
        <TriggeringView
          style={{
            borderRadius: "40%",
            backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
            shadowColor: "#161616",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.7,
            shadowRadius: 20,
            elevation: 3,
          }}
          onHide={() => console.log("text hidden")}
        >
          <View>
            <Text
              style={{
                fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                fontSize: 25,
                alignSelf: "center",
                margin: 20,
                letterSpacing: 3,
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              }}
            >
              {i18n.locale === "en-US"
                ? "More Informations"
                : "المزيد من المعلومات"}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
                alignContent: "center",
                alignItems: "center",
                margin: 30,
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              <Ionicons
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  color: "#9279f7",
                  fontSize: 30,
                }}
                name="calendar-outline"
              ></Ionicons>
              {spot.numOfDays === 1 ? (
                <Text
                  style={{
                    fontFamily:
                      i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                    fontSize: 20,
                    color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                  }}
                >
                  {i18n.locale === "en-US" ? dateEn : dateAr}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "UbuntuBold",
                    fontSize: 20,
                    color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                  }}
                >
                  {i18n.locale === "en-US" ? monthEn : monthAr},{" "}
                  {i18n.locale === "en-US" ? yearEn : yearAr}
                </Text>
              )}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
                alignContent: "center",
                alignItems: "center",
                margin: 30,
                marginBottom: 10,
                marginTop: 0,
              }}
            >
              <Ionicons
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  color: "#9279f7",
                  fontSize: 32,
                }}
                name="time-outline"
              ></Ionicons>
              <Text
                style={{
                  fontFamily:
                    i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                  fontSize: 20,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
              >
                {spot.startTime}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
                alignContent: "center",
                alignItems: "center",
                margin: 30,
                marginBottom: 10,
                marginTop: 0,
              }}
            >
              <Ionicons
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  color: "#9279f7",
                  fontSize: 32,
                  transform: [{ scaleX: i18n.locale === "en-US" ? 1 : -1 }],
                }}
                name="ios-call-outline"
              ></Ionicons>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderColor: "#9279f7",
                }}
              >
                <Text
                  onPress={() => Linking.openURL(`tel:${organizer.phone}`)}
                  style={{
                    fontFamily:
                      i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                    fontSize: 20,
                    marginBottom: i18n.locale === "en-US" ? 0 : -5,
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
                flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
                alignContent: "center",
                alignItems: "center",
                margin: 30,
                marginBottom: 10,
                marginTop: 0,
              }}
            >
              <Ionicons
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  color: "#9279f7",
                  fontSize: 32,
                }}
                name="navigate-circle-outline"
              ></Ionicons>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderColor: "#9279f7",
                }}
              >
                <Text
                  style={{
                    fontFamily:
                      i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                    fontSize: 20,
                    marginBottom: i18n.locale === "en-US" ? 0 : -5,
                    color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                  }}
                  onPress={() => Linking.openURL(spot.location)}
                >
                  {i18n.locale === "en-US" ? "View Location" : "عرض الموقع"}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                fontSize: 20,
                alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
                margin: 30,
                marginTop: 10,
                marginBottom: 0,
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              }}
            >
              {i18n.locale === "en-US" ? "Details" : "تفاصيل"}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                paddingTop: 3,
                margin: 30,
                marginBottom: 0,
                marginTop: 10,
                lineHeight: 25,
                textAlign: i18n.locale === "en-US" ? "left" : "right",
              }}
            >
              {i18n.locale === "en-US" ? spot.details : spot.detailsAr}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              fontSize: 20,
              margin: 10,
              paddingBottom: 15,
              height: 70,
              padding: 20,
              display: "flex",
              flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() =>
              toggle === false ? setToggle(true) : setToggle(false)
            }
          >
            <View
              style={{
                display: "flex",
                flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily:
                    i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                  fontSize: 20,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
              >
                {i18n.locale === "en-US" ? "Reviews" : "المراجعات"}
              </Text>
              <Text
                style={{
                  fontFamily:
                    i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                  marginBottom: i18n.locale === "en-US" ? 0 : -6,
                  fontSize: 20,
                  marginLeft: 15,
                  marginRight: 15,
                  alignSelf: "center",
                  borderRadius: "150%",
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
              >
                {i18n.locale === "en-US"
                  ? reviewCount + "+"
                  : "+" + reviewCount}
              </Text>
            </View>
            {!toggle && (
              <Ionicons
                style={{
                  marginRight: 5,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",

                  fontSize: 30,
                  opacity: 1,
                }}
                name="chevron-down-outline"
              ></Ionicons>
            )}
            {toggle && (
              <Ionicons
                style={{
                  marginRight: 5,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",

                  fontSize: 30,
                  opacity: 1,
                }}
                name="chevron-up-outline"
              ></Ionicons>
            )}
          </TouchableOpacity>
          {toggle && (
            <View>
              {spot?.reviews.length !== 0 ? (
                <ReviewList
                  key="2"
                  reviews={spot?.reviews}
                  spotId={spot?._id}
                />
              ) : (
                <Text
                  style={{
                    fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                    fontSize: 20,
                    marginTop: 0,
                    margin: 20,
                    alignSelf: "center",
                    color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                  }}
                  key="2"
                >
                  {i18n.locale === "en-US"
                    ? "No Reviews Yet"
                    : "لا يوجد مراجعات حاليا"}
                </Text>
              )}
            </View>
          )}
          {spot.isFree === true ? (
            <TouchableOpacity
              style={{
                display: "flex",
                alignSelf: "center",
                borderRadius: 25,
                height: 60,
                width: "90%",
                backgroundColor: "#9279f7",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
                elevation: 7,
                marginBottom: 25,
                justifyContent: "center",
                zIndex: 99,
                flexDirection: i18n.locale === "en-US" ? "row-reverse" : "row",
              }}
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
                {i18n.locale === "en-US" ? "Go here" : "اذهب هنا"}
              </Text>
              <Ionicons style={styles.spoticon} name="location"></Ionicons>
            </TouchableOpacity>
          ) : spot.seats !== 0 ? (
            <>
              <View
                style={{
                  display: "flex",
                  flexDirection:
                    i18n.locale === "en-US" ? "row" : "row-reverse",
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  margin: 5,
                  marginTop: 0,
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
                    marginBottom: 16,
                    borderColor: "#9279f7",
                    width: "30%",
                    alignSelf: "center",
                    height: 60,
                  }}
                >
                  <Ionicons
                    style={{
                      color: "#9279f7",
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
                      color: "#9279f7",
                      fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
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
                    marginBottom: 25,
                    justifyContent: "center",
                    zIndex: 99,
                    flexDirection:
                      i18n.locale === "en-US" ? "row-reverse" : "row",
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
                      fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                    }}
                  >
                    {i18n.locale === "en-US" ? "Book" : "احجز"}
                  </Text>
                  <Ionicons style={styles.spoticon} name="location"></Ionicons>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.spotthisbookout}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 22,
                    alignSelf: "center",
                    marginLeft: 10,
                    marginRight: 10,
                    fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                  }}
                >
                  {i18n.locale === "en-US" ? "Sold Out" : "نفذت الكمية"}
                </Text>
              </TouchableOpacity>
            </>
          )}
          <FancyAlert
            visible={visible}
            icon={
              <View
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#9279f7",
                  borderRadius: 50,
                  width: "100%",
                }}
              >
                <Ionicons
                  style={{
                    color: "white",
                    fontSize: 40,
                    fontWeight: "bold",
                  }}
                  name="happy"
                ></Ionicons>
              </View>
            }
            style={{ backgroundColor: "white" }}
          >
            <Text
              style={{
                marginTop: -16,
                marginBottom: 32,
                fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.locale === "en-US"
                ? "You're going there!"
                : "انت ذاهب هناك!"}
            </Text>
            <Text
              style={{
                marginTop: i18n.locale === "en-US" ? -16 : -20,
                marginBottom: 32,
                width: "70%",
                textAlign: "center",
                fontSize: 17,
                fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                lineHeight: 30,
              }}
            >
              {i18n.locale === "en-US"
                ? "To view the spot details go to your spots page"
                : "لعرض تفاصيل الوجهة اذهب لصفحة وجهاتك"}
            </Text>
            <TouchableOpacity
              style={{
                marginTop: -16,
                marginBottom: 32,
                width: "50%",
                backgroundColor: "#9279f7",
                borderRadius: "50%",
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("Explore")}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#f1f1f1",
                  fontFamily:
                    i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.locale === "en-US" ? "Close" : "اغلاق"}
              </Text>
            </TouchableOpacity>
          </FancyAlert>
        </TriggeringView>
      </ImageHeaderScrollView>
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
    color: "#9279f7",
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
    borderRadius: "50%",
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
    backgroundColor: "#9279f7",
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
});
