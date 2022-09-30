import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import OrganizerSpot from "../screens/spots/OrganizerSpot";
import { observer } from "mobx-react";
import { baseURL } from "../stores/instance";
import { useNavigation } from "@react-navigation/native";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

function OrganizerProfile({ route }) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [notification, setNotification] = useState();
  const organizer = route.params.organizer;
  function renderSpot({ item: spot }) {
    return <OrganizerSpot spot={spot} />;
  }
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu.ttf"),
    UbuntuLight: require("../assets/fonts/Ubuntu-Light.ttf"),
    Cabin: require("../assets/fonts/Cabin.ttf"),
    CabinMedium: require("../assets/fonts/CabinMedium.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          alignContent: "center",
          marginTop: 50,
        }}
      >
        <Ionicons
          style={{
            fontSize: 35,
            marginLeft: 20,
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          }}
          name="chevron-back-outline"
          onPress={() => navigation.goBack()}
        ></Ionicons>
        <Text
          style={{
            fontSize: 30,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 10,
            marginTop: 15,
            fontFamily: "UbuntuBold",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          {organizer?.username}
        </Text>
        <TouchableOpacity /*onPress={handleNotification}*/>
          {notification === false ? (
            <Fontisto
              style={{ alignSelf: "flex-end", marginRight: 20 }}
              name="bell-alt"
              size={24}
              color="#9279f7"
            />
          ) : (
            <Fontisto
              style={{ alignSelf: "flex-end", marginRight: 20 }}
              name="bell-alt"
              size={24}
              color="#9279f7"
            />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
        }}
      >
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
            <Text
              style={{
                fontSize: 35,
                fontFamily: "Ubuntu",
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              }}
            >
              {organizer?.spots?.length}
            </Text>
            <Text
              style={{
                fontSize: 25,
                fontFamily: "Ubuntu",
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              }}
            >
              Spots
            </Text>
          </View>
        </View>

        <View>
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontFamily: "Cabin",
              margin: 35,
              fontSize: 22,
              marginTop: 20,
              marginBottom: 20,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            }}
          >
            {organizer?.bio}
          </Text>
        </View>
        <View>
          <FlatList
            style={styles.spotsList}
            contentContainerStyle={styles.spotsListContainer}
            data={organizer?.spots}
            renderItem={renderSpot}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}
export default observer(OrganizerProfile);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  imageUserName: {
    display: "flex",
    justifyContent: "space-around",
    alignContent: "center",
    flexDirection: "row",
    margin: 20,
    backgroundColor: "transparent",
    borderRadius: 20,
    alignSelf: "center",
    width: "100%",
    height: 180,
  },
  profile: {
    fontSize: 30,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 10,
    marginTop: 15,
    fontFamily: "UbuntuBold",
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 150,
    alignItems: "center",
    alignSelf: "center",
    marginRight: 35,
  },
  spotsNum: {
    fontSize: 35,
    fontFamily: "Ubuntu",
  },
  spotsTitle: {
    fontSize: 25,
    fontFamily: "UbuntuLight",
  },
  counter: {
    alignItems: "center",
    alignSelf: "center",
    marginRight: 60,
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
    textAlign: "center",
    fontFamily: "Cabin",
    margin: 35,
    fontSize: 22,
    marginTop: 20,
    marginBottom: 20,
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
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
    zIndex: -1,
    opacity: 0.8,
  },
  spotsList: {
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
  },
  spotsListContainer: {
    backgroundColor: "transparent",
  },

  cancel: {
    marginLeft: 20,
    marginTop: 20,
    alignItems: "flex-start",
  },
});
