import { observer } from "mobx-react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ImageBackground,
} from "react-native";
import { baseURL } from "../../stores/instance";
import { useFonts } from "expo-font";
import { DateTime } from "luxon";
import spotStore from "../../stores/spotStore";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import organizerStore from "../../stores/organizerStore";
import { useState } from "react";

function Spotted({ ticket, navigation }) {
  const spot = spotStore.getSpotsById(ticket.spot._id);
  const organizer = organizerStore.getOrganizerById(spot?.organizer);
  const colorScheme = useColorScheme();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const translations = {
    en: {
      suggested: "Suggested Spot",
      search: "Search",
    },
    ar: {
      suggested: "وجهة مقترحة",
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
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <View style={{ backgroundColor: "transparent" }}></View>;
  }
  let monthEn = DateTime.fromISO(spot?.startDate)
    .setLocale("en")
    .toFormat("MMM");
  let dayEn = DateTime.fromISO(spot?.startDate).setLocale("en").toFormat("dd");
  let monthAr = DateTime.fromISO(spot?.startDate)
    .setLocale("ar")
    .toFormat("MMM");
  let dayAr = DateTime.fromISO(spot?.startDate).setLocale("ar").toFormat("dd");
  let monthendEn = DateTime.fromISO(spot?.endDate)
    .setLocale("en")
    .toFormat("MMM");
  let dayendEn = DateTime.fromISO(spot?.endDate).setLocale("en").toFormat("dd");
  let monthendAr = DateTime.fromISO(spot?.endDate)
    .setLocale("ar")
    .toFormat("MMM");
  let dayendAr = DateTime.fromISO(spot?.endDate).setLocale("ar").toFormat("dd");
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("SpotttedDetails", {
          id: spot._id,
          ticket: ticket,
        });
      }}
      activeOpacity={1}
      style={{
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
      }}
    >
      <ImageBackground
        style={{
          width: 380,
          height: 250,
          borderRadius: 30,
          padding: 20,
          margin: 20,
          marginTop: 8,
          marginBottom: 8,
          alignSelf: "center",
          overflow: "hidden",
          backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
        }}
        source={{ uri: `${baseURL}${spot?.image}` }}
        onLoad={() => setIsImageLoading(false)}
        loadingIndicatorSource={require("../../assets/Loading.gif")}
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
                i18n.language.split("-")[0] === "en" ? "row-reverse" : "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <View
              style={{
                width: spot?.isMultiple ? 80 : 60,
                height: 70,
                backgroundColor: "#f1f1f1",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
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
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection:
                    i18n.language.split("-")[0] === "en"
                      ? "row"
                      : "row-reverse",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily:
                      i18n.language.split("-")[0] === "en"
                        ? "UbuntuBold"
                        : "NotoBold",
                    fontSize: 23,
                    color: "#0a0a0b",
                    marginTop: i18n.language.split("-")[0] === "en" ? 0 : -5,
                  }}
                >
                  {i18n.language.split("-")[0] === "en" ? dayEn : dayAr}
                </Text>
                {spot?.isMultiple && (
                  <Text
                    style={{
                      fontFamily:
                        i18n.language.split("-")[0] === "en"
                          ? "UbuntuBold"
                          : "NotoBold",
                      fontSize: 23,
                      color: "#0a0a0b",
                      marginTop: i18n.language.split("-")[0] === "en" ? 0 : -5,
                    }}
                  >
                    {i18n.language.split("-")[0] === "en"
                      ? "-" + dayendEn
                      : dayendAr + "-"}
                  </Text>
                )}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection:
                    i18n.language.split("-")[0] === "en"
                      ? "row"
                      : "row-reverse",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily:
                      i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                    fontSize: 17,
                    color: "grey",
                    marginTop: i18n.language.split("-")[0] === "en" ? 0 : -20,
                  }}
                >
                  {i18n.language.split("-")[0] === "en" ? monthEn : monthAr}
                </Text>
                {spot?.isMultiple && monthendEn !== monthEn && (
                  <Text
                    style={{
                      fontFamily:
                        i18n.language.split("-")[0] === "en"
                          ? "Ubuntu"
                          : "Noto",
                      fontSize: 15,
                      color: "grey",
                      marginTop: i18n.language.split("-")[0] === "en" ? 0 : -20,
                      alignSelf: "center",
                    }}
                  >
                    -
                    {i18n.language.split("-")[0] === "en"
                      ? monthendEn
                      : monthendAr}
                  </Text>
                )}
              </View>
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
                  i18n.language.split("-")[0] === "en" ? "row" : "row-reverse",
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
                  color: "#f1f1f1",
                  fontFamily:
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  alignSelf: "center",
                  textAlign:
                    i18n.language.split("-")[0] === "en" ? "left" : "right",
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
                {i18n.language.split("-")[0] === "en"
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
                i18n.language.split("-")[0] === "en"
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
            {i18n.language.split("-")[0] === "en" ? spot.name : spot.nameAr}
          </Text>
        </View>
      </ImageBackground>
      {isImageLoading === true && (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 99,
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
            }}
            source={require("../../assets/Loading.gif")}
          />
        </View>
      )}
    </TouchableOpacity>
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
