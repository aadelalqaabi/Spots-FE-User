import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import authStore from "../stores/authStore";
import pointStore from "../stores/pointStore";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

export default function SpottedScanner({ route }) {
  const spot = route.params.spot;
  let num = 1;
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
      pointStore.createPoint(spotId);
      alert("added");
      navigation.navigate("Profile");
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
          alignSelf: i18n.locale === "en-US" ? "flex-start" : "flex-end",
        }}
        name={
          i18n.locale === "en-US"
            ? "chevron-back-outline"
            : "chevron-forward-outline"
        }
      ></Ionicons>

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
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
