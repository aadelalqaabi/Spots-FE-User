import {
  StyleSheet,
  View,
  Image,
  Button,
  useColorScheme,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
import authStore from "../../stores/authStore";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import MyAwesomeSplashScreen from "../../MyAwesomeSplashScreen";
import { useNavigation } from "@react-navigation/native";

export default function AppleImage({ route }) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      image: "Choose Profile Image",
    },
    ar: {
      image: "اختر صورة لحسابك",
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

  const [image, setImage] = useState(null);
  const [toggle, setToggle] = useState(false);
  const { itemId } = route.params;
  const [user, setUser] = useState(itemId);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
    Noto: require("../../assets/fonts/Noto.ttf"),
    NotoBold: require("../../assets/fonts/NotoBold.ttf"),
  });
  if (!fontsLoaded) {
    return <View style={{ backgroundColor: "transparent" }}></View>;
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      width: 300,
      height: 300,
    });

    if (!result.cancelled) {
      let filename = result.uri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let img_type = match ? `image/${match[1]}` : `image`;
      setUser({
        ...user,
        image: {
          uri:
            Platform.OS === "android"
              ? result.uri
              : result.uri.replace("file://", ""),
          name: filename,
          type: img_type,
        },
      });
      setImage(result.uri);
    }
    setToggle(true);
  };
  const handleSubmit = () => {
    setIsLoading(true);
    try {
      authStore.register(user);
      if (authStore.user) navigation.navigate("Home");
    } catch (error) {
      setIsLoading(false);
    }
  };

  if (isLoading) return <MyAwesomeSplashScreen />;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignSelf: "center",
        alignContent: "center",
        justifyContent: "space-between",
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
      }}
    >
      <Ionicons
        style={{
          position: "absolute",
          fontSize: 35,
          marginTop: 80,
          marginLeft: 20,
          paddingRight: 20,
          alignSelf:
            i18n.language.split("-")[0] === "en" ? "flex-start" : "flex-end",
          color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
        }}
        name={
          i18n.language.split("-")[0] === "en"
            ? "chevron-back-outline"
            : "chevron-forward-outline"
        }
        onPress={() => navigation.goBack()}
      ></Ionicons>
      <View
        style={{
          justifyContent: "center",
          marginTop: 130,
          width: "70%",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "UbuntuBold" : "NotoBold",
            fontSize: i18n.language.split("-")[0] === "en" ? 28 : 30,
            marginBottom: i18n.language.split("-")[0] === "en" ? 20 : 10,
            margin: 20,
            marginTop: 0,
            width: "100%",
            textAlign: "center",
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
          }}
        >
          {i18n.language.split("-")[0] === "en"
            ? "Choose profile image"
            : "اختر صورة حسابك"}
        </Text>
        <Text
          style={{
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            fontSize: i18n.language.split("-")[0] === "en" ? 16 : 18,
            paddingTop: 3,
            margin: 20,
            marginTop: 0,
            marginBottom: i18n.language.split("-")[0] === "en" ? 20 : 10,
            width: "100%",
            textAlign: "center",
            color: "#64666b",
            lineHeight: 23,
            color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
            opacity: 0.8,
          }}
        >
          {i18n.language.split("-")[0] === "en"
            ? "Add profile image so your friends know your reviews"
            : "اختر صورة لحسابك، ليرى اصدقائك تقاييمك"}
        </Text>
        <View
          style={{
            marginTop: "30%",
          }}
        >
          {image === null ? (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: "-30%",
              }}
            >
              <Ionicons
                style={{
                  fontSize: 165,
                  color: colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
                }}
                name="image-outline"
              ></Ionicons>
            </View>
          ) : (
            <></>
          )}
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginBottom: toggle ? "45%" : 0,
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                alignSelf: "center",
                width: 240,
                height: 240,
                marginTop: -20,
                borderRadius: 150,
              }}
            />
            {image && (
              <View
                style={{
                  marginTop: 10,
                }}
              >
                <Button
                  color="#e52b51"
                  title={
                    i18n.language.split("-")[0] === "en"
                      ? "Choose another image"
                      : "اختر صورةاخرى"
                  }
                  onPress={pickImage}
                />
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            width: "100%",
          }}
        >
          {toggle === false ? (
            <View style={styles.button}>
              <Button
                onPress={pickImage}
                title={
                  i18n.language.split("-")[0] === "en"
                    ? "Pick image"
                    : "اختر صورة"
                }
                color="white"
              />
            </View>
          ) : (
            <View
              style={{
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 15,
                elevation: 3,
                backgroundColor: "#e52b51",
                alignSelf: "center",
                width: "100%",
                marginBottom: 45,
              }}
            >
              <Button
                title={i18n.language.split("-")[0] === "en" ? "Done" : "تم"}
                color="white"
                onPress={handleSubmit}
              />
            </View>
          )}
          {!toggle && (
            <View>
              <Button
                title={i18n.language.split("-")[0] === "en" ? "Skip" : "تخطى"}
                color="#e52b51"
                onPress={handleSubmit}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 40,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#e52b51",
    alignSelf: "center",
    width: "100%",
    marginBottom: 15,
  },
});
