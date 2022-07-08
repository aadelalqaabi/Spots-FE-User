import { observer } from "mobx-react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { baseURL } from "../../stores/instance";
import { useMediaQuery } from "native-base";
import { SharedElement } from "react-navigation-shared-element";
import moment from "moment";

function Spot({ spot, navigation }) {
  const [isSmallScreen] = useMediaQuery({
    minHeight: 180,
    maxHeight: 900,
  });

  let date = moment(spot.startDate).format("LL");

  let startAncestor;
  let startNode;
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
            source={{ uri: `${baseURL}${spot.image}` }}
          />

          <View style={styles.ownerContainer}>
            <Image
              style={styles.ownerthumb}
              source={{ uri: `${baseURL}${spot.organizer.image}` }}
            />
            <Text style={styles.ownername}>{spot.organizer.username}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{spot.name}</Text>
            <Text style={styles.datetime}>
              {date} at {spot.startTime}
            </Text>
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
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
  thumb: {
    marginTop: 19,
    alignSelf: "center",
    width: 354,
    height: 570,
    borderRadius: 20,
    zIndex: -1,
    opacity: 1,
  },
  ownerthumb: {
    marginTop: 19,
    alignSelf: "center",
    width: 45,
    height: 45,
    borderRadius: "50%",
    zIndex: -1,
    opacity: 1,
    marginRight: 7,
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
    marginTop: 19,
    alignSelf: "center",
    width: 45,
    height: 45,
    borderRadius: "50%",
    zIndex: -1,
    opacity: 1,
    marginRight: 7,
  },
  infoContainer: {
    display: "flex",
    position: "absolute",
    alignSelf: "flex-end",
    width: 384,
    height: 130,
    paddingLeft: 28,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 10,
  },
  priceContainer: {
    display: "flex",
    position: "absolute",
    alignSelf: "flex-end",
    width: 384,
    height: 130,
    paddingLeft: 28,
    paddingBottom: 40,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 10,
  },
  isFree: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fffffc",
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    alignSelf: "center",
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
    position: "absolute",
    alignSelf: "flex-end",
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    paddingBottom: 485,
    paddingLeft: 28,
    margin: 10,
  },

  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fffffc",
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  ownername: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fffffc",
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  datetime: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fffffc",
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
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
