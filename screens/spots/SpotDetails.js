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
} from "react-native";
import React, { useState } from "react";
import spotStore from "../../stores/spotStore";
import { baseURL } from "../../stores/instance";
import { Ionicons } from "@expo/vector-icons";
import authStore from "../../stores/authStore";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import ReviewList from "../reviews/ReviewList";
import organizerStore from "../../stores/organizerStore";
import ticketStore from "../../stores/ticketStore";
import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";
//import "moment/locale/ar";
LogBox.ignoreAllLogs();

export function SpotDetails({ route }) {
  const spot = spotStore.getSpotsById(route.params.id);
  const [newTicket, setNewTicket] = useState({
    amount: 0,
    image: "",
    isFree: true,
  });
  const organizer = organizerStore.getOrganizerById(spot.organizer);
  const reviewCount = spot.reviews.length;
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);
  const [checkSeats, setCheckSeats] = useState(quantity);
  const [toggle, setToggle] = useState(false);
  const userTickets = ticketStore.tickets.filter(
    (ticket) => ticket.user === authStore.user.id
  );
  console.log("userTickets", userTickets);
  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Cabin: require("../../assets/fonts/Cabin.ttf"),
    CabinMedium: require("../../assets/fonts/CabinMedium.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const handleInc = () => {
    setCheckSeats(checkSeats + 1);
    if (spot.seats >= checkSeats + 1) {
      setQuantity(quantity + 1);
      setCheckSeats(quantity + 1);
    } else {
      Alert.alert("You exceeded the available amount of seats");
    }
  };

  const handleDec = () => {
    setCheckSeats(checkSeats + 1);
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setCheckSeats(quantity - 1);
    }
  };

  const handleSpots = async (spot) => {
    const found = userTickets.some((ticket) => ticket.spot._id === spot._id);
    console.log("found", found);
    if (!found) {
      await ticketStore.createTicket(newTicket, spot._id);
      Alert.alert("Added to your spots");
      navigation.navigate("Explore");
      await ticketStore.fetchTickets();
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
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{ zIndex: 99 }}
      >
        <Ionicons style={styles.back} name="chevron-back-outline"></Ionicons>
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
            <View style={{ zIndex: 99 }}>
              <Ionicons
                style={styles.down}
                name="chevron-up-outline"
              ></Ionicons>
              <Text style={styles.downText}>More Info</Text>
            </View>
            <View
              style={{
                margin: 20,
                marginLeft: 30,
                marginTop: -10,
                marginBottom: 10,
              }}
            >
              <Text style={styles.mainTitle}>{spot.name}</Text>
              <View style={styles.ownerContainer}>
                <Image
                  style={styles.ownerthumb}
                  source={{ uri: `${baseURL}${organizer.image}` }}
                />
                <Text style={styles.ownername}>{organizer.username}</Text>
              </View>
              <Text style={styles.description}>{spot.description}</Text>
            </View>
          </View>
        )}
      >
        <StatusBar barStyle="light-content" />
        <TriggeringView
          style={{
            borderRadius: "40%",
            backgroundColor: "white",
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
                fontFamily: "UbuntuLight",
                fontSize: 25,
                alignSelf: "center",
                margin: 20,
                letterSpacing: 3,
              }}
            >
              Spot Information
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
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
                  color: "#4831d4",
                  fontSize: 30,
                }}
                name="calendar-outline"
              ></Ionicons>
              {spot.numOfDays === 1 ? (
                <Text style={{ fontFamily: "UbuntuBold", fontSize: 20 }}>
                  {date}
                </Text>
              ) : (
                <Text style={{ fontFamily: "UbuntuBold", fontSize: 20 }}>
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
                margin: 30,
                marginBottom: 10,
                marginTop: 0,
              }}
            >
              <Ionicons
                style={{ marginRight: 5, color: "#4831d4", fontSize: 32 }}
                name="time-outline"
              ></Ionicons>
              <Text style={{ fontFamily: "UbuntuBold", fontSize: 20 }}>
                {spot.startTime}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                margin: 30,
                marginBottom: 10,
                marginTop: 0,
              }}
            >
              <Ionicons
                style={{ marginRight: 5, color: "#4831d4", fontSize: 32 }}
                name="ios-call-outline"
              ></Ionicons>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#4831d4",
                }}
              >
                <Text
                  onPress={() => Linking.openURL(`tel:${organizer.phone}`)}
                  style={{ fontFamily: "UbuntuBold", fontSize: 20 }}
                >
                  {organizer.phone}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                margin: 30,
                marginBottom: 10,
                marginTop: 0,
              }}
            >
              <Ionicons
                style={{ marginRight: 5, color: "#4831d4", fontSize: 32 }}
                name="navigate-circle-outline"
              ></Ionicons>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#4831d4",
                }}
              >
                <Text
                  style={{
                    fontFamily: "UbuntuBold",
                    fontSize: 20,
                  }}
                  onPress={() => Linking.openURL(spot.location)}
                >
                  View Location
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontFamily: "UbuntuBold",
                fontSize: 20,
                margin: 30,
                marginTop: 10,
                marginBottom: 0,
              }}
            >
              Details
            </Text>
            <Text style={styles.details}>{spot.details}</Text>
          </View>
          <TouchableOpacity
            style={{
              fontFamily: "Ubuntu",
              fontSize: 20,
              margin: 10,
              marginBottom: 15,
              marginTop: 15,
              height: 70,
              padding: 20,
              display: "flex",
              flexDirection: "row",
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
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
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
              <Text
                style={{
                  fontFamily: "UbuntuBold",
                  fontSize: 20,
                  marginLeft: 15,
                  alignSelf: "center",
                  borderRadius: "150%",
                }}
              >
                {reviewCount}+
              </Text>
            </View>
            {!toggle && (
              <Ionicons
                style={{
                  marginRight: 5,
                  color: "black",
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
                  color: "black",
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
                    fontFamily: "Ubuntu",
                    fontSize: 20,
                    marginTop: 0,
                    margin: 20,
                    alignSelf: "center",
                  }}
                  key="2"
                >
                  No Reviews Yet
                </Text>
              )}
            </View>
          )}
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
          ) : spot.seats !== 0 ? (
            <>
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
                    marginBottom: 16,
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
                    onPress={handleInc}
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
                    onPress={handleDec}
                  ></Ionicons>
                </View>
                <TouchableOpacity
                  style={styles.spotthisbook}
                  onPress={() => {
                    handleBook(spot);
                  }}
                >
                  <Text style={styles.spotext}>
                    Book ({spot.price * quantity} KD)
                  </Text>
                  <Ionicons style={styles.spoticon} name="location"></Ionicons>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.spotthisbookout}>
                <Text style={styles.spotext}>Sold Out</Text>
              </TouchableOpacity>
            </>
          )}
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
    borderRadius: 20,
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
    marginBottom: 25,
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
    marginBottom: 25,
    justifyContent: "center",
    zIndex: 99,
    flexDirection: "row-reverse",
  },
  mainTitle: {
    fontSize: 45,
    margin: 10,
    marginLeft: 0,
    marginTop: 600,
    marginRight: 10,
    fontWeight: "700",
    fontFamily: "UbuntuBold",
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
  details: {
    fontSize: 18,
    color: "black",
    fontFamily: "Ubuntu",
    margin: 30,
    marginBottom: 0,
    marginTop: 10,
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
