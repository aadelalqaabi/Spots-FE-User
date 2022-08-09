import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import authStore from "../stores/authStore";
import pointStore from "../stores/pointStore";
import spotStore from "../stores/spotStore";

export default function SpottedScanner({ route }) {
  const spot = route.params.spot;
  let num = 1;
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
    const found = authStore.user.spots.some((spot) => spot === spotId);
    console.log("found", found);
    if (!found && data) {
      authStore.spotAdd(spotId);
      pointStore.createPoint(spotId);
      alert("added");
      navigation.navigate("Profile", { id: spot._id });
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
        style={styles.back}
        name="chevron-back-outline"
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
