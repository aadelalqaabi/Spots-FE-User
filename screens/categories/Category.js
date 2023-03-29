import { observer } from "mobx-react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { baseURL } from "../../stores/instance";

function Category({ category }) {
  return (
    <TouchableOpacity
      style={styles.card}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      activeOpacity={0.99}
    >
      <Image
        style={styles.thumb}
        source={{ uri: `${baseURL}${category.image}` }}
      ></Image>
      <Button style={styles.name}>{category.name}</Button>
    </TouchableOpacity>
  );
}

export default observer(Category);

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    justifyContent: "center",
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
    paddingTop: 45,
    paddingLeft: 10,
    fontSize: 18,
    color: "black",
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: "white",
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
