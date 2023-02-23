import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Modal,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import authStore from "../stores/authStore";
import pointStore from "../stores/pointStore";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import spotStore from "../stores/spotStore";

export default function SpottedScanner({ route }) {
  const { spot, ticket } = route.params;
  const [visible, setVisible] = useState(false);
  const toggleAlert = useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  const [visible2, setVisible2] = useState(false);
  const toggleAlert2 = useCallback(() => {
    setVisible2(!visible2);
  }, [visible2]);
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
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    const spotId = data.split("dest://Profile/")[1];
    const found = pointStore.points.some(
      (point) => point.user === authStore.user.id && point.spot === spotId
    );
    if (!found) {
      let spot = spotStore.getSpotsById(spotId);
      authStore.spotAdd(spotId);
      pointStore.createPoint(spotId);
      spotStore.updateSpot(spot, spotId);
      if (spot.isFree === true) {
        toggleAlert();
      } else {
        toggleAlert2();
      }
    } else {
      alert("Spot already added");
      navigation.goBack();
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Ionicons
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          color: "white",
          zIndex: 99,
          marginTop: 70,
          marginLeft: 25,
          marginRight: 25,
          fontSize: 35,
          alignSelf:
            i18n.locale === "en-US" || i18n.locale === "en"
              ? "flex-start"
              : "flex-end",
        }}
        name={
          i18n.locale === "en-US" || i18n.locale === "en"
            ? "chevron-back-outline"
            : "chevron-forward-outline"
        }
      ></Ionicons>

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <Modal
        transparent={true}
        visible={visible}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "white",
              padding: 25,
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              borderColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                marginBottom: 10,
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
                ? `Welcome to ${spot.name}`
                : `${spot.nameAr} مرحبا بك في`}
            </Text>
            <Text
              style={{
                marginBottom: 10,
                width: "70%",
                textAlign: "center",
                fontSize: 17,
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "Ubuntu"
                    : "Noto",
                lineHeight: 30,
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
                ? "Live the experience of this destination by viewing its Rewards and Offers"
                : "عيش تجربة وجهتك من خلال عرض الجوائز والعروض"}
            </Text>
            <TouchableOpacity
              style={{
                width: "50%",
                backgroundColor: "#e52b51",
                borderRadius: 50,
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? "View Experience"
                  : "عرض التجربة"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={visible2}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "white",
              padding: 25,
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              borderColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                marginBottom: 10,
                fontFamily:
                  i18n.locale === "en-US" || i18n.locale === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.locale === "en-US" || i18n.locale === "en"
                ? `Welcome to ${spot.name}`
                : `${spot.nameAr} مرحبا بك في`}
            </Text>
            <Text
              style={{
                margin: 15,
                marginBottom: 0,
                marginTop: 5,
                width: "80%",
                textAlign: "left",
                fontSize: 21,
                fontFamily: "Ubuntu",
                lineHeight: 30,
              }}
            >
              Name: {authStore.user.name}
            </Text>
            <Text
              style={{
                margin: 15,
                marginTop: 5,
                width: "80%",
                textAlign: "left",
                fontSize: 21,
                fontFamily: "Ubuntu",
                lineHeight: 30,
              }}
            >
              Tickets: {ticket?.amount}
            </Text>
            <TouchableOpacity
              style={{
                width: "60%",
                backgroundColor: "#e52b51",
                borderRadius: 50,
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontFamily:
                    i18n.locale === "en-US" || i18n.locale === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.locale === "en-US" || i18n.locale === "en"
                  ? "View Experience"
                  : "عرض التجربة"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  back: {
    color: "white",
    zIndex: 99,
    marginTop: 70,
    marginLeft: 25,
    fontSize: 35,
  },
});
