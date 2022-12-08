import { useColorScheme, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { baseURL } from "../../stores/instance";
import { useFonts } from "expo-font";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import pointStore from "../../stores/pointStore";
import authStore from "../../stores/authStore";
import rewardStore from "../../stores/rewardStore";
import { I18n } from "i18n-js";
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
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;

  const spot = spotStore.getSpotsById(reward.spot);
  let userRewards = rewardStore.rewards.filter((rewardo) =>
    rewardo.users.includes(authStore.user.id)
  );
  let found = userRewards.some((rewardo) => rewardo._id === reward._id);
  let myPoints = pointStore.points.find(
    (point) => point?.user === authStore.user.id && point?.spot === reward?.spot
  );

  useEffect(() => {
    authStore.checkForToken();
    pointStore.fetchPoints();
    rewardStore.fetchRewards();
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
    return <MyAwesomeSplashScreen />;
  }

  const handleClaim = async () => {
    pointStore.updatePoint(myPoints.amount - reward.points, myPoints._id);
    await rewardStore.userAdd(reward._id);
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
              backgroundColor: "#9279f7",
              padding: 10,
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: "40%",
              alignSelf:
                i18n.locale === ("en-US" || "en") ? "flex-start" : "flex-end",
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
                i18n.locale === ("en-US" || "en") ? "UbuntuBold" : "NotoBold",
              alignSelf:
                i18n.locale === ("en-US" || "en") ? "flex-start" : "flex-end",
            }}
          >
            {i18n.locale === ("en-US" || "en") ? reward?.title : reward.titleAr}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text
            style={{
              marginTop: 10,
              marginRight: -20,
              fontSize: 18,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              fontFamily: i18n.locale === ("en-US" || "en") ? "Cabin" : "Noto",
              alignSelf:
                i18n.locale === ("en-US" || "en") ? "flex-start" : "flex-end",
              width: 300,
              lineHeight: 25,
              textAlign: i18n.locale === ("en-US" || "en") ? "left" : "right",
            }}
          >
            {i18n.locale === ("en-US" || "en")
              ? reward?.description
              : reward?.descriptionAr}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={{ height: 450 }}
        >
          {!found ? (
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
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  borderRadius: 40,
                  height: "68%",
                  width: "105%",
                  display: "flex",
                }}
              >
                <Ionicons
                  style={{
                    color: "#aba9aa",
                    opacity: 0.9,
                    fontSize: 35,
                    zIndex: 99,
                    position: "absolute",
                    top: 0,
                    right: 0,
                    margin: 20,
                    marginTop: 15,
                  }}
                  name="close-outline"
                  onPress={toggleModal}
                ></Ionicons>

                <Text
                  style={{
                    fontFamily:
                      i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
                    fontSize: 30,
                    alignSelf: "center",
                    // margin: i18n.locale === ("en-US" || "en")  ? 35 : 10,
                    // marginTop: i18n.locale === ("en-US" || "en")  ? 10 : 35,
                  }}
                >
                  {i18n.locale === ("en-US" || "en")
                    ? reward.title
                    : reward.titleAr}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection:
                      i18n.locale === ("en-US" || "en") ? "row" : "row-reverse",
                    alignSelf: "center",
                    marginTop: -10,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontFamily: "UbuntuBold",
                        fontSize: 25,
                        alignSelf:
                          i18n.locale === ("en-US" || "en")
                            ? "flex-start"
                            : "flex-end",
                        margin: 35,
                        // marginTop: 2,
                        marginBottom: 0,
                      }}
                    >
                      {reward.points}
                    </Text>
                    <Text
                      style={{
                        fontFamily:
                          i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
                        fontSize: 18,
                        alignSelf: "flex-start",
                        margin: 35,
                        marginTop: i18n.locale === ("en-US" || "en") ? 2 : -2,
                        marginBottom: 0,
                        color: "#7a797a",
                      }}
                    >
                      {i18n.locale === ("en-US" || "en")
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
                          i18n.locale === ("en-US" || "en")
                            ? "flex-start"
                            : "flex-end",
                        margin: 35,
                        //marginTop: 2,
                        marginBottom: 0,
                      }}
                    >
                      {myPoints?.amount}
                    </Text>
                    <Text
                      style={{
                        fontFamily:
                          i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
                        fontSize: 18,
                        alignSelf: "flex-start",
                        margin: 35,
                        marginTop: i18n.locale === ("en-US" || "en") ? 2 : -2,
                        marginBottom: 0,
                        color: "#7a797a",
                      }}
                    >
                      {i18n.locale === ("en-US" || "en")
                        ? "Your Points"
                        : "نقاطك حاليا"}
                    </Text>
                  </View>
                </View>
                {myPoints?.amount < reward.points ? (
                  <Text
                    style={{
                      fontFamily:
                        i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
                      textAlign:
                        i18n.locale === ("en-US" || "en") ? "left" : "right",
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
                    {i18n.locale === ("en-US" || "en") ? "You Need" : "تحتاج"}{" "}
                    {
                      <Text style={styles.pointsNotEnoughNum}>
                        {reward.points - myPoints?.amount}
                      </Text>
                    }{" "}
                    {i18n.locale === ("en-US" || "en")
                      ? "more points to claim this reward"
                      : "نقطة اكثر للحصول على هذه المكافأة"}
                  </Text>
                ) : (
                  <Text style={styles.claimNow}>
                    {i18n.locale === ("en-US" || "en")
                      ? "You can claim this reward now!"
                      : "تستطيع الحصول على هذه الجائزة!"}
                  </Text>
                )}
                {myPoints?.amount >= reward.points ? (
                  <TouchableOpacity style={styles.button} onPress={handleClaim}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontFamily: "Ubuntu",
                      }}
                    >
                      {i18n.locale === ("en-US" || "en")
                        ? "Claim"
                        : "الحصول الآن"}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.disbutton}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontFamily: "Ubuntu",
                      }}
                    >
                      {i18n.locale === ("en-US" || "en")
                        ? "Claim"
                        : "الحصول الآن"}
                    </Text>
                  </View>
                )}
              </View>
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
                  height: 360,
                  width: 400,
                  display: "flex",
                }}
              >
                <Ionicons
                  style={{
                    color: "#aba9aa",
                    opacity: 0.8,
                    fontSize: 35,
                    zIndex: 99,
                    position: "absolute",
                    top: 0,
                    right: 0,
                    margin: 20,
                    marginTop: 15,
                  }}
                  name="close-outline"
                  onPress={toggleModal}
                ></Ionicons>

                <Text
                  style={{
                    fontFamily:
                      i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
                    fontSize: 30,
                    alignSelf: "center",
                    margin: i18n.locale === ("en-US" || "en") ? 35 : 10,
                    marginTop: i18n.locale === ("en-US" || "en") ? 45 : 35,
                  }}
                >
                  {i18n.locale === ("en-US" || "en")
                    ? reward.title
                    : reward.titleAr}
                </Text>
                <Text
                  style={{
                    fontFamily:
                      i18n.locale === ("en-US" || "en") ? "Ubuntu" : "Noto",
                    fontSize: 28,
                    alignSelf: "center",
                    margin: i18n.locale === ("en-US" || "en") ? 35 : 10,
                    marginTop: i18n.locale === ("en-US" || "en") ? 35 : 25,
                    textAlign:
                      i18n.locale === ("en-US" || "en") ? "left" : "right",
                    width: "80%",
                    lineHeight: i18n.locale === ("en-US" || "en") ? 40 : 50,
                  }}
                >
                  {i18n.locale === ("en-US" || "en")
                    ? "You already claimed this reward, it cannot be claimed multiple times."
                    : "لقد حصلت على هذه الجائزة من قبل، لا يمكنك الحصول عليها اكثر من مرة."}
                </Text>
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
    backgroundColor: "#9279f7",
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
    backgroundColor: "grey",
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
    fontSize: 25,
    alignSelf: "center",
    margin: 35,
    marginTop: 30,
    marginBottom: 25,
    color: "#cc0000",
  },
});
