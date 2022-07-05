import { observer } from "mobx-react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { baseURL } from "../../stores/instance";

function Category({ category }) {
  return (
    <View>
      <TouchableOpacity
        style={styles.card}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        activeOpacity={0.99}
      >
        <Text style={styles.thumb}>{category.image}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{category.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default observer(Category);

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    justifyContent: "center",
    padding:"5%"
  },
  thumb: {
    alignSelf: "center",
    width: 100,
    height: 80,
    borderRadius: 20,
    zIndex: -1,
    opacity: 1,
  },
  infoContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    width: 384,
    height: 100,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 10,
  },
  name: {
    fontSize: 22,
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
