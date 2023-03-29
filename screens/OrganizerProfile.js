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
  SafeAreaView,
} from "react-native";
import OrganizerSpot from "../screens/spots/OrganizerSpot";
import { observer } from "mobx-react";
import { baseURL } from "../stores/instance";
import { useNavigation } from "@react-navigation/native";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import spotStore from "../stores/spotStore";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../MyAwesomeSplashScreen";
import authStore from "../stores/authStore";

function OrganizerProfile({ route }) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const organizer = route.params.organizer;
  const spots = spotStore.spots
    ?.filter((spot) => spot.organizer == organizer._id)
    .filter((spot) => spot.isPublished === true);
  const [notifications, setNotifications] = useState(() => {
    try {
      return authStore?.user?.organizers?.includes(organizer?._id)
        ? "notifications"
        : "notifications-off";
    } catch (error) {
      return "profile";
    }
  });
  const [notificationsColor, setNotificationsColor] = useState(() => {
    try {
      return authStore?.user?.organizers?.includes(organizer?._id)
        ? "#e52b51"
        : colorScheme === "light"
        ? "#d7d7d7"
        : "#515151";
    } catch (error) {
      return colorScheme === "light" ? "#d7d7d7" : "#515151";
    }
  });
  const [isNotification, setIsNotification] = useState(() => {
    try {
      return authStore?.user?.organizers?.includes(organizer?._id)
        ? true
        : false;
    } catch (error) {
      return false;
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
      dests: "Dests",
      notiOn: "Notifications On",
      notiOff: "Notifications Off",
    },
    ar: {
      more: "التفاصيل",
      dests: "وجهات",
      notiOn: "الاشعارات مفعلة",
      notiOff: "الاشعارات غير مفعلة",
    },
  };

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: translations,
    lng: Localization.locale,
    fallbackLng: true,
    interpolation: {
      escapeValue: false,
    },
  });

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
    return <View style={{ backgroundColor: "transparent" }}></View>;
  }

  const registerUser = async () => {
    if (authStore.user.notificationToken === "") {
      toggleAlertEnableNoti();
    } else if (authStore?.user?.organizers?.includes(organizer?._id)) {
      console.log("in Un register");
      await authStore.unRegisterUser(organizer._id).then(
        setNotifications("notifications-off"), // inactive
        setNotificationsColor(colorScheme === "light" ? "#d7d7d7" : "#515151"),
        setIsNotification(false),
        toggleAlertUnReg()
      );
    } else if (!authStore?.user?.organizers?.includes(organizer?._id)) {
      console.log("in register");
      await authStore.registerUser(organizer._id).then(
        setNotifications("notifications"), // active
        setNotificationsColor("#e52b51"),
        setIsNotification(true),
        toggleAlertReg()
      );
    }
  };

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
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "6%",
          marginBottom: "4%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            zIndex: 99,
            alignSelf:
              i18n.language.split("-")[0] === "en" ? "flex-start" : "flex-end",
            position: "absolute",
            marginLeft: 20,
            paddingRight: 20,
          }}
        >
          <Ionicons
            style={{
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              zIndex: 99,
              fontSize: 32,
            }}
            name={
              i18n.language.split("-")[0] === "en"
                ? "chevron-back-outline"
                : "chevron-forward-outline"
            }
          ></Ionicons>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            alignSelf: "center",
            fontSize: 28,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            width: "70%",
          }}
        >
          {i18n.language.split("-")[0] === "en"
            ? organizer.displayNameEn
            : organizer.displayNameAr}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            flexDirection:
              i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",

            height: 140,
            width: "100%",
            marginBottom: 10,
          }}
        >
          <View>
            {organizer?.image === "" ? (
              <Image
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 100,
                  alignItems: "center",
                  alignSelf: "center",
                }}
                source={require("../assets/PP.png")}
              />
            ) : (
              <Image
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 100,
                  alignItems: "center",
                  alignSelf: "center",
                }}
                source={{
                  uri: baseURL + organizer?.image,
                }}
              />
            )}
          </View>
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
                display: "flex",
                flexDirection:
                  i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
                alignContent: "center",
                justifyContent: "flex-start",
                marginBottom: i18n.language.split("-")[0] === "en" ? 6 : 3,
              }}
            >
              <Text
                style={{
                  fontSize: 32,
                  fontFamily: "Ubuntu",
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                  paddingLeft: i18n.language.split("-")[0] === "en" ? 0 : 8,
                  paddingRight: i18n.language.split("-")[0] === "en" ? 8 : 0,
                }}
              >
                {organizer?.spots?.length}
              </Text>
              <Text
                style={{
                  fontSize: 21,
                  fontFamily:
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
              >
                {i18n.language.split("-")[0] === "en" ? "Dest" : "ديست"}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: notificationsColor,
                height: 35,
                width: "80%",
                alignSelf: "center",
                borderRadius: 8,
                display: "flex",
                flexDirection:
                  i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => registerUser()}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection:
                    i18n.language.split("-")[0] === "en"
                      ? "row"
                      : "row-reverse",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  style={{
                    color:
                      colorScheme === "light"
                        ? !isNotification
                          ? "#1b1b1b"
                          : "#f1f1f1"
                        : "#f1f1f1",
                    zIndex: 99,
                    fontSize: 21,
                  }}
                  name={
                    i18n.language.split("-")[0] === "en"
                      ? notifications
                      : notifications
                  }
                ></Ionicons>
              </View>
              <Text
                style={{
                  color:
                    colorScheme === "light"
                      ? !isNotification
                        ? "#1b1b1b"
                        : "#f1f1f1"
                      : "#f1f1f1",
                  fontSize: 19,
                  marginLeft: i18n.language.split("-")[0] === "en" ? 8 : 0,
                  marginRight: i18n.language.split("-")[0] === "en" ? 0 : 8,
                  marginTop: -2,
                  fontFamily:
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                }}
              >
                {isNotification === true
                  ? i18n.language.split("-")[0] === "en"
                    ? "Notifications on"
                    : "الاشعارات مفعلة"
                  : i18n.language.split("-")[0] === "en"
                  ? "Notifications off"
                  : "الاشعارات غير مفعلة"}
              </Text>
            </TouchableOpacity>
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
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.language.split("-")[0] === "en"
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
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.language.split("-")[0] === "en" ? "ok" : "حسنا"}
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
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 20,
              }}
            >
              {i18n.language.split("-")[0] === "en"
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
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.language.split("-")[0] === "en" ? "ok" : "حسنا"}
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
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.language.split("-")[0] === "en"
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
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.language.split("-")[0] === "en" ? "ok" : "حسنا"}
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
