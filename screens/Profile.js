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
  LogBox,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import spotStore from "../stores/spotStore";
import authStore from "../stores/authStore";
import { observer } from "mobx-react";
import { baseURL } from "../stores/instance";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useState, useEffect } from "react";
import ProfileSpot from "./spots/ProfileSpot";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
LogBox.ignoreAllLogs();

function Profile({ route }) {
  const spotId = route.params?.spotId;
  const navigation = useNavigation();
  const userSpots = authStore.user.spots.map((spotId) =>
    spotStore.spots.find((spot) => spot._id === spotId)
  );
  const found = userSpots.some((spot) => spot._id === spotId);
  if (!found) {
    authStore.spotAdd(spotId);
  }
  function renderSpot({ item: spot }) {
    return <ProfileSpot spot={spot} navigation={navigation} />;
  }
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const triggerStyles = {
    triggerText: {
      fontSize: 35,
      margin: 30,
      marginBottom: 10,
      marginTop: 0,
      fontFamily: "Ubuntu",
    },
    triggerWrapper: {},
    triggerTouchable: {
      activeOpacity: 70,
    },
  };
  const optionsStyles = {
    optionsContainer: {
      padding: 10,
      marginTop: 50,
      width: 150,
    },
    optionText: {
      fontSize: 20,
    },
    optionWrapper: {
      borderBottomWidth: 0.3,
      borderColor: "lightgrey",
    },
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.profile}>{authStore.user.username}</Text>

        <Menu>
          <MenuTrigger text="..." customStyles={triggerStyles} />
          <MenuOptions customStyles={optionsStyles}>
            <MenuOption
              onSelect={() => navigation.navigate("Edit")}
              text="Edit"
            />
            <MenuOption
              customStyles={{
                optionWrapper: {
                  borderBottomWidth: 0,
                },
              }}
              onSelect={() =>
                Alert.alert("Do You Want to Logout?", "", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: "OK", onPress: () => authStore.logout() },
                ])
              }
            >
              <Text
                style={{ color: "red", fontFamily: "Ubuntu", fontSize: 20 }}
              >
                Logout
              </Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={styles.imageUserNameEdit}>
          <View style={styles.imageUserName}>
            {authStore.user.image === "" ? (
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
                  uri: baseURL + authStore.user.image,
                }}
              />
            )}
            <View style={styles.counter}>
              <Text style={styles.spotsNum}>{authStore.user.spots.length}</Text>
              <Text style={styles.spotsTitle}>Spots</Text>
            </View>
          </View>
        </View>

        <Text style={styles.visited}>Visited Spots</Text>

        <FlatList
          nestedScrollEnabled={true}
          style={styles.spotsList}
          contentContainerStyle={styles.spotsListContainer}
          data={userSpots}
          renderItem={renderSpot}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={{ margin: 200, color: "white" }}>HELP</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
export default observer(Profile);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  imageUserNameEdit: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
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
    fontSize: 25,
    marginLeft: 8,
    fontFamily: "Ubuntu",
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
  counter: {
    alignItems: "center",
    alignSelf: "center",
    marginRight: 80,
  },
  visited: {
    fontSize: 25,
    margin: 30,
    marginTop: 0,
    marginBottom: 10,
    fontFamily: "Ubuntu",
  },
});
