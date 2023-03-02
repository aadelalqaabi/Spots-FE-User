import { observer } from "mobx-react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { baseURL } from "../../stores/instance";
import { useMediaQuery } from "native-base";
import moment from "moment";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import organizerStore from "../../stores/organizerStore";
import "moment/locale/ar";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";

function Spot({ spot, navigation, day }) {
  const translations = {
    en: {
      suggested: "Suggested Destination",
      search: "Search",
    },
    ar: {
      suggested: "وجهة مقترحة",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  const [isSmallScreen] = useMediaQuery({
    minHeight: 180,
    maxHeight: 900,
  });
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }
  const organizer = organizerStore.getOrganizerById(spot?.organizer);
  let monthEn = moment(spot?.startDate).locale("en").format("MMM");
  let dayEn = moment(spot?.startDate).locale("en").format("DD");
  let monthAr = moment(spot?.startDate).locale("ar").format("MMM");
  let dayAr = moment(spot?.startDate).locale("ar").format("DD");
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        height: "100%",
        width: "84%",
      }}
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate("SpotDetails", { id: spot._id });
      }}
    >
      <>
        <Image
          style={{
            alignSelf: "center",
            width: "100%",
            height: "100%",
            borderRadius: 35,
            zIndex: -1,
          }}
          source={{ uri: `${baseURL}${spot?.image}` }}
        />
        <View
          style={{
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.4)",
            height: "100%",
            width: "100%",
            borderRadius: 35,
          }}
        ></View>
        <View
          style={{
            display: "flex",
            position: "absolute",
            alignSelf: "flex-start",
            flexDirection:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "row"
                : "row-reverse",
            alignContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "10%",
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "row"
                  : "row-reverse",
              flexWrap: "nowrap",
              textAlign: "center",
              width: 220,
              alignContent: "center",
              alignSelf: "center",
            }}
            onPress={() => {
              navigation.navigate("Organizer", {
                organizer: organizer,
              });
            }}
          >
            <View
              style={{
                alignSelf: "center",
                width: 60,
                height: 60,
                borderRadius: 50,
                zIndex: -1,
                shadowOpacity: 0.1,
                shadowRadius: 20,
                marginRight: 10,
                marginLeft: 10,
                shadowColor: "#004365",
                shadowOffset: {
                  height: 10,
                  width: 0,
                },
                backgroundColor: "white",
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  alignSelf: "center",
                  width: 60,
                  height: 60,
                  borderRadius: 60,
                  zIndex: -1,
                  borderColor: "white",
                  backgroundColor: "white",
                  resizeMode: "cover",
                }}
                source={{ uri: `${baseURL}${organizer?.image}` }}
              />
            </View>
            <Text
              style={{
                fontSize: 20,
                color: "#fffffc",
                shadowOpacity: 0.2,
                shadowRadius: 10,
                shadowColor: "#004365",
                shadowOffset: {
                  height: 5,
                  width: 0,
                },
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                alignSelf: "center",
                textAlign:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "left"
                    : "right",
                flex: 1,
                textTransform: "capitalize",
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
                ? organizer?.displayNameEn
                : organizer?.displayNameAr}
            </Text>
          </TouchableOpacity>

          {day === null ? (
            <View
              style={{
                margin: 10,
                width: 60,
                height: 70,
                backgroundColor: "white",
                borderRadius: 15,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                shadowOpacity: 0.1,
                shadowRadius: 10,
                shadowColor: "#004365",
                shadowOffset: {
                  height: 10,
                  width: 0,
                },
                marginLeft: 12,
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
                    i18n.locale === "en-US" || i18n.locale === "en" ? 0 : -5,
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
                    i18n.locale === "en-US" || i18n.locale === "en" ? 0 : -20,
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? monthEn
                  : monthAr}
              </Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: "#f1f1f1",
                borderRadius: 50,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                shadowOpacity: 0.1,
                shadowRadius: 10,
                shadowColor: "#004365",
                shadowOffset: {
                  height: 10,
                  width: 0,
                },
                marginTop: "14%",
              }}
            >
              <Text
                style={{
                  fontFamily: "UbuntuBold",
                  fontSize: 23,
                  color: "#0a0a0b",
                  alignSelf: "center",
                  padding: 10,
                }}
              >
                {spot.startTime}
              </Text>
            </View>
          )}
        </View>
        <LinearGradient
          colors={["rgba(0,0,0,0)", "transparent"]}
          start={{ x: 0, y: 0.7 }}
          end={{ x: 0, y: 0 }}
          style={styles.infoContainer}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "white",
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              marginBottom:
                i18n.locale === "en-US" || i18n.locale === "en" ? 0 : -15,
              paddingBottom: 10,
              alignSelf:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "flex-start"
                  : "flex-end",
              shadowOpacity: 0.5,
              shadowRadius: 10,
              shadowColor: "#004365",
              shadowOffset: {
                height: 0,
                width: 0,
              },
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? spot.name
              : spot.nameAr}
          </Text>
          {spot.isFree === true ? (
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                alignSelf:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "flex-start"
                    : "flex-end",
                shadowOpacity: 0.1,
                shadowOpacity: 0.5,
                shadowRadius: 10,
                shadowColor: "#004365",
                shadowOffset: {
                  height: 0,
                  width: 0,
                },
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
                ? "Free"
                : "مجاني"}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",

                //paddingBottom: 10,
                alignSelf:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "flex-start"
                    : "flex-end",
                shadowOpacity: 0.1,
                shadowOpacity: 0.5,
                shadowRadius: 10,
                shadowColor: "#004365",
                shadowOffset: {
                  height: 0,
                  width: 0,
                },
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
                ? spot.price + " KD per person"
                : spot.price + " دك للتذكرة "}
            </Text>
          )}
        </LinearGradient>
      </>
    </TouchableOpacity>
  );
}

export default observer(Spot);

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 100,
    borderRadius: 16,
    shadowColor: "#161616",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 13,
    elevation: 3,
    marginTop: 3,
  },
  thumb: {
    marginTop: 19,
    alignSelf: "center",
    width: 374,
    height: 620,
    borderRadius: 30,
    zIndex: -1,
    opacity: 1,
  },
  ownerthumb: {
    alignSelf: "center",
    width: 55,
    height: 55,
    borderRadius: 50,
    zIndex: -1,
    marginRight: 10,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowColor: "#004365",
    shadowOffset: {
      height: 10,
      width: 0,
    },
    borderWidth: 1.5,
    borderColor: "white",
    backgroundColor: "white",
  },
  sthumb: {
    marginTop: 12,
    alignSelf: "center",
    width: 354,
    height: 500,
    borderRadius: 20,
    zIndex: -1,
    opacity: 1,
  },
  ownerthumbs: {
    alignSelf: "center",
    width: 45,
    height: 45,
    borderRadius: 50,
    zIndex: -1,
    opacity: 1,
    marginRight: 10,
  },
  infoContainer: {
    display: "flex",
    position: "absolute",
    width: "100%",
    flexDirection: "column",
    flexWrap: "nowrap",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 35,
    alignSelf: "flex-end",
  },
  priceContainer: {
    display: "flex",
    position: "absolute",
    alignSelf: "flex-end",
    width: 384,
    height: 150,
    paddingLeft: 28,
    paddingBottom: 40,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },

  priceBack: {
    backgroundColor: "rgba(0,0,0,0.6)",
    alignSelf: "center",
    marginLeft: 128,
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 30,
  },
  ownerContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    textAlign: "center",
    width: 220,
    alignContent: "center",
  },
  ownerview: {
    paddingBottom: 485,
    display: "flex",
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    alignContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    paddingLeft: 40,
    paddingTop: 40,
  },

  ownername: {
    fontSize: 20,
    color: "#fffffc",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowColor: "#004365",
    shadowOffset: {
      height: 5,
      width: 0,
    },
    fontFamily: "Ubuntu",
    alignSelf: "center",
    flex: 1,
    textTransform: "capitalize",
  },
  datetime: {
    fontSize: 15,
    color: "white",
    fontFamily: "Ubuntu",
  },
  edit: {
    borderRadius: 10,
  },
  profileName: {
    justifyContent: "center",
    paddingTop: 6,
    fontSize: 20,
    fontFamily: "Ubuntu",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 15,
  },
  profile: {
    flexDirection: "row",
    padding: 10,
  },
  usersimage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  spotted: {
    fontSize: 12,
    color: "black",
    fontFamily: "UbuntuBold",
  },
  spottedview: {
    borderRadius: 50,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginLeft: -5,
  },
});
