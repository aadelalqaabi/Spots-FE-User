import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import authStore from "../stores/authStore";
import pointStore from "../stores/pointStore";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import spotStore from "../stores/spotStore";
import ticketStore from "../stores/ticketStore";

export default function SpottedScanner({ route }) {
  const spot = route.params.spot;
  const [ticket, setTicket] = useState();
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
    const spotId = data.split("spots://Profile/")[1];
    const found = pointStore.points.some(
      (point) => point.user === authStore.user.id && point.spot === spotId
    );
    if (!found) {
      authStore.spotAdd(spotId);
      setTicket(
        ticketStore.tickets.find(
          (ticket) =>
            ticket.user === authStore.user.id && ticket.spot._id === spotId
        )
      );
      pointStore.createPoint(spotId);
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
      <FancyAlert
        visible={visible}
        icon={
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e52b51",
              borderRadius: 50,
              width: "100%",
            }}
          >
            <Ionicons
              style={{
                color: "white",
                fontSize: 40,
                fontWeight: "bold",
              }}
              name="flash"
            ></Ionicons>
          </View>
        }
        style={{ backgroundColor: "white" }}
      >
        <Text
          style={{
            marginTop: -16,
            marginBottom: 32,
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
            marginTop:
              i18n.locale === "en-US" || i18n.locale === "en" ? -16 : -20,
            marginBottom: 32,
            width: "80%",
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
            marginTop: -16,
            marginBottom: 32,
            width: "60%",
            backgroundColor: "#e52b51",
            borderRadius: "50%",
            height: 40,
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#f1f1f1",
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
      </FancyAlert>
      <FancyAlert
        visible={visible2}
        icon={
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e52b51",
              borderRadius: 50,
              width: "100%",
            }}
          >
            <Ionicons
              style={{
                color: "white",
                fontSize: 40,
                fontWeight: "bold",
              }}
              name="flash"
            ></Ionicons>
          </View>
        }
        style={{ backgroundColor: "white" }}
      >
        <Text
          style={{
            marginTop: -16,
            marginBottom: 32,
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
            marginTop:
              i18n.locale === "en-US" || i18n.locale === "en" ? -16 : -20,
            marginBottom: 20,
            width: "80%",
            textAlign: "center",
            fontSize: 21,
            fontFamily: "UbuntuBold",
            lineHeight: 30,
          }}
        >
          Name: {authStore.user.username}
        </Text>
        <Text
          style={{
            marginTop:
              i18n.locale === "en-US" || i18n.locale === "en" ? -16 : -20,
            marginBottom: 35,
            width: "80%",
            textAlign: "center",
            fontSize: 21,
            fontFamily: "UbuntuBold",
            lineHeight: 30,
          }}
        >
          Tickets: {ticket?.amount}
        </Text>
        <TouchableOpacity
          style={{
            marginTop: -16,
            marginBottom: 32,
            width: "60%",
            backgroundColor: "#e52b51",
            borderRadius: "50%",
            height: 40,
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#f1f1f1",
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
      </FancyAlert>
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
