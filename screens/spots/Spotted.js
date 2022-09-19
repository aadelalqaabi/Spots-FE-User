import { observer } from "mobx-react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from "react-native";
import { baseURL } from "../../stores/instance";
import { useFonts } from "expo-font";
import moment from "moment";
import Swipeout from "react-native-swipeout";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import spotStore from "../../stores/spotStore";
import ticketStore from "../../stores/ticketStore";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import "moment/locale/ar";

function Spotted({ ticket, navigation }) {
  const spot = spotStore.getSpotsById(ticket.spot._id);
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      suggested: "Suggested Spot",
      search: "Search",
    },
    ar: {
      suggested: "وجهة مقترحة",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  let monthEn = moment(spot.startDate).locale("en").format("MMM");
  let dayEn = moment(spot.startDate).locale("en").format("DD");
  let monthAr = moment(spot.startDate).locale("ar").format("MMM");
  let dayAr = moment(spot.startDate).locale("ar").format("DD");
  const swipeoutBtns = [
    {
      component: (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Ionicons
            style={{ color: "red", fontSize: 40 }}
            name="remove-circle"
          ></Ionicons>
        </View>
      ),
      backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
      color: "red",
      onPress: () => {
        if (ticket.isFree === true) {
          Alert.alert(
            i18n.locale === "en-US"
              ? "Do You Want to Delete this Spot?"
              : "هل تريد حذف هذه النقطة؟",
            "",
            [
              {
                text: i18n.locale === "en-US" ? "Cancel" : "الغاء",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: i18n.locale === "en-US" ? "Yes" : "نعم",
                onPress: () => ticketStore.deleteTicket(ticket._id),
              },
            ]
          );
        } else {
          Alert.alert(
            i18n.locale === "en-US" ? "This is a paid spot" : "هذه نقطة مدفوعة",
            i18n.locale === "en-US"
              ? "Contact us to cancel your booking"
              : "تواصل معنا لالغاء الحجز",
            [
              {
                text: i18n.locale === "en-US" ? "OK" : "حسنا",
                onPress: () => console.log("Cancel Pressed"),
              },
            ]
          );
        }
      },
    },
  ];
  return (
    <>
      {i18n.locale === "en-US" ? (
        <Swipeout
          backgroundColor={colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1"}
          right={swipeoutBtns}
          autoClose="true"
        >
          <View
            style={{
              display: "flex",
              flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
              backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <View
              style={{
                width: 60,
                height: 70,
                backgroundColor: "#f1f1f1",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",

                borderRadius: 15,
                shadowColor: "#161616",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.09,
                shadowRadius: 5,
                marginRight: 15,
                marginLeft: 15,
              }}
            >
              <Text
                style={{
                  fontFamily:
                    i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                  fontSize: 23,
                  color: "#0a0a0b",
                  marginTop: i18n.locale === "en-US" ? 0 : -5,
                }}
              >
                {i18n.locale === "en-US" ? dayEn : dayAr}
              </Text>

              <Text
                style={{
                  fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                  fontSize: 17,
                  color: "grey",
                  marginTop: i18n.locale === "en-US" ? 0 : -20,
                }}
              >
                {i18n.locale === "en-US" ? monthEn : monthAr}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 16,
                shadowColor: "#161616",

                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                marginVertical: 5,
                height: 290,
                marginBottom: 10,
                marginRight: i18n.locale === "en-US" ? 20 : -8,
                marginLeft: i18n.locale === "en-US" ? -8 : 20,
              }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              onPress={() => {
                navigation.navigate("SpotttedDetails", {
                  id: spot._id,
                  ticket: ticket,
                });
              }}
            >
              <Image
                style={styles.thumb}
                source={{ uri: `${baseURL}${spot?.image}` }}
              />
              <View style={styles.overlay}></View>
              <View style={styles.infoContainer}>
                <Text
                  style={{
                    fontSize: 28,
                    color: "#fffffc",
                    shadowOpacity: 1,
                    shadowRadius: 4,
                    shadowColor: "black",
                    shadowOffset: {
                      height: 1,
                      width: 1,
                    },
                    fontFamily:
                      i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",

                    textAlign: "center",
                  }}
                >
                  {spot?.name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Swipeout>
      ) : (
        <Swipeout
          backgroundColor={colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1"}
          left={swipeoutBtns}
          autoClose="true"
        >
          <View
            style={{
              display: "flex",
              flexDirection: i18n.locale === "en-US" ? "row" : "row-reverse",
              backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <View
              style={{
                width: 60,
                height: 70,
                backgroundColor: "#f1f1f1",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",

                borderRadius: 15,
                shadowColor: "#161616",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.09,
                shadowRadius: 5,
                marginRight: 15,
                marginLeft: 15,
              }}
            >
              <Text
                style={{
                  fontFamily:
                    i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                  fontSize: 23,
                  color: "#0a0a0b",
                  marginTop: i18n.locale === "en-US" ? 0 : -5,
                }}
              >
                {i18n.locale === "en-US" ? dayEn : dayAr}
              </Text>

              <Text
                style={{
                  fontFamily: i18n.locale === "en-US" ? "Ubuntu" : "Noto",
                  fontSize: 17,
                  color: "grey",
                  marginTop: i18n.locale === "en-US" ? 0 : -20,
                }}
              >
                {i18n.locale === "en-US" ? monthEn : monthAr}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 16,
                shadowColor: "#161616",

                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                marginVertical: 5,
                height: 290,
                marginBottom: 10,
                marginRight: i18n.locale === "en-US" ? 20 : -8,
                marginLeft: i18n.locale === "en-US" ? -8 : 20,
              }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              onPress={() => {
                navigation.navigate("SpotttedDetails", {
                  id: spot._id,
                  ticket: ticket,
                });
              }}
            >
              <Image
                style={styles.thumb}
                source={{ uri: `${baseURL}${spot?.image}` }}
              />
              <View style={styles.overlay}></View>
              <View style={styles.infoContainer}>
                <Text
                  style={{
                    fontSize: 28,
                    color: "#fffffc",
                    shadowOpacity: 1,
                    shadowRadius: 4,
                    shadowColor: "black",
                    shadowOffset: {
                      height: 1,
                      width: 1,
                    },
                    fontFamily:
                      i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
                    textAlign: "center",
                  }}
                >
                  {spot?.name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Swipeout>
      )}
    </>
  );
}

export default observer(Spotted);

const styles = StyleSheet.create({
  thumb: {
    width: 320,
    height: 280,
    borderRadius: 20,
    margin: 10,
    zIndex: -1,
  },
  infoContainer: {
    display: "flex",
    position: "absolute",
    zIndex: 99,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "80%",
  },
  name: {
    fontSize: 28,
    color: "#fffffc",
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    fontFamily: "UbuntuBold",
    textAlign: "center",
  },
  overlay: {
    display: "flex",
    position: "absolute",
    zIndex: -1,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 320,
    height: 280,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    margin: 10,
  },
});
