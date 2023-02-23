import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Modal,
  SafeAreaView
} from "react-native";
import OrganizerSpot from "../screens/spots/OrganizerSpot";
import { observer } from "mobx-react";
import { baseURL } from "../stores/instance";
import { useNavigation } from "@react-navigation/native";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { useFonts } from "expo-font";

import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";
import authStore from "../stores/authStore";

function OrganizerProfile({ route }) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const organizer = route.params.organizer;
  const spots = organizer.spots.filter(spot.isPublished === true)
  const [notifications, setNotifications] = useState(() => {
    try {
      return authStore?.user?.organizers?.includes(organizer?._id) ? "notifications-off" : "notifications";
    } catch (error) {
      return "profile";
    }
  });
  const [notificationsColor, setNotificationsColor] = useState(() => {
    try {
      return authStore?.user?.organizers?.includes(organizer?._id) ? "#e52b51" : colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b"
    } catch (error) {
      return colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b";
    }
  });

  const [visibleEnable, setVisibleEnable] = useState(false);
  const toggleAlertEnableNoti = useCallback(() => {
    setVisibleEnable(!visibleEnable);
  }, [visibleEnable]);

  const [visibleReg, setVisibleReg] = useState(false);
  const toggleAlertReg = useCallback(() => {
    setVisibleReg(!visibleReg);
  }, [visibleReg]);

  const [visibleUnReg, setVisibleUnReg] = useState(false);
  const toggleAlertUnReg = useCallback(() => {
    setVisibleUnReg(!visibleUnReg);
  }, [visibleUnReg]);

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
    return <OrganizerSpot spot={spot} navigation={navigation} />;
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

  const registerUser = async () => {
    if(authStore.user.notificationToken === "") {
      toggleAlertEnableNoti()
    } else if(authStore?.user?.organizers?.includes(organizer?._id)) {
      console.log('in Un register')
      await authStore.unRegisterUser(organizer._id).then(
        setNotifications("notifications"), // inactive
        setNotificationsColor(colorScheme === "dark" ? "#f1f1f1" : "#1b1b1b"),
        toggleAlertUnReg()
      )
    } else if(!authStore?.user?.organizers?.includes(organizer?._id)) {
      console.log('in register')
      await authStore.registerUser(organizer._id).then(
        setNotifications("notifications-off"), // active
        setNotificationsColor("#e52b51"),
        toggleAlertReg()
      )
    }
  }

  return (
    <SafeAreaView
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
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            zIndex: 99,
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
            fontFamily: "UbuntuBold",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          {organizer?.username}
        </Text>
        <TouchableOpacity
          onPress={() => {
            registerUser()
          }}
          style={{
            zIndex: 99,
            margin: 20,
          }}
        >
           <Ionicons
              style={{
                color: notificationsColor,
                zIndex: 99,
                fontSize: 30,
                alignSelf:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "flex-start"
                    : "flex-end",
              }}
              name={
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? notifications
                  : notifications
              }
            ></Ionicons>
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
                resizeMode: "cover",
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
                ? "Dests"
                : "وجهة"}
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
            data={spots}
            renderItem={renderSpot}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>

                  {/* Enable Modal */}
      <Modal
        transparent={true}
        visible={visibleEnable}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
      > 
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "white",
              padding: 25,
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              borderColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                marginBottom: 30,
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
                ? "You Must Enable Notifications First!!"
                : "!! يجب عليك تفعيل الإخطارات أولاً"}
            </Text>
            <TouchableOpacity
                style={{
                  width: "50%",
                  backgroundColor: "#e52b51",
                  borderRadius: 50,
                  height: 40,
                  justifyContent: "center",
                }}
                onPress={() => toggleAlertEnableNoti()}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#f1f1f1",
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? "ok"
                  : "حسنا"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
                  {/* Enable Modal */}
                  {/* Registered */}
      <Modal
        transparent={true}
        visible={visibleReg}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
      > 
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "white",
              padding: 25,
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              borderColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                marginBottom: 30,
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
                ? "You'll Recieve a Notification Once this Organizer Posts a New Dest!!"
                : "!! ستتلقى إشعارًا بمجرد قيام المنظم بنشر وجهة جديدة"}
            </Text>
            <TouchableOpacity
                style={{
                  width: "50%",
                  backgroundColor: "#e52b51",
                  borderRadius: 50,
                  height: 40,
                  justifyContent: "center",
                }}
                onPress={() => toggleAlertReg()}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#f1f1f1",
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? "ok"
                  : "حسنا"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
                  {/* Registered */}
                  {/* Un Registered */}
      <Modal
        transparent={true}
        visible={visibleUnReg}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
      > 
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "white",
              padding: 25,
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              borderColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                marginBottom: 30,
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
                ? "You'll Stop Recieving Notifications from this Organizer"
                : "ستتوقف عن تلقي إشعارات من هذا المنظم"}
            </Text>
            <TouchableOpacity
                style={{
                  width: "50%",
                  backgroundColor: "#e52b51",
                  borderRadius: 50,
                  height: 40,
                  justifyContent: "center",
                }}
                onPress={() => toggleAlertUnReg()}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#f1f1f1",
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? "ok"
                  : "حسنا"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
                  {/* Un Registered */}
    </SafeAreaView>
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
    borderRadius: 50,
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
