import { observer } from "mobx-react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { baseURL } from "../../stores/instance";
import { useMediaQuery } from "native-base";

function Spot({ spot }) {
  const [isSmallScreen] = useMediaQuery({
    minHeight: 180,
    maxHeight: 900,
  });
  return (
    <View>
      <TouchableOpacity
        style={styles.card}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        activeOpacity={0.95}
      >
        {isSmallScreen ? (
          <>
            <Image
              style={styles.sthumb}
              source={{ uri: `${baseURL}${spot.image}` }}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{spot.name}</Text>
            </View>
          </>
        ) : (
          <>
            <Image
              style={styles.thumb}
              source={{ uri: `${baseURL}${spot.image}` }}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{spot.name}</Text>
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
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
  sthumb: {
    marginTop: 12,
    alignSelf: "center",
    width: 354,
    height: 500,
    borderRadius: 20,
    zIndex: -1,
    opacity: 1,
  },
  infoContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    width: 384,
    height: 100,
    paddingLeft: 28,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 10,
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
