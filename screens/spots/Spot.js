import { observer } from "mobx-react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { baseURL } from "../../stores/instance";

function Spot({ spot }) {
  return (
    <View>
      <TouchableOpacity
        style={styles.card}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Image
          style={styles.thumb}
          source={{ uri: `${baseURL}${spot.image}` }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{spot.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default observer(Spot);

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
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
    height: 600,
  },
  thumb: {
    alignSelf: "center",
    width: 384,
    height: 600,
    borderRadius: 20,
    margin: 10,
    zIndex: -1,
    opacity: 0.7,
  },
  infoContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    paddingLeft: 28,
    paddingBottom: 22,
  },
  name: {
    fontSize: 34,
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
