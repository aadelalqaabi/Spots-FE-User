import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

import { useFonts } from "expo-font";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import authStore from "../../stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import rewardStore from "../../stores/rewardStore";
import RewardItem from "../rewards/RewardItem";
import organizerStore from "../../stores/organizerStore";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

export default function Info({ route }) {
  const spot = route.params.spot;
  const organizer = organizerStore.getOrganizerById(spot.organizer);
  const colorScheme = useColorScheme();
  const scrollViewRef = React.useRef(null);
  const ref = React.useRef(null);
  const navigation = useNavigation();
  let users = 0;
  spot.users.forEach((user) => users++);
  const rewards = rewardStore.rewards.filter(
    (reward) =>
      reward.users.includes(authStore.user.id) && reward.spot === spot._id
  );
  console.log("rewards", rewards);
  useScrollToTop(ref);
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
  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
    Cabin: require("../../assets/fonts/Cabin.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <ScrollView style={{ height: "100%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "cnter",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ zIndex: 99 }}
          >
            <Ionicons
              style={{
                color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                zIndex: 99,
                fontSize: 35,
                margin: 15,
                width: "100%",
              }}
              name={
                i18n.locale === "en-US"
                  ? "chevron-back-outline"
                  : "chevron-forward-outline"
              }
            ></Ionicons>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 26,
              alignSelf: "center",
              textAlign: "center",
              fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
              width: "70%",
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            }}
          >
            {i18n.locale === "en-US" ? "Information" : "معلومات"}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 150,
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 50,
              fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            }}
          >
            {users}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              position: "absolute",
              paddingTop: 130,
            }}
          >
            {i18n.locale === "en-US"
              ? "Users Spotted Here"
              : "مستخدمين اتوا هنا"}
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontSize: 20,
              alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
              textAlign: "center",
              fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
              margin: 20,
              marginBottom: -5,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              marginTop: i18n.locale === "en-US" ? 10 : 0,
            }}
          >
            {i18n.locale === "en-US"
              ? "Rewards claimed"
              : "مكافآت تم الحصول عليها"}
          </Text>
          <ScrollView
            horizontal={true}
            style={{
              backgroundColor: "transparent",
              display: "flex",
            }}
            contentContainerStyle={{
              backgroundColor: "transparent",
              paddingRight: 30,
              paddingLeft: i18n.locale === "en-US" ? 10 : 30,
              display: "flex",
              flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
            }}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              i18n.locale === "en-US"
                ? scrollViewRef.current.scrollTo({
                    x: 0,
                    y: 0,
                    animated: true,
                  })
                : scrollViewRef.current.scrollToEnd({ animated: true })
            }
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {rewards.map((reward) => (
              <RewardItem reward={reward} />
            ))}
          </ScrollView>
        </View>
        <View style={{ marginTop: 0 }}>
          <Text
            style={{
              fontSize: 20,
              alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
              textAlign: "center",
              fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
              margin: 20,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              marginTop: i18n.locale === "en-US" ? 10 : 0,
            }}
          >
            {i18n.locale === "en-US" ? "Spot Details" : "تفاصيل النقطة"}
          </Text>
          <Text
            style={{
              fontSize: 20,
              alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
              textAlign: i18n.locale === "en-US" ? "left" : "right",
              fontFamily: i18n.locale === "en-US" ? "Cabin" : "Noto",
              margin: 20,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              marginTop: i18n.locale === "en-US" ? -10 : -20,
              lineHeight: 40,
            }}
          >
            {i18n.locale === "en-US" ? spot.details : spot.detailsAr}
          </Text>
        </View>
        <View style={{ marginTop: 0 }}>
          <Text
            style={{
              fontSize: 20,
              alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
              textAlign: "center",
              fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
              margin: 20,
              color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
              marginTop: i18n.locale === "en-US" ? 10 : 0,
            }}
          >
            {i18n.locale === "en-US" ? "Contact Info" : "ملعومات الاتصال"}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
              alignContent: "center",
              alignItems: "center",
              margin: 15,
              marginBottom: 10,
              marginTop: 0,
            }}
          >
            <Ionicons
              style={{
                marginRight: 5,
                marginLeft: 5,
                color: "#9279f7",
                fontSize: 32,
                transform: [{ scaleX: i18n.locale === "en-US" ? 1 : -1 }],
              }}
              name="ios-call-outline"
            ></Ionicons>
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: "#9279f7",
              }}
            >
              <Text
                onPress={() => Linking.openURL(`tel:${organizer.phone}`)}
                style={{
                  fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                  fontSize: 20,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                  marginBottom: i18n.locale === "en-US" ? 5 : -5,
                }}
              >
                {organizer.phone}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
              alignContent: "center",
              alignItems: "center",
              margin: 15,
              marginBottom: 10,
              marginTop: 0,
            }}
          >
            <Ionicons
              style={{
                marginRight: 5,
                marginLeft: 5,
                color: "#9279f7",
                fontSize: 32,
                transform: [{ scaleX: i18n.locale === "en-US" ? 1 : -1 }],
              }}
              name="mail-outline"
            ></Ionicons>
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: "#9279f7",
              }}
            >
              <Text
                onPress={() => Linking.openURL(`mailto:${organizer.email}`)}
                style={{
                  fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                  fontSize: 20,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                  marginBottom: i18n.locale === "en-US" ? 5 : -5,
                }}
              >
                {organizer.email}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
