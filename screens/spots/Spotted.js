import { observer } from "mobx-react";
import { Text, Image, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { baseURL } from "../../stores/instance";
import { useFonts } from "expo-font";
import moment from "moment";
import Swipeout from "react-native-swipeout";
import authStore from "../../stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import spotStore from "../../stores/spotStore";
import ticketStore from "../../stores/ticketStore";

function Spotted({ ticket, navigation }) {
  const spot = spotStore.getSpotsById(ticket.spot)
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  let month = moment(spot?.startDate).format("MMM");
  let day = moment(spot?.startDate).format("DD");
  const swipeoutBtns = [
    {
      component: (

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Ionicons
            style={{ color: "red", fontSize: 40 }}
            name="trash-outline"
          ></Ionicons>
        </View>
      ),
      backgroundColor: "white",
      color: "red",
      onPress: () => {
        if(ticket.isFree === true){
          Alert.alert("Do You Want to Delete this Spot?", "", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => ticketStore.deleteTicket(ticket._id) },
            // authStore.removeSpot(spot?._id)
          ])
        } else {
          Alert.alert("This is a paid spot", "Contact us to cancel your booking", [
            { text: "OK", onPress: () => console.log("Cancel Pressed") },
            // authStore.removeSpot(spot?._id)
          ])
        }
        
        
      },
    },
  ];
  return (
    <Swipeout backgroundColor="white" right={swipeoutBtns} autoClose="true">
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            margin: 10,
            width: 60,
            height: 70,
            borderWidth: 0.5,
            borderRadius: 15,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 12,
          }}
        >
          <Text
            style={{
              fontFamily: "UbuntuBold",
              fontSize: 28,
              color: "black",
            }}
          >
            {day}
          </Text>

          <Text
            style={{
              fontFamily: "Ubuntu",
              fontSize: 20,
              color: "black",
            }}
          >
            {month}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.card}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onPress={() => {
            navigation.navigate("SpotttedDetails", { id: spot._id, ticket: ticket });
          }}
        >
          <Image
            style={styles.thumb}
            source={{ uri: `${baseURL}${spot?.image}` }}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{spot?.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeout>
  );
}

export default observer(Spotted);

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-end",
    borderRadius: 16,
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 5,
    height: 290,
    marginBottom: 10,
    marginRight: 5,
  },
  thumb: {
    width: 320,
    height: 280,
    borderRadius: 20,
    margin: 10,
    marginLeft: 0,
    zIndex: -1,
    opacity: 0.7,
  },
  infoContainer: {
    display: "flex",
    flex: 1,
    position: "absolute",
    alignSelf: "flex-end",
    flexWrap: "nowrap",
    flexDirection: "column",
    width: 320,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fffffc",
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    margin: 25,
    fontFamily: "UbuntuBold",
  },
  edit: {
    borderRadius: 10,
  },
  profileName: {
    justifyContent: "center",
    paddingTop: 6,
    fontSize: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 15,
  },
  profile: {
    flexDirection: "row",
    padding: 10,
  },
});
