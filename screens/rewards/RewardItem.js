import {
  useColorScheme,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { baseURL } from "../../stores/instance";
import { useFonts } from "expo-font";
import Modal from "react-native-modal";
import pointStore from "../../stores/pointStore";
import authStore from "../../stores/authStore";
import rewardStore from "../../stores/rewardStore";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import * as Localization from "expo-localization";
import { useNavigation } from "@react-navigation/native";
import spotStore from "../../stores/spotStore";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

function RewardItem({ reward, onRefresh }) {
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      explore: "Explore",
    },
    ar: {
      explore: "اكتشف",
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

  const spot = spotStore.getSpotsById(reward.spot);
  let userRewards = rewardStore.rewards.filter((rewardo) =>
    rewardo.users.includes(authStore.user.id)
  );
  let found = userRewards.some((rewardo) => rewardo._id === reward._id);
  let myPoints = pointStore.points.find(
    (point) => point?.user === authStore.user.id && point?.spot === reward?.spot
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await pointStore.fetchPoints();
        await rewardStore.fetchRewards();
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Cabin: require("../../assets/fonts/Cabin.ttf"),
    CabinMedium: require("../../assets/fonts/CabinMedium.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  if (!fontsLoaded) {
    return <View style={{ backgroundColor: "transparent" }}></View>;
  }

  const handleClaim = async () => {
    await pointStore.updatePoint(myPoints.amount - reward.points, myPoints._id);
    await rewardStore.userAdd(reward._id);
    await pointStore.fetchPoints();
    await rewardStore.fetchRewards();
    await spotStore.fetchSpots();
    toggleModal();
  };

  return (
    <View style={{ margin: 20, marginRight: -5 }}>
      <TouchableOpacity onPress={toggleModal}>
        <View>
          <Image
            style={styles.thumb}
            source={{ uri: `${baseURL}${reward?.image}` }}
          />
          <View
            style={{
              position: "absolute",
              margin: 8,
              right: 0,
              backgroundColor: "#e52b51",
              padding: 10,
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 40,
              alignSelf:
                i18n.language.split("-")[0] === "en"
                  ? "flex-start"
                  : "flex-end",
            }}
          >
            <Text style={styles.pointsAmount}>{reward?.points}</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text
            style={{
              textTransform: "capitalize",
              marginTop: 10,
              marginRight: -20,
              fontSize: 22,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              alignSelf:
                i18n.language.split("-")[0] === "en"
                  ? "flex-start"
                  : "flex-end",
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? reward?.title
              : reward.titleAr}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text
            style={{
              marginTop: 10,
              marginRight: -20,
              fontSize: 18,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Cabin" : "Noto",
              alignSelf:
                i18n.language.split("-")[0] === "en"
                  ? "flex-start"
                  : "flex-end",
              width: 300,
              lineHeight: 25,
              textAlign:
                i18n.language.split("-")[0] === "en" ? "left" : "right",
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? reward?.description
              : reward?.descriptionAr}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={{ height: "100%" }}
        >
          {!found ? (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: 30,
                height: "40%",
                width: "105%",
                display: "flex",
              }}
            >
              <Text
                style={{
                  fontFamily:
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  fontSize: 30,
                  alignSelf: "center",
                  textAlign: "center",
                  margin: i18n.language.split("-")[0] === "en" ? 10 : 0,
                }}
              >
                {i18n.language.split("-")[0] === "en"
                  ? reward.title
                  : reward.titleAr}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection:
                    i18n.language.split("-")[0] === "en"
                      ? "row"
                      : "row-reverse",
                  alignSelf: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "UbuntuBold",
                      fontSize: 25,
                      alignSelf:
                        i18n.language.split("-")[0] === "en"
                          ? "flex-start"
                          : "flex-end",
                      margin: 35,
                      marginTop: 15,
                      marginBottom: 0,
                    }}
                  >
                    {reward.points}
                  </Text>
                  <Text
                    style={{
                      fontFamily:
                        i18n.language.split("-")[0] === "en"
                          ? "Ubuntu"
                          : "Noto",
                      fontSize: 18,
                      alignSelf: "flex-start",
                      margin: 35,
                      marginTop: i18n.language.split("-")[0] === "en" ? 2 : -2,
                      marginBottom: 0,
                      color: "#7a797a",
                    }}
                  >
                    {i18n.language.split("-")[0] === "en"
                      ? "Reward Points"
                      : "نقاط المكافأة"}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "UbuntuBold",
                      fontSize: 25,
                      alignSelf:
                        i18n.language.split("-")[0] === "en"
                          ? "flex-start"
                          : "flex-end",
                      margin: 35,
                      marginTop: 15,
                      marginBottom: 0,
                    }}
                  >
                    {myPoints?.amount}
                  </Text>
                  <Text
                    style={{
                      fontFamily:
                        i18n.language.split("-")[0] === "en"
                          ? "Ubuntu"
                          : "Noto",
                      fontSize: 18,
                      alignSelf: "flex-start",
                      margin: 35,
                      marginTop: i18n.language.split("-")[0] === "en" ? 2 : -2,
                      marginBottom: 0,
                      color: "#7a797a",
                    }}
                  >
                    {i18n.language.split("-")[0] === "en"
                      ? "Your Points"
                      : "نقاطك حاليا"}
                  </Text>
                </View>
              </View>
              {myPoints?.amount < reward.points ? (
                <Text
                  style={{
                    fontFamily:
                      i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                    textAlign:
                      i18n.language.split("-")[0] === "en" ? "left" : "right",
                    fontSize: 20,
                    alignSelf: "center",
                    margin: 35,
                    marginTop: 20,
                    paddingTop: 3,
                    marginBottom: 25,
                    color: "#cc0000",
                    lineHeight: 30,
                  }}
                >
                  {i18n.language.split("-")[0] === "en"
                    ? `You Need ${
                        reward.points - myPoints?.amount
                      } more points to claim`
                    : `تحتاج ${
                        reward.points - myPoints?.amount
                      } نقطة اكثر للتحصيل`}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "Ubuntu",
                    fontSize: 20,
                    alignSelf: "center",
                    margin: 20,
                    color: "#009900",
                    lineHeight: 30,
                  }}
                >
                  {i18n.language.split("-")[0] === "en"
                    ? "You can claim this reward now!"
                    : "تستطيع الحصول على هذه الجائزة!"}
                </Text>
              )}
              {myPoints?.amount >= reward.points ? (
                <>
                  <TouchableOpacity style={styles.button} onPress={handleClaim}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontFamily: "Ubuntu",
                        width: "60%",
                        textAlign: "center",
                      }}
                    >
                      {i18n.language.split("-")[0] === "en"
                        ? "Claim"
                        : "الحصول الآن"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                    }}
                    onPress={toggleModal}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "Ubuntu",
                        color: "#e52b51",
                      }}
                    >
                      {i18n.language.split("-")[0] === "en" ? "Close" : "اغلاق"}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <View style={styles.disbutton}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontFamily: "Ubuntu",
                        textAlign: "center",
                      }}
                    >
                      {i18n.language.split("-")[0] === "en"
                        ? "Claim"
                        : "الحصول الآن"}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                    }}
                    onPress={toggleModal}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "Ubuntu",
                        color: "#e52b51",
                      }}
                    >
                      {i18n.language.split("-")[0] === "en" ? "Close" : "اغلاق"}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          ) : (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 40,
                  height: 240,
                  width: 400,
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 40,
                  paddingTop: i18n.language.split("-")[0] === "en" ? 40 : 30,
                }}
              >
                <Text
                  style={{
                    fontFamily:
                      i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                    fontSize: 25,
                    alignSelf: "center",
                  }}
                >
                  {i18n.language.split("-")[0] === "en"
                    ? reward.title
                    : reward.titleAr}
                </Text>
                <Text
                  style={{
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 40,
                    alignSelf: "center",
                    textAlign: "center",
                  }}
                >
                  {i18n.language.split("-")[0] === "en"
                    ? "Already claimed"
                    : "تم التحصيل"}
                </Text>
                <TouchableOpacity
                  style={{ marginTop: 10 }}
                  onPress={toggleModal}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Ubuntu",
                      color: "#e52b51",
                    }}
                  >
                    {i18n.language.split("-")[0] === "en" ? "Close" : "اغلاق"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modal>
      </View>
    </View>
  );
}
export default observer(RewardItem);

const styles = StyleSheet.create({
  thumb: {
    alignSelf: "flex-start",
    width: 310,
    height: 200,
    borderRadius: 10,
  },
  titleContainer: {
    alignSelf: "flex-start",
    width: "90%",
  },
  descriptionContainer: {
    alignSelf: "flex-start",
    width: "90%",
  },
  name: {
    textTransform: "capitalize",
    marginTop: 10,
    fontSize: 22,
    color: "black",
    fontFamily: "UbuntuBold",
  },
  pointsAmount: {
    textTransform: "capitalize",
    fontSize: 18,
    color: "white",
    fontFamily: "UbuntuBold",
  },
  description: {
    marginTop: 10,
    fontSize: 18,
    color: "black",
    fontFamily: "Cabin",
    width: 300,
    lineHeight: 25,
  },
  heading: {
    fontFamily: "Ubuntu",
    fontSize: 30,
    alignSelf: "center",
    margin: 35,
    marginTop: 45,
  },
  button: {
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#e52b51",
    width: "75%",
    height: 55,
    alignSelf: "center",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  disbutton: {
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#e52b51",
    opacity: 0.6,
    width: "75%",
    height: 55,
    alignSelf: "center",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  points: {
    fontFamily: "UbuntuBold",
    fontSize: 25,
    alignSelf: "flex-start",
    margin: 35,
    marginTop: 2,
    marginBottom: 0,
  },
  pointsTitle: {
    fontFamily: "Ubuntu",
    fontSize: 18,
    alignSelf: "flex-start",
    margin: 35,
    marginTop: 2,
    marginBottom: 0,
    color: "#7a797a",
  },
  pointsNotEnough: {
    fontFamily: "Ubuntu",
    fontSize: 20,
    alignSelf: "center",
    margin: 35,
    marginTop: 30,
    marginBottom: 25,
    color: "#cc0000",
    lineHeight: 30,
  },
  claimNow: {
    fontFamily: "Ubuntu",
    fontSize: 20,
    alignSelf: "center",
    margin: 35,
    marginTop: 30,
    marginBottom: 25,
    color: "#009900",
    lineHeight: 30,
  },
  pointsNotEnoughNum: {
    fontFamily: "Ubuntu",
    fontSize: 20,
    alignSelf: "center",
    margin: 35,
    marginTop: 30,
    marginBottom: 25,
    color: "#cc0000",
  },
});
