import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
  LogBox,
  useColorScheme,
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
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import React from "react";
import pointStore from "../stores/pointStore";
import ScrollTabs from "../ScrollTabs";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
LogBox.ignoreAllLogs();

function Profile() {
  const colorScheme = useColorScheme();
  // let num = 1;
  // const spotId = route?.params?.id;
  //if (spotId) {
  //  pointStore.createPoint(spotId);
  //}
  const navigation = useNavigation();
  let userSpotIds = [];
  const userPoints = pointStore.points
    .filter(
      (point) =>
        // spotStore.getSpotsById(spotId)
        authStore.user.id === point.user
    )
    .map((point) => userSpotIds.push(point.spot));
  const userSpots = userSpotIds.map((spotId) => spotStore.getSpotsById(spotId));
  //const found = userSpots?.some((spot) => spot?._id === spotId);
  //if (!found && num === 1) {
  // authStore.spotAdd(spotId);
  //num--;
  //}
  const translations = {
    en: {
      spots: "Spots",
    },
    ar: {
      spots: "نقاطي",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu.ttf"),
    Noto: require("../assets/fonts/Noto.ttf"),
    NotoBold: require("../assets/fonts/NotoBold.ttf"),
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
    <SafeAreaView
      style={{
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            margin: 30,
            marginBottom: 10,
            marginTop: 15,
            fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          {authStore.user.username}
        </Text>
        <Menu>
          <MenuTrigger text="-" customStyles={triggerStyles} />
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
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
          marginBottom: 10,
          marginRight: 80,
          marginLeft: 40,
          borderRadius: 20,
          height: 180,
        }}
      >
        {authStore.user.image === "" ? (
          <Image
            style={{
              width: 150,
              height: 150,
              borderRadius: 150,
              alignItems: "center",
              alignSelf: "center",
            }}
            source={require("../assets/PP.jpeg")}
          />
        ) : (
          <Image
            style={{
              width: 150,
              height: 150,
              borderRadius: 150,
              alignItems: "center",
              alignSelf: "center",
            }}
            source={{
              uri: baseURL + authStore.user.image,
            }}
          />
        )}
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              fontFamily: "Ubuntu",
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            }}
          >
            {userSpots?.length}
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            }}
          >
            {i18n.t("spots")}
          </Text>
        </View>
      </View>
      <View style={{ height: "100%" }}>
        <ScrollTabs userSpots={userSpots} />
      </View>
    </SafeAreaView>
  );
}
export default observer(Profile);

const styles = StyleSheet.create({
  imageUserNameEdit: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
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
  visited: {
    fontSize: 25,
    margin: 30,
    marginTop: 0,
    marginBottom: 10,
    fontFamily: "Ubuntu",
  },
});
