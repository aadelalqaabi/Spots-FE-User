import { observer } from "mobx-react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { baseURL } from "../../stores/instance";
import { useFonts } from "expo-font";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import * as Localization from "expo-localization";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import { useState } from "react";

function SearchSpot({ spot, navigation }) {
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (!fontsLoaded) {
    return null;
  }

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

  return (
    <View>
      <TouchableOpacity
        style={styles.card}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onPress={() => {
          navigation.navigate("SpotDetails", { id: spot._id });
        }}
      >
        <Image
          style={styles.thumb}
          source={{ uri: `${baseURL}${spot?.image}` }}
          onLoad={() => setIsImageLoading(false)}
          loadingIndicatorSource={require("../../assets/Loading.gif")}
        />
        {isImageLoading === true && (
          <View
            style={{
              height: 180,
              alignSelf: "center",
              width: "100%",
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
                width: 70,
                height: 70,
                alignSelf: "center",
              }}
              source={require("../../assets/Loading.gif")}
            />
          </View>
        )}

        <View style={styles.overlay}></View>
        <View style={styles.infoContainer}>
          <Text
            style={{
              fontSize: 28,
              color: "#fffffc",
              fontFamily:
                i18n.language.split("-")[0] === "en"
                  ? "UbuntuBold"
                  : "NotoBold",
              textAlign: "center",
            }}
          >
            {i18n.language.split("-")[0] === "en" ? spot.name : spot.nameAr}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default observer(SearchSpot);

const styles = StyleSheet.create({
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
    margin: 2,
    marginLeft: 0,
    marginRight: 0,
  },
  thumb: {
    width: "100%",
    height: 180,
    // borderRadius: 20,
    alignSelf: "center",
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
  overlay: {
    display: "flex",
    position: "absolute",
    zIndex: 99,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    // borderRadius: 20,
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
});
