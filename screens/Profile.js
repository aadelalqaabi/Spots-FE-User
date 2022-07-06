import {
  Text,
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import spotStore from "../stores/spotStore";
import authStore from "../stores/authStore";
import { observer } from "mobx-react";
import { baseURL } from "../stores/instance";
import DropDownPicker from "react-native-dropdown-picker";
import { useState, useEffect } from "react";
import ProfileSpot from "./spots/ProfileSpot";
import Logout from "./authScreens/Logout";

function Profile() {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Edit", value: "edit" },
    { label: "🏃‍♂️", value: "logout" },
    { label: "Help", value: "help" },
  ]);

  if (value === "edit") {
    navigation.navigate("Edit");
    console.log("Edit");
    setValue(null);
  } else if (value === "logout") {
    Alert.alert(
      "Do You Wan't to LOGOUT?",
      "You Will Be able to Log back in later!!!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => authStore.logout() },
      ]
    );

    setValue(null);
  } else if (value === "logout") {
    console.log("help");
  }

  const userSpots = authStore.user.spots.map((spotId) =>
    spotStore.spots.find((spot) => spot._id === spotId)
  );
  function renderSpot({ item: spot }) {
    return <ProfileSpot spot={spot} navigation={navigation} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ position: "relative", alignSelf: "flex-end", margin: 10 }}>
        <Logout />
        <DropDownPicker
          label="..."
          style={{
            borderRadius: 30,
            borderWidth: 0,
            width: 100,
            backgroundColor: "#00000000",
            alignSelf: "flex-end",
            height: 60,
          }}
          dropDownContainerStyle={{
            borderWidth: 0,
            borderRadius: 10,
          }}
          showTickIcon={false}
          showArrowIcon={false}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="..."
          placeholderStyle={{
            fontSize: 50,
            paddingBottom: 10,
          }}
        />
      </View>
      <Text style={styles.profile}>{authStore.user.username}</Text>
      <View style={styles.imageUserNameEdit}>
        <View style={styles.imageUserName}>
          <Image
            style={styles.profileImage}
            source={{
              uri: baseURL + authStore.user.image,
            }}
          />
          <Text style={styles.spotsNum}>{authStore.user.spots.length}</Text>
          <Text style={styles.spotsTitle}>Spots</Text>
        </View>
        {/* {userSpots.map(spot=><Text style={styles.spotsTitle}>{spot.name}</Text> */}
      </View>
      <FlatList
        style={styles.spotsList}
        contentContainerStyle={styles.spotsListContainer}
        data={userSpots}
        renderItem={renderSpot}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      ></ScrollView>
    </SafeAreaView>
  );
}
export default observer(Profile);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    //margin: 12,
    backgroundColor: "white",
  },
  imageUserNameEdit: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  imageUserName: {
    justifyContent: "flex-Start",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    marginLeft: 2,
  },
  profile: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 75,
    marginLeft: 28,
    fontSize: 30,
    alignSelf: "flex-start",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 150,
    marginRight: 105,
    marginLeft: 102,
    marginTop: 60,
    borderWidth: 2,
  },
  spotsNum: {
    fontSize: 30,
    marginTop: 30,
    fontWeight: "bold",
  },
  spotsTitle: {
    fontSize: 30,
    marginTop: -10,
    // fontWeight: "bold",
  },
  edit: {
    borderRadius: 10,
    position: "absolute",
    marginTop: 360,
    marginLeft: "16%",
    backgroundColor: "#e7e7e7",
    borderRadius: "50%",
    justifyContent: "center",
    paddingLeft: 80,
    paddingRight: 80,
  },
  bio: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "justify",
    margin: 12,
    padding: 10,

    paddingTop: 2,
    paddingBottom: 15,
    fontSize: 9,
  },
  bioText: {
    fontSize: 17,
    paddingBottom: 20,
  },
  tripList: {
    grid: 2,
    gridtemplate: "c1 c2",
  },
  imageCard: {
    // alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
    zIndex: -1,
    opacity: 0.8,
  },
  spotsList: {
    backgroundColor: "#fffffc",
    height: "100%",
    width: "100%",
  },
  spotsListContainer: {
    backgroundColor: "#fffffc",
  },
});
