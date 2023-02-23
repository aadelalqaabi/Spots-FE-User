import { observer } from "mobx-react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useColorScheme,
  ImageBackground,
} from "react-native";
import { baseURL } from "../../stores/instance";
import { useFonts } from "expo-font";
import moment from "moment";
import Swipeout from "react-native-swipeout";
import { Ionicons } from "@expo/vector-icons";
import spotStore from "../../stores/spotStore";
import ticketStore from "../../stores/ticketStore";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import "moment/locale/ar";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import organizerStore from "../../stores/organizerStore";

function Spotted({ ticket, navigation }) {
  const spot = spotStore.getSpotsById(ticket.spot._id);
  const organizer = organizerStore.getOrganizerById(spot?.organizer);
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
    return <MyAwesomeSplashScreen />;
  }
  let monthEn = moment(spot?.startDate).locale("en").format("MMM");
  let dayEn = moment(spot?.startDate).locale("en").format("DD");
  let monthAr = moment(spot?.startDate).locale("ar").format("MMM");
  let dayAr = moment(spot?.startDate).locale("ar").format("DD");
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
            i18n.locale === "en-US" || i18n.locale === "en"
              ? "Do You Want to Delete this Spot?"
              : "هل تريد حذف هذه النقطة؟",
            "",
            [
              {
                text:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Cancel"
                    : "الغاء",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Yes"
                    : "نعم",
                onPress: () => ticketStore.deleteTicket(ticket._id),
              },
            ]
          );
        } else {
          Alert.alert(
            i18n.locale === "en-US" || i18n.locale === "en"
              ? "This is a paid spot"
              : "هذه نقطة مدفوعة",
            i18n.locale === "en-US" || i18n.locale === "en"
              ? "Contact us to cancel your booking"
              : "تواصل معنا لالغاء الحجز",
            [
              {
                text:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "OK"
                    : "حسنا",
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
      {i18n.locale === "en-US" || i18n.locale === "en" ? (
        <Swipeout
          backgroundColor={colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1"}
          right={swipeoutBtns}
          autoClose={true}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SpotttedDetails", {
                id: spot._id,
                ticket: ticket,
              });
            }}
          >
            <ImageBackground
              style={{
                width: 400,
                height: 250,
                borderRadius: 30,
                padding: 20,
                margin: 20,
                marginBottom: 5,
                alignSelf: "center",
                overflow: "hidden",
              }}
              source={{ uri: `${baseURL}${spot?.image}` }}
            >
              <View style={styles.overlay}></View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 99,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    padding: 10,
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
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "UbuntuBold"
                            : "NotoBold",
                        fontSize: 23,
                        color: "#0a0a0b",
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 0
                            : -5,
                      }}
                    >
                      {i18n.locale === "en-US" || i18n.locale === "en"
                        ? dayEn
                        : dayAr}
                    </Text>
                    <Text
                      style={{
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "Ubuntu"
                            : "Noto",
                        fontSize: 17,
                        color: "grey",
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 0
                            : -20,
                      }}
                    >
                      {i18n.locale === "en-US" || i18n.locale === "en"
                        ? monthEn
                        : monthAr}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Organizer", {
                        organizer: organizer,
                      })
                    }
                    style={{
                      display: "flex",
                      flexDirection:
                        i18n.locale === "en-US" || i18n.locale === "en"
                          ? "row"
                          : "row-reverse",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        borderColor: "white",
                        backgroundColor: "white",
                        resizeMode: "cover",
                        marginRight: 10,
                        marginLeft: 10,
                      }}
                      source={{ uri: `${baseURL}${organizer.image}` }}
                    />
                    <Text
                      style={{
                        fontSize: 22,
                        color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "Ubuntu"
                            : "Noto",
                        alignSelf: "center",
                        textAlign:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "left"
                            : "right",
                        textTransform: "capitalize",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 9,
                        },
                        shadowOpacity: 0.68,
                        shadowRadius: 11.95,
                        elevation: 18,
                      }}
                    >
                      {i18n.locale === "en-US" || i18n.locale === "en"
                        ? organizer?.displayNameEn
                        : organizer?.displayNameAr}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    fontSize: 35,
                    color: "#fffffc",
                    fontFamily:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    textAlign: "center",
                    alignSelf: "center",
                    marginTop: "8%",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 9,
                    },
                    shadowOpacity: 0.68,
                    shadowRadius: 11.95,
                    elevation: 18,
                  }}
                >
                  {i18n.locale === "en-US" || i18n.locale === "en"
                    ? spot.name
                    : spot.nameAr}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </Swipeout>
      ) : (
        <Swipeout
          backgroundColor={colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1"}
          left={swipeoutBtns}
          autoClose={true}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SpotttedDetails", {
                id: spot._id,
                ticket: ticket,
              });
            }}
          >
            <ImageBackground
              style={{
                width: 400,
                height: 250,
                borderRadius: 30,
                padding: 20,
                margin: 20,
                marginBottom: 5,
                alignSelf: "center",
                overflow: "hidden",
              }}
              source={{ uri: `${baseURL}${spot?.image}` }}
            >
              <View style={styles.overlay}></View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 99,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "row-reverse"
                        : "row",
                    justifyContent: "space-between",
                    padding: 10,
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
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "UbuntuBold"
                            : "NotoBold",
                        fontSize: 23,
                        color: "#0a0a0b",
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 0
                            : -5,
                      }}
                    >
                      {i18n.locale === "en-US" || i18n.locale === "en"
                        ? dayEn
                        : dayAr}
                    </Text>
                    <Text
                      style={{
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "Ubuntu"
                            : "Noto",
                        fontSize: 17,
                        color: "grey",
                        marginTop:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 0
                            : -20,
                      }}
                    >
                      {i18n.locale === "en-US" || i18n.locale === "en"
                        ? monthEn
                        : monthAr}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Organizer", {
                        organizer: organizer,
                      })
                    }
                    style={{
                      display: "flex",
                      flexDirection:
                        i18n.locale === "en-US" || i18n.locale === "en"
                          ? "row"
                          : "row-reverse",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        borderColor: "white",
                        backgroundColor: "white",
                        resizeMode: "cover",
                        marginRight:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 10
                            : 0,
                        marginLeft:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? 0
                            : 10,
                      }}
                      source={{ uri: `${baseURL}${organizer.image}` }}
                    />
                    <Text
                      style={{
                        fontSize: 22,
                        color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                        fontFamily:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "Ubuntu"
                            : "Noto",
                        alignSelf: "center",
                        textAlign:
                          i18n.locale === "en-US" || i18n.locale === "en"
                            ? "left"
                            : "right",
                        textTransform: "capitalize",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 9,
                        },
                        shadowOpacity: 0.68,
                        shadowRadius: 11.95,
                        elevation: 18,
                      }}
                    >
                      {i18n.locale === "en-US" || i18n.locale === "en"
                        ? organizer?.displayNameEn
                        : organizer?.displayNameAr}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    fontSize: 35,
                    color: "#fffffc",
                    fontFamily:
                      i18n.locale === "en-US" || i18n.locale === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    textAlign: "center",
                    alignSelf: "center",
                    marginTop: "4%",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 9,
                    },
                    shadowOpacity: 0.68,
                    shadowRadius: 11.95,
                    elevation: 18,
                  }}
                >
                  {i18n.locale === "en-US" || i18n.locale === "en"
                    ? spot.name
                    : spot.nameAr}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
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
    position: "absolute",
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    width: 400,
    height: 250,
  },
});
