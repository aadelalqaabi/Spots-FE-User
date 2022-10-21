import { useColorScheme, Image, StyleSheet, Text, View } from "react-native";
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
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { useNavigation } from "@react-navigation/native";
import spotStore from "../../stores/spotStore";

function RewardClaimed({ reward, onRefresh }) {
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
    return <AppLoading />;
  }

  const handleClaim = async () => {
    pointStore.updatePoint(myPoints.amount - reward.points, myPoints._id);
    await rewardStore.userAdd(reward._id);
    toggleModal();
  };

  return (
    <View style={{ margin: 20, marginRight: -5 }}>
      <View>
        <Image
          style={styles.thumb}
          source={{ uri: `${baseURL}${reward?.image}` }}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text
          style={{
            textTransform: "capitalize",
            marginTop: 10,
            marginRight: -20,
            fontSize: 22,
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
            alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
          }}
        >
          {i18n.locale === "en-US" ? reward?.title : reward.titleAr}
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text
          style={{
            marginTop: 10,
            marginRight: -20,
            fontSize: 18,
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            fontFamily: i18n.locale === "en-US" ? "Cabin" : "Noto",
            alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
            width: 300,
            lineHeight: 25,
            textAlign: i18n.locale === "en-US" ? "left" : "right",
          }}
        >
          {i18n.locale === "en-US"
            ? reward?.description
            : reward?.descriptionAr}
        </Text>
      </View>
    </View>
  );
}
export default observer(RewardClaimed);

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
    backgroundColor: "#9279f7",
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
    backgroundColor: "grey",
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
