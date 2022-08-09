import { observer } from "mobx-react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { baseURL } from "../../stores/instance";
import { useFonts } from "expo-font";
import moment from "moment";
import AppLoading from "expo-app-loading";

function SearchSpot({ spot, navigation }) {
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  let month = moment(spot?.startDate).format("MMM");
  let day = moment(spot?.startDate).format("DD");

  return (
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
          backgroundColor: "white",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 12,
          borderRadius: 15,
          shadowColor: "#161616",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.09,
          shadowRadius: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "UbuntuBold",
            fontSize: 23,
            color: "black",
          }}
        >
          {day}
        </Text>

        <Text
          style={{
            fontFamily: "Ubuntu",
            fontSize: 17,
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
          navigation.navigate("SpotDetails", { id: spot._id });
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
  );
}

export default observer(SearchSpot);

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-end",
    borderRadius: 16,
    shadowColor: "#161616",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
    fontFamily: "Ubuntu",
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
