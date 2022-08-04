import { observer } from "mobx-react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { baseURL } from "../../stores/instance";
import { useMediaQuery } from "native-base";
import moment from "moment";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import AppLoading from "expo-app-loading";
import authStore from "../../stores/organizerStore";
import organizerStore from "../../stores/organizerStore";

function Spot({ spot, navigation }) {
  const [isSmallScreen] = useMediaQuery({
    minHeight: 180,
    maxHeight: 900,
  });
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  //{//Get organizer from organizerStore not from the spot ==> use spot.organizer to find organizer} ==> wrong
  const organizer = organizerStore.getOrganizerById(spot.organizer);
  let users = spot.users.length;
  let user1 = spot?.users[0]?.image;
  let user2 = spot?.users[1]?.image;
  let user3 = spot?.users[2]?.image;
  let month = moment(spot.startDate).format("MMM");
  let day = moment(spot.startDate).format("DD");
  return (
    <TouchableOpacity
      style={styles.card}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      activeOpacity={0.95}
      onPress={() => {
        navigation.navigate("SpotDetails", { id: spot._id });
      }}
    >
      {isSmallScreen ? (
        <>
          <Image
            style={styles.sthumb}
            source={{ uri: `${baseURL}${spot.image}` }}
          />

          <View style={styles.ownerContainer}>
            <Image
              style={styles.ownerthumbs}
              source={{ uri: `${baseURL}${spot.image}` }}
            />
            <Text style={styles.ownername}>{date}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{spot.name}</Text>
            <Text style={styles.datetime}>{date}</Text>
          </View>
          <View style={styles.priceContainer}>
            {spot.isFree === true ? (
              <View style={styles.priceBack}>
                <Text style={styles.isFree}>Free</Text>
              </View>
            ) : (
              <View style={styles.priceBack}>
                <Text style={styles.isFree}>{spot.price} KD</Text>
              </View>
            )}
          </View>
        </>
      ) : (
        <>
          <Image
            style={styles.thumb}
            source={{ uri: `${baseURL}${spot?.image}` }}
          />
          <View style={styles.ownerview}>
            <TouchableOpacity
              style={styles.ownerContainer}
              onPress={() => {
                navigation.navigate("Organizer", {
                  organizer: spot.organizer._id,
                });
              }}
            >
              <Image
                style={styles.ownerthumb}
                source={{ uri: `${baseURL}${organizer?.image}` }}
              />
              <Text style={styles.ownername}>{organizer?.username}</Text>
            </TouchableOpacity>
            <View
              style={{
                margin: 10,
                width: 60,
                height: 70,
                backgroundColor: "white",
                borderRadius: 15,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                shadowOpacity: 0.1,
                shadowRadius: 10,
                shadowColor: "#004365",
                shadowOffset: {
                  height: 10,
                  width: 0,
                },
                marginLeft: 12,
              }}
            >
              <Text
                style={{
                  fontFamily: "UbuntuBold",
                  fontSize: 23,
                  color: "#0a0a0b",
                }}
              >
                {day}
              </Text>

              <Text
                style={{
                  fontFamily: "Ubuntu",
                  fontSize: 17,
                  color: "grey",
                }}
              >
                {month}
              </Text>
            </View>
          </View>
          <LinearGradient
            colors={["rgba(0,0,0,0.7)", "transparent"]}
            start={{ x: 0, y: 0.8 }}
            end={{ x: 0, y: 0 }}
            style={styles.infoContainer}
          >
            {spot.isFree === true ? (
              <Text style={styles.isFree}>Free</Text>
            ) : (
              <Text style={styles.isFree}>{spot.price} KD per person</Text>
            )}
            <Text style={styles.name}>{spot.name}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              {user1 !== null && (
                <Image
                  style={{
                    borderRadius: "50%",
                    borderWidth: 0.2,
                    borderColor: "white",
                    height: 35,
                    width: 35,
                  }}
                  source={{ uri: `${baseURL}${user1}` }}
                ></Image>
              )}
              {user2 !== null && (
                <Image
                  style={{
                    borderRadius: "50%",
                    borderWidth: 0.2,
                    borderColor: "white",
                    height: 35,
                    width: 35,
                    marginLeft: -5,
                  }}
                  source={{
                    uri: `${baseURL}${user2}`,
                  }}
                ></Image>
              )}
              {user3 !== null && (
                <Image
                  style={{
                    borderRadius: "50%",
                    borderWidth: 0.2,
                    borderColor: "white",
                    height: 35,
                    width: 35,
                    marginLeft: -5,
                  }}
                  source={{ uri: `${baseURL}${user3}` }}
                ></Image>
              )}
              <View style={styles.spottedview}>
                <Text style={styles.spotted}>{users}+</Text>
              </View>
            </View>
          </LinearGradient>
        </>
      )}
    </TouchableOpacity>
  );
}

export default observer(Spot);

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 100,
    borderRadius: 16,
    shadowColor: "#161616",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 13,
    elevation: 3,
    marginTop: 3,
  },
  thumb: {
    marginTop: 19,
    alignSelf: "center",
    width: 374,
    height: 620,
    borderRadius: 30,
    zIndex: -1,
    opacity: 1,
  },
  ownerthumb: {
    alignSelf: "center",
    width: 55,
    height: 55,
    borderRadius: "50%",
    zIndex: -1,
    opacity: 1,
    marginRight: 10,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowColor: "#004365",
    shadowOffset: {
      height: 10,
      width: 0,
    },
    borderWidth: 1.5,
    borderColor: "white",
  },
  sthumb: {
    marginTop: 12,
    alignSelf: "center",
    width: 354,
    height: 500,
    borderRadius: 20,
    zIndex: -1,
    opacity: 1,
  },
  ownerthumbs: {
    alignSelf: "center",
    width: 45,
    height: 45,
    borderRadius: "50%",
    zIndex: -1,
    opacity: 1,
    marginRight: 10,
  },
  infoContainer: {
    display: "flex",
    position: "absolute",
    width: 374,
    flexDirection: "column",
    flexWrap: "nowrap",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    padding: 35,
    alignSelf: "flex-end",
  },
  priceContainer: {
    display: "flex",
    position: "absolute",
    alignSelf: "flex-end",
    width: 384,
    height: 150,
    paddingLeft: 28,
    paddingBottom: 40,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  isFree: {
    fontSize: 16,
    color: "white",
    fontFamily: "Ubuntu",
    paddingBottom: 10,
  },
  priceBack: {
    backgroundColor: "rgba(0,0,0,0.6)",
    alignSelf: "center",
    marginLeft: 128,
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 30,
  },
  ownerContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    textAlign: "center",
    width: 220,
    alignContent: "center",
  },
  ownerview: {
    paddingBottom: 485,
    display: "flex",
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    paddingLeft: 40,
    paddingTop: 40,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    fontFamily: "UbuntuBold",
    paddingBottom: 10,
  },
  ownername: {
    fontSize: 20,
    color: "#fffffc",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowColor: "#004365",
    shadowOffset: {
      height: 5,
      width: 0,
    },
    fontFamily: "Ubuntu",
    alignSelf: "center",
    flex: 1,
    textTransform: "capitalize",
  },
  datetime: {
    fontSize: 15,
    color: "white",
    fontFamily: "Ubuntu",
  },
  edit: {
    borderRadius: 10,
  },
  profileName: {
    justifyContent: "center",
    paddingTop: 6,
    fontSize: 20,
    fontFamily: "Ubuntu",
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
  usersimage: {
    height: 50,
    width: 50,
    borderRadius: "50%",
  },
  spotted: {
    fontSize: 12,
    color: "black",
    fontFamily: "UbuntuBold",
  },
  spottedview: {
    borderRadius: "50%",
    height: 35,
    width: 35,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginLeft: -5,
  },
});
