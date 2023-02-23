import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Animated,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { useFonts } from "expo-font";

import spotStore from "./stores/spotStore";
import { baseURL } from "./stores/instance";
import organizerStore from "./stores/organizerStore";
import { observer } from "mobx-react";
import MyAwesomeSplashScreen from "./MyAwesomeSplashScreen";
const { width, height } = Dimensions.get("window");

function Advertisments() {
  const navigation = useNavigation();
  const today = new Date();
  today.setHours(3, 0, 0, 0);
  const adSpots = spotStore.spots.filter(
    (spot) =>
      spot.isAd === true &&
      new Date(spot.startDate) >= today &&
      spot.isPublished === true
  );
  const [current, setCurrent] = useState(0);

  const [content, setContent] = useState([
    {
      content: "",
      type: "image",
      finish: 0,
    },
    {
      content: "",
      type: "image",
      finish: 0,
    },
    {
      content: "",
      type: "image",
      finish: 0,
    },
    {
      content: "",
      type: "image",
      finish: 0,
    },
    {
      content: "",
      type: "image",
      finish: 0,
    },
  ]);

  // for get the duration
  const [end, setEnd] = useState(0);
  // current is for get the current content is now playing

  // if load true then start the animation of the bars at the top
  const [load, setLoad] = useState(false);

  // progress is the animation value of the bars content playing the current state
  const progress = useRef(new Animated.Value(0)).current;
  let [fontsLoaded] = useFonts({
    Ubuntu: require("./assets/fonts/Ubuntu.ttf"),
    Noto: require("./assets/fonts/Noto.ttf"),
    UbuntuBold: require("./assets/fonts/Ubuntu-Bold.ttf"),
    NotoBold: require("./assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <MyAwesomeSplashScreen />;
  }
  const translations = {
    en: {
      more: "More Info",
    },
    ar: {
      more: "التفاصيل",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = "ar";
  i18n.enableFallback = true;
  // start() is for starting the animation bars at the top
  function start(n) {
    // checking if the content type is video or not
    // type image
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        next();
      }
    });
  }
  // handle playing the animation
  function play() {
    start(end);
  }

  // next() is for changing the content of the current content to +1
  function next() {
    // check if the next content is not empty
    if (current !== content.length - 1) {
      let data = [...content];
      data[current].finish = 1;
      setContent(data);
      setCurrent(current + 1);
      progress.setValue(0);
      setLoad(false);
    } else {
      // the next content is empty
      navigation.navigate("Explore");
    }
  }

  // previous() is for changing the content of the current content to -1
  function previous() {
    // checking if the previous content is not empty
    if (current - 1 >= 0) {
      let data = [...content];
      data[current].finish = 0;
      setContent(data);
      setCurrent(current - 1);
      progress.setValue(0);
      setLoad(false);
    } else {
      // the previous content is empty
      close();
    }
  }

  // closing the modal set the animation progress to 0
  function close() {
    progress.setValue(0);
    setLoad(false);
  }
  const organizer = organizerStore.getOrganizerById(
    adSpots[current]?.organizer
  );

  return (
    <View style={styles.containerModal}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.backgroundContainer}>
        {/* check the content type is video or an image */}
        <Image
          onLoadEnd={() => {
            progress.setValue(0);
            play();
          }}
          source={{
            uri: baseURL + adSpots[current]?.image,
          }}
          style={{
            width: width,
            height: height,
            resizeMode: "cover",
            borderRadius: 10,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: 0.3,
          }}
        ></View>
      </View>
      <View
        style={{
          flexDirection: "column",
          flex: 1,
          marginTop: 40,
        }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0)", "transparent"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 100,
            borderRadius: 10,
          }}
        />
        {/* ANIMATION BARS */}
        <View
          style={{
            flexDirection: "row",
            paddingTop: 10,
            paddingHorizontal: 10,
          }}
        >
          {content.map((index, key) => {
            return (
              // THE BACKGROUND
              <View
                key={key}
                style={{
                  height: 2,
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: "rgba(117, 117, 117, 0.5)",
                  marginHorizontal: 2,
                }}
              >
                {/* THE ANIMATION OF THE BAR*/}
                <Animated.View
                  style={{
                    flex: current == key ? progress : content[key].finish,
                    height: 2,
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  }}
                />
              </View>
            );
          })}
        </View>
        {/* END OF ANIMATION BARS */}

        <View
          style={{
            height: 50,
            flexDirection:
              i18n.locale === "en-US" || i18n.locale === "en"
                ? "row"
                : "row-reverse",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            marginTop: 10,
          }}
        >
          {/* THE AVATAR AND USERNAME  */}
          <View
            style={{
              flexDirection:
                i18n.locale === "en-US" || i18n.locale === "en"
                  ? "row"
                  : "row-reverse",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: "white",
                resizeMode: "contain",
              }}
              source={{
                uri: baseURL + organizer?.image,
              }}
            />
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                paddingLeft: 10,
                paddingRight: 10,
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
                ? organizer?.displayNameEn
                : organizer?.displayNameAr}
            </Text>
          </View>
          {/* END OF THE AVATAR AND USERNAME */}
          {/* THE CLOSE BUTTON */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Explore");
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 50,
                paddingHorizontal: 15,
              }}
            >
              <Ionicons name="ios-close" size={28} color="white" />
            </View>
          </TouchableOpacity>
          {/* END OF CLOSE BUTTON */}
        </View>
        {/* HERE IS THE HANDLE FOR PREVIOUS AND NEXT PRESS */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableWithoutFeedback onPress={() => previous()}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => next()}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </View>
        {/* END OF THE HANDLE FOR PREVIOUS AND NEXT PRESS */}
      </View>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "700",
          fontFamily:
            i18n.locale === "en-US" || i18n.locale === "en"
              ? "UbuntuBold"
              : "NotoBold",
          color: "white",
          shadowColor: "#000",
          alignSelf:
            i18n.locale === "en-US" || i18n.locale === "en"
              ? "flex-start"
              : "flex-end",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
          margin: 30,
          marginBottom: 0,
        }}
      >
        {i18n.locale === "en-US" || i18n.locale === "en"
          ? adSpots[current]?.name
          : adSpots[current]?.nameAr}
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: "white",
          fontFamily:
            i18n.locale === "en-US" || i18n.locale === "en" ? "Ubuntu" : "Noto",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
          lineHeight: 28,
          textAlign:
            i18n.locale === "en-US" || i18n.locale === "en" ? "left" : "right",
          margin: 30,
        }}
      >
        {i18n.locale === "en-US" || i18n.locale === "en"
          ? adSpots[current]?.description
          : adSpots[current]?.descriptionAr}
      </Text>
      <TouchableOpacity
        style={{
          display: "flex",
          alignSelf: "center",
          borderRadius: 25,
          height: 65,
          width: "90%",
          backgroundColor: "#e52b51",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
          marginBottom: 35,
          justifyContent: "center",
          zIndex: 99,
        }}
        onPress={() =>
          navigation.navigate("SpotDetails", { id: adSpots[current]._id })
        }
      >
        <Text
          style={{
            color: "white",
            fontSize: 22,
            alignSelf: "center",
            marginLeft: 10,
            marginRight: 10,
            fontFamily: "Ubuntu",
          }}
        >
          {i18n.locale === "en-US" || i18n.locale === "en"
            ? "More Details"
            : "تفاصيل اكثر"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default observer(Advertisments);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerModal: {
    flex: 1,
    backgroundColor: "black",
    borderRadius: 10,
    height: "100%",
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
