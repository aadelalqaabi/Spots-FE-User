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
  const [user, setUser] = useState(route.params.user);
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
          marginTop: "50%",
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
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                backgroundColor: "white",
                width: 250,
                height: 250,
                borderRadius: "150%",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
              }}
              onPress={pickImage}
            >
              <Ionicons
                style={{
                  fontSize: 150,
                }}
                name="image-outline"
              ></Ionicons>
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "Ubuntu",
                fontSize: 16,
                paddingTop: 30,
                width: "100%",
                textAlign: "center",
                color: "#64666b",
              }}
            >
              Pick a profile image
            </Text>
          </View>
        ) : (
          <></>
        )}
        <Image
          source={{ uri: image }}
          style={{
            alignSelf: "center",
            width: 240,
            height: 240,
            borderRadius: 150,
            margin: 10,
            shadowOpacity: 0.8,
            shadowRadius: 4,
            shadowColor: "black",
            shadowOffset: {
              height: 0,
              width: 0,
            },
            elevation: 1,
          }}
        />
        {image && (
          <Button
            color="#4831d4"
            title="Choose another image "
            onPress={pickImage}
          />
        )}
      </View>
      <View style={{ marginBottom: "8%" }}>
        <View style={styles.button}>
          <Button title="Done" color="white" onPress={handleSubmit} />
        </View>
        <View>
          <Button title="Skip" color="#4831d4" onPress={handleSubmit} />
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
    width: "85%",
    marginBottom: 15,
  },
});

{
  /* marginBottom: 120*/
}
