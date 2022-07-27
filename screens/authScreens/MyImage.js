import {
  StyleSheet,
  View,
  Image,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState, useEffect } from "react";
import authStore from "../../stores/authStore";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

export default function MyImage({ navigation, route }) {
  const [image, setImage] = useState(null);
  const [toggle, setToggle] = useState(false);
  const { itemId } = route.params;
  const [user, setUser] = useState(itemId);

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
  });
  if (!fontsLoaded) {
    return <AppLoading />;
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
    authStore.register(user);
  };
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
        backgroundColor: "white",
      }}
    >
      <Ionicons
        style={{
          position: "absolute",
          fontSize: 35,
          marginTop: 80,
          marginLeft: 20,
        }}
        name="chevron-back-outline"
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
            fontFamily: "UbuntuBold",
            fontSize: 30,
            margin: 20,
            marginTop: 0,
            width: "100%",
            textAlign: "center",
          }}
        >
          Add Profile Image
        </Text>
        <Text
          style={{
            fontFamily: "Ubuntu",
            fontSize: 16,
            margin: 20,
            marginTop: 0,
            width: "100%",
            textAlign: "center",
            color: "#64666b",
            lineHeight: 20,
          }}
        >
          Add profile image so your friends know your reviews
        </Text>
        <View
          style={{
            marginTop: "40%",
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
              }}
            >
              <View
                style={{
                  shadowColor: "#000",
                  backgroundColor: "white",
                  borderRadius: "150%",
                  alignSelf: "center",
                }}
              >
                <Image
                  style={{
                    width: 180,
                    height: 180,
                  }}
                  source={require("../../assets/addImage.png")}
                ></Image>
              </View>
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
                marginTop: -10,
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
                  color="#4831d4"
                  title="Choose another image"
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
              <Button onPress={pickImage} title="Pick Image" color="white" />
            </View>
          ) : (
            <View style={styles.button}>
              <Button title="Done" color="white" onPress={handleSubmit} />
            </View>
          )}
          {!toggle && (
            <View>
              <Button title="Skip" color="#4831d4" onPress={handleSubmit} />
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
    backgroundColor: "#4831d4",
    alignSelf: "center",
    width: "100%",
    marginBottom: 15,
  },
});
