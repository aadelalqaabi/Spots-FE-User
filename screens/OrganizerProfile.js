import {
  StyleSheet,
  Text,
  View,
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

import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";

function OrganizerProfile({ route }) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [notification, setNotification] = useState();
  const organizer = route.params.organizer;
  const translations = {
    en: {
      more: "More Info",
    },
    ar: {
      more: "التفاصيل",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  function renderSpot({ item: spot }) {
    return <OrganizerSpot spot={spot} />;
  }
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../assets/fonts/Ubuntu.ttf"),
    UbuntuLight: require("../assets/fonts/Ubuntu-Light.ttf"),
    Cabin: require("../assets/fonts/Cabin.ttf"),
    CabinMedium: require("../assets/fonts/CabinMedium.ttf"),
    Noto: require("../assets/fonts/Noto.ttf"),
    NotoBold: require("../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
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
          flexDirection:
            i18n.locale === "en-US" || i18n.locale === "en"
              ? "row"
              : "row-reverse",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            zIndex: 99,
            position: "absolute",
            width: "100%",
          }}
        >
          <Ionicons
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              zIndex: 99,
              fontSize: 35,
              margin: 20,
              alignSelf:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "flex-start"
                  : "flex-end",
            }}
            name={
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "chevron-back-outline"
                : "chevron-forward-outline"
            }
          ></Ionicons>
        </TouchableOpacity>
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
              style={{
                backgroundColor:
                  colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                width: 180,
                height: 180,
                borderRadius: 150,
                alignItems: "center",
                alignSelf: "center",
                marginRight: 35,
              }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPWpbYe9c5YS6KNOXFWiawk-ox545j3ya978qwGXmcladr3eLFh6IabWhNFVtFRI0YNjI&usqp=CAU",
              }}
            />
          ) : (
            <Image
              style={{
                backgroundColor:
                  colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                width: 180,
                height: 180,
                borderRadius: 150,
                alignItems: "center",
                alignSelf: "center",
                marginRight: 35,
                resizeMode: "contain",
              }}
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
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
                ? "Spots"
                : "نقاط"}
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
    backgroundColor: "white",
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
