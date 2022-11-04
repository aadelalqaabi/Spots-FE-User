import { observer } from "mobx-react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { baseURL } from "../../stores/instance";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { useNavigation } from "@react-navigation/native";

function OrganizerSpot({ spot }) {
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const navigation = useNavigation();

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
  return (
    <View style={{ backgroundColor: "transparent" }}>
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
          margin: 1.5,
          marginLeft: 0,
          marginRight: 0,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onPress={() => navigation.navigate("EndedSpot", { spot: spot })}
      >
        <Image
          style={{
            alignSelf: "center",
            width: "90%",
            height: 200,
            borderRadius: 20,
            margin: 10,
            zIndex: -1,
            opacity: 0.9,
          }}
          source={{ uri: `${baseURL}${spot.image}` }}
        />
        <View style={styles.overlay}></View>
        <View style={styles.infoContainer}>
          <Text
            style={{
              fontSize: 30,
              color: "#fffffc",
              shadowOpacity: 1,
              shadowRadius: 4,
              shadowColor: "black",
              shadowOffset: {
                height: 1,
                width: 1,
              },
              fontFamily: i18n.locale === "en-US" ? "UbuntuBold" : "NotoBold",
              textAlign: "center",
            }}
          >
            {i18n.locale === "en-US" ? spot.name : spot.nameAr}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default observer(OrganizerSpot);

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
    margin: 1.5,
    marginLeft: 0,
    marginRight: 0,
  },
  overlay: {
    display: "flex",
    position: "absolute",
    zIndex: 99,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "90%",
    height: 200,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
  },
  thumb: {
    alignSelf: "center",
    width: 384,
    height: 300,
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
    fontSize: 35,
    color: "#fffffc",
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    textAlign: "center",
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
});
