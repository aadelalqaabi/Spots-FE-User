import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { baseURL } from "../../stores/instance";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import pointStore from "../../stores/pointStore";
import authStore from "../../stores/authStore";
import rewardStore from "../../stores/rewardStore";

function RewardItem({ reward }) {
  useEffect(() => {
    authStore.checkForToken();
    pointStore.fetchPoints();
  }, []);
  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Cabin: require("../../assets/fonts/Cabin.ttf"),
    CabinMedium: require("../../assets/fonts/CabinMedium.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const userRewards = rewardStore.rewards.filter((rewardo) =>
    rewardo.users.includes(authStore.user.id)
  );

  const found = userRewards.some((rewardo) => rewardo._id === reward._id);
  console.log("found", found);
  let myPoints = pointStore.points.find(
    (point) => point?.user === authStore.user.id && point?.spot === reward?.spot
  );
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleClaim = async () => {
    pointStore.updatePoint(myPoints.amount - reward.points, myPoints._id);
    const amount = myPoints.amount - reward.points;
    myPoints = { ...myPoints, amount };
    await authStore.checkForToken();
    await authStore.rewardAdd(reward._id);
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
              backgroundColor: "#4831d4",
              padding: 15,

              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: "50%",
            }}
          >
            <Text style={styles.pointsAmount}>{reward?.points}</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{reward?.title}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{reward?.description}</Text>
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

                <Text style={styles.heading}>{reward.title}</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignSelf: "center",
                  }}
                >
                  <View>
                    <Text style={styles.points}>{reward.points}</Text>
                    <Text style={styles.pointsTitle}>Reward Points</Text>
                  </View>
                  <View>
                    <Text style={styles.points}>{myPoints?.amount}</Text>
                    <Text style={styles.pointsTitle}>Your Points</Text>
                  </View>
                </View>
                {myPoints?.amount < reward.points ? (
                  <Text style={styles.pointsNotEnough}>
                    You need{" "}
                    {
                      <Text style={styles.pointsNotEnoughNum}>
                        {reward.points - myPoints?.amount}
                      </Text>
                    }{" "}
                    more points to claim this reward
                  </Text>
                ) : (
                  <Text style={styles.claimNow}>
                    You can claim this reward now!
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
                      Claim
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
                      Claim
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

                <Text style={styles.heading}>{reward.title}</Text>
                <Text style={styles.heading}>
                  You already claimed this reward, it cannot be claimed multiple
                  times.
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
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#4831d4",
    width: 225,
    height: 50,
    alignSelf: "center",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  disbutton: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#988be6",
    width: 225,
    height: 50,
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
