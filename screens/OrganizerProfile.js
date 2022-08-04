import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import organizerStore from "../stores/organizerStore";
import spotStore from "../stores/spotStore";
import ProfileSpot from "../screens/spots/ProfileSpot";
import OrganizerSpot from "../screens/spots/OrganizerSpot";
import { observer } from "mobx-react";
import { baseURL } from "../stores/instance";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useState } from "react";

function OrganizerProfile({ route }) {
  const navigation = useNavigation();
  const [notification, setNotification] = useState();
  const organizer = organizerStore.getOrganizerById(route.params.organizer);

  // const organizerSpots = organizer.spots.map(spotId => spotStore.spots.find(spot => spot._id === spotId));
  function renderSpot({ item: spot }) {
    return <OrganizerSpot spot={spot} />;
  }

  const backButton = () => {
    navigation.navigate("Explore");
    console.log("back");
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          alignContent: "center",
          marginTop: 70,
        }}
      >
        <Ionicons
          style={{
            // position: "absolute",
            fontSize: 35,

            marginLeft: 20,
          }}
          name="chevron-back-outline"
          onPress={() => navigation.goBack()}
        ></Ionicons>
        <Text style={styles.profile}>{organizer?.username}</Text>
        <TouchableOpacity /*onPress={handleNotification}*/>
          {notification === false ? (
            <Fontisto
              style={{ alignSelf: "flex-end", marginRight: 20 }}
              name="bell-alt"
              size={24}
              color="grey"
            />
          ) : (
            <Fontisto
              style={{ alignSelf: "flex-end", marginRight: 20 }}
              name="bell-alt"
              size={24}
              color="#4831d4"
            />
          )}
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageUserNameEdit}>
          <View style={styles.imageUserName}>
            {organizer?.image === "" ? (
              <Image
                style={styles.profileImage}
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPWpbYe9c5YS6KNOXFWiawk-ox545j3ya978qwGXmcladr3eLFh6IabWhNFVtFRI0YNjI&usqp=CAU",
                }}
              />
            ) : (
              <Image
                style={styles.profileImage}
                source={{
                  uri: baseURL + organizer?.image,
                }}
              />
            )}
            <View style={styles.counter}>
              <Text style={styles.spotsNum}>{organizer?.spots?.length}</Text>
              <Text style={styles.spotsTitle}>Spots</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.bio}>{organizer?.bio}</Text>
          {/* <Text style={styles.bio}>
          🥇 1st Coding Academy in the Middle East 💻 Learn To Code Websites,
          Apps, & MORE 👩🏻‍🎓 Intensive Courses & Bootcamps 🚀 400+ Graduates Since
          2015
        </Text> */}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <FlatList
            style={styles.spotsList}
            contentContainerStyle={styles.spotsListContainer}
            data={organizer?.spots}
            renderItem={renderSpot}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
          <Text style={{ margin: 250, color: "white" }}>HELP</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
export default observer(OrganizerProfile);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  imageUserNameEdit: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    marginLeft: 30,
  },
  imageUserName: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    marginLeft: 20,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 20,
    paddingRight: 20,
    alignSelf: "center",
    width: 405,
    height: 180,
  },
  profile: {
    fontSize: 30,
    margin: 30,
    marginBottom: 10,
    marginTop: 15,
    fontFamily: "UbuntuBold",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150,
    marginRight: 75,
    alignItems: "center",
    alignSelf: "center",
  },
  spotsNum: {
    fontSize: 30,
    marginLeft: 8,
    fontWeight: "bold",
    fontFamily: "Ubuntu",
  },
  spotsTitle: {
    fontSize: 30,
    marginTop: -10,
  },
  counter: {
    alignItems: "center",
    alignSelf: "center",
    marginRight: 80,
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
    margin: 30,
    fontSize: 17,
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

  cancel: {
    marginLeft: 20,
    marginTop: 20,
    alignItems: "flex-start",
    // paddingLeft: 25,
  },
});

{
  /* <View style={styles.imageUserNameEdit}>
        <View style={styles.imageUserName}>
          {organizer.image ? (
            <Image
              style={styles.profileImage}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPWpbYe9c5YS6KNOXFWiawk-ox545j3ya978qwGXmcladr3eLFh6IabWhNFVtFRI0YNjI&usqp=CAU",
              }}
            />
          ) : (
            <Image
              style={styles.profileImage}
              source={{
                uri: baseURL + organizer.image,
                // uri: "https://yt3.ggpht.com/7-qLGZftqc4sDt0lfK3Hf5d3meDKr8d0CEouodYTZ1_Zost1xrmkZxgwhoHJeIjkbrvaodvsxw=s900-c-k-c0x00ffffff-no-rj",
              }}
            />
          )}
        </View>
      </View> */
}
