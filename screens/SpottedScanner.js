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
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import spotStore from "../stores/spotStore";
import ticketStore from "../stores/ticketStore";

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
  const [visible3, setVisible3] = useState(false);
  const toggleAlert3 = useCallback(() => {
    setVisible3(!visible3);
  }, [visible3]);
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
    const regex =
      /{\s*("[^"]+"|'[^']+'|[a-zA-Z0-9_]+)\s*:\s*(("[^"]+"|'[^']+'|[a-zA-Z0-9_]+)|\d+)\s*(,\s*("[^"]+"|'[^']+'|[a-zA-Z0-9_]+)\s*:\s*(("[^"]+"|'[^']+'|[a-zA-Z0-9_]+)|\d+)\s*)*}/;
    const match = new RegExp(regex);
    if (match.test(data) === true) {
      const qrData = JSON.parse(data);
      if (qrData.isDest === true) {
        setScanned(true);
        const spotId = qrData.url.split("dest://Profile/")[1];
        const found = pointStore.points.some(
          (point) => point.user === authStore.user.id && point.spot === spotId
        );
        if (!found && ticket.spot._id === spotId) {
          let spot = spotStore.getSpotsById(spotId);
          authStore.spotAdd(spotId);
          pointStore.createPoint(spotId);
          spotStore.updateSpot(spot, spotId);
          ticketStore.deleteTicket(ticket._id);
          if (spot.isFree === true) {
            toggleAlert();
          } else {
            toggleAlert2();
          }
        } else {
          alert("Spot already added");
          navigation.goBack();
        }
      } else {
        setScanned(true);
        toggleAlert3();
        return;
      }
    } else {
      setScanned(true);
      toggleAlert3();
      return;
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
            i18n.language.split("-")[0] === "en" ? "flex-start" : "flex-end",
        }}
        name={
          i18n.language.split("-")[0] === "en"
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
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.language.split("-")[0] === "en"
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
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                lineHeight: 30,
              }}
            >
              {i18n.language.split("-")[0] === "en"
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
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.language.split("-")[0] === "en"
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
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.language.split("-")[0] === "en"
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
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.language.split("-")[0] === "en"
                  ? "View Experience"
                  : "عرض التجربة"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={visible3}
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
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                width: "90%",
                textAlign: "center",
                fontSize: 24,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Invalid QR code"
                : "رمز غير صالح"}
            </Text>
            <Text
              style={{
                marginBottom: i18n.language.split("-")[0] === "en" ? 10 : 20,
                width: "70%",
                textAlign: "center",
                fontSize: 17,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                lineHeight: 30,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? `please scan a valid QR code`
                : `الرجاء مسح رمز صالح`}
            </Text>
            <TouchableOpacity
              style={{
                width: "50%",
                backgroundColor: "#e52b51",
                borderRadius: 50,
                height: 40,
                justifyContent: "center",
              }}
              onPress={() => {
                navigation.goBack();
                toggleAlert3();
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontFamily:
                    i18n.language.split("-")[0] === "en"
                      ? "UbuntuBold"
                      : "NotoBold",
                  fontSize: 15,
                }}
              >
                {i18n.language.split("-")[0] === "en" ? "Close" : "اغلاق"}
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
