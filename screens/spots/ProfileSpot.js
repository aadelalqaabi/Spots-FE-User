import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { baseURL } from "../../stores/instance";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { useFonts } from "expo-font";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

function ProfileSpot({ spot }) {
  const navigation = useNavigation();
  const [isImageLoading, setIsImageLoading] = useState(true);

  let users = 0;
  spot.users.forEach((user) => users++);
  const translations = {
    en: {
      active: "Active",
      finished: "Finished",
    },
    ar: {
      active: "نشط",
      finished: "انتهى",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  });

  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "transparent",
        marginBottom: "-5%",
      }}
      onPress={() => {
        navigation.navigate("ProfileSpotDetails", { id: spot._id });
      }}
    >
      {isImageLoading === true && (
        <View
          style={{
            width: 400,
            height: 400,
            position: "absolute",
            zIndex: 99,
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
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
      <ImageBackground
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 30,
          margin: "5%",
          marginLeft: 0,
          marginRight: 0,
          overflow: "hidden",
          alignSelf: "center",
          width: 380,
          height: 380,
          padding: 30,
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
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "row"
                  : "row-reverse",
              justifyContent: "space-between",
              alignSelf: "center",
              marginTop: "2%",
              width: spot.endTime ? "94%" : "84%",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "row"
                    : "row-reverse",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 20,
                  width: 20,
                  backgroundColor: "#e52b51",
                  borderRadius: 100,
                  marginRight: 10,
                  marginLeft: 10,
                }}
              ></View>
              <Text
                style={{
                  fontSize: 22,
                  color: "#e52b51",
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "Ubuntu"
                      : "Noto",
                  textAlign: "center",
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Active"
                  : "نشط"}
              </Text>
            </View>
            <View
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
              <Ionicons
                style={{
                  color: "#e52b51",
                  fontSize: 25,
                  marginRight: 5,
                  marginLeft: 5,
                }}
                name="time"
              ></Ionicons>
              <Text
                style={{
                  fontSize: 24,
                  color: "#fffffc",
                  fontFamily: "UbuntuBold",
                  textAlign: "center",
                }}
              >
                {spot.startTime}
              </Text>
              {spot.endTime &&
                (i18n.locale === "en-US" || i18n.locale === "en" ? (
                  <Text
                    style={{
                      fontSize: 24,
                      color: "#fffffc",
                      fontFamily: "UbuntuBold",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    - {spot.endTime}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 24,
                      color: "#fffffc",
                      fontFamily: "UbuntuBold",
                      textAlign: "center",
                    }}
                  >
                    {spot.endTime} -{" "}
                  </Text>
                ))}
            </View>
          </View>
          <Text
            style={{
              fontSize: 40,
              color: "#fffffc",
              shadowColor: "#1b1b1b",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 1,
              shadowRadius: 2.62,
              elevation: 4,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              textAlign: "center",
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? spot.name
              : spot.nameAr}
          </Text>
          <Text
            style={{
              fontSize: 26,
              color: "#fffffc",
              shadowColor: "#1b1b1b",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 1,
              shadowRadius: 2.62,
              elevation: 4,
              fontFamily:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "Ubuntu"
                  : "Noto",
              textAlign: "center",
            }}
          >
            {i18n.locale === "en-US" || i18n.locale === "en"
              ? users + " users here"
              : users + " مستخدم هنا  "}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default observer(ProfileSpot);

const styles = StyleSheet.create({
  overlay: {
    display: "flex",
    position: "absolute",
    zIndex: 99,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 384,
    height: 470,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
  },
  card: {
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
    margin: "5%",
    marginLeft: 0,
    marginRight: 0,
  },
  thumb: {
    alignSelf: "center",
    width: 384,
    height: 470,
    borderRadius: 20,
    margin: 10,
    zIndex: -1,
    opacity: 0.9,
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
    fontSize: 34,
    fontWeight: "bold",
    color: "#fffffc",
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  edit: {
    borderRadius: 10,
  },
  profileName: {
    justifyContent: "center",
    paddingTop: 6,
    fontSize: 20,
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
  overlay: {
    position: "absolute",
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: 400,
    height: 380,
  },
});
