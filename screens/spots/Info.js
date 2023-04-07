import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
} from "react-native";
import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { useFonts } from "expo-font";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import authStore from "../../stores/authStore";
import { Ionicons } from "@expo/vector-icons";
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
  useScrollToTop(ref);
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

  let [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    UbuntuLight: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
    Cabin: require("../../assets/fonts/Cabin.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={colorScheme === "dark" ? "#000000" : "#f1f1f1"}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <ScrollView style={{ height: "100%" }}>
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
                i18n.language.split("-")[0] === "en"
                  ? "flex-start"
                  : "flex-end",
              position: "absolute",
            }}
          >
            <Ionicons
              style={{
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                zIndex: 99,
                fontSize: 35,
                margin: 15,
                width: "100%",
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
              fontSize: 26,
              alignSelf: "center",
              textAlign: "center",
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              width: "70%",
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
            }}
          >
            {i18n.language.split("-")[0] === "en" ? "Information" : "معلومات"}
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
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
              marginBottom: 5,
            }}
          >
            {users}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? "Users Visited"
              : "مستخدمين زارونا"}
          </Text>
        </View>
        {rewards.length > 0 ? (
          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 20,
                alignSelf:
                  i18n.language.split("-")[0] === "en"
                    ? "flex-start"
                    : "flex-end",
                textAlign: "center",
                fontFamily:
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                margin: 20,
                marginBottom: -5,
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                marginTop: i18n.language.split("-")[0] === "en" ? 10 : 0,
              }}
            >
              {i18n.language.split("-")[0] === "en"
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
                display: "flex",
                flexDirection:
                  i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
                paddingRight: 30,
                paddingLeft: i18n.language.split("-")[0] === "en" ? 10 : 30,
              }}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                i18n.language.split("-")[0] === "en"
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
        ) : (
          <></>
        )}
        <View style={{ marginTop: 0 }}>
          <Text
            style={{
              fontSize: 20,
              alignSelf:
                i18n.language.split("-")[0] === "en"
                  ? "flex-start"
                  : "flex-end",
              textAlign: "center",
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              margin: 20,
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
              marginTop: i18n.language.split("-")[0] === "en" ? 10 : 0,
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? "Dest Details"
              : "تفاصيل الوجهة"}
          </Text>
          <Text
            style={{
              fontSize: 20,
              alignSelf:
                i18n.language.split("-")[0] === "en"
                  ? "flex-start"
                  : "flex-end",
              textAlign:
                i18n.language.split("-")[0] === "en" ? "left" : "right",
              fontFamily:
                i18n.language.split("-")[0] === "en" ? "Cabin" : "Noto",
              margin: 20,
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
              marginTop: i18n.language.split("-")[0] === "en" ? -10 : -20,
              lineHeight: 40,
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? spot.details
              : spot.detailsAr}
          </Text>
        </View>
        <View style={{ marginTop: 0 }}>
          <Text
            style={{
              fontSize: 20,
              alignSelf:
                i18n.language.split("-")[0] === "en"
                  ? "flex-start"
                  : "flex-end",
              textAlign: "center",
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              margin: 20,
              color: colorScheme === "light" ? "#000000" : "#f1f1f1",
              marginTop: i18n.language.split("-")[0] === "en" ? 10 : 0,
            }}
          >
            {i18n.language.split("-")[0] === "en"
              ? "Contact Info"
              : "ملعومات الاتصال"}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection:
                i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
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
                color: "#e52b51",
                fontSize: 32,
                transform: [
                  {
                    scaleX: i18n.language.split("-")[0] === "en" ? 1 : -1,
                  },
                ],
              }}
              name="ios-call-outline"
            ></Ionicons>
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: "#e52b51",
              }}
            >
              <Text
                onPress={() => Linking.openURL(`tel:${organizer.phone}`)}
                style={{
                  fontFamily:
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  fontSize: 20,
                  color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                  marginBottom: i18n.language.split("-")[0] === "en" ? 5 : -5,
                }}
              >
                {organizer.phone}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection:
                i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
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
                color: "#e52b51",
                fontSize: 32,
                transform: [
                  {
                    scaleX: i18n.language.split("-")[0] === "en" ? 1 : -1,
                  },
                ],
              }}
              name="mail-outline"
            ></Ionicons>
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: "#e52b51",
              }}
            >
              <Text
                onPress={() => Linking.openURL(`mailto:${organizer.email}`)}
                style={{
                  fontFamily:
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  fontSize: 20,
                  color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                  marginBottom: i18n.language.split("-")[0] === "en" ? 5 : -5,
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
