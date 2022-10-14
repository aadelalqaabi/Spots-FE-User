import {
  Text,
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
  useColorScheme,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import authStore from "../stores/authStore";
import { observer } from "mobx-react";
import { baseURL } from "../stores/instance";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";

function EditScreen() {
  const colorScheme = useColorScheme();
  const [image, setImage] = useState(baseURL + authStore.user.image);
  const [user, setUser] = useState();
  const navigation = useNavigation();
  const cancelButton = () => {
    navigation.goBack();
    console.log("cancel");
  };
  console.log("image", image);
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

  const handleSubmit = async () => {
    Toast.show({
      type: "success",
      text1: "Profile Image Updated 👍",
    });
    navigation.navigate("Profile");
    await authStore.updateUser(user);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
      }}
    >
      <StatusBar backgroundColor="black" />
      <View style={styles.cancel}>
        <Button onPress={cancelButton} title="Cancel" color="red" />
      </View>
      <View style={styles.main}>
        <View style={{ paddingBottom: 30 }}>
          {image === null ? (
            <Button title="Choose an image" onPress={pickImage} />
          ) : (
            <></>
          )}

          {image && (
            <View>
              <Image
                source={
                  image !== baseURL
                    ? {
                        uri: image,
                      }
                    : require("../assets/PP.jpeg")
                }
                style={{
                  alignSelf: "center",
                  width: 200,
                  height: 200,
                  borderRadius: 100,
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
              <Button title="Choose another image " onPress={pickImage} />
            </View>
          )}
        </View>

        <View
          style={{
            borderColor: "#9279f7",
            borderWidth: 0.5,
            width: 150,
            alignSelf: "center",
            borderRadius: "50%",
            backgroundColor: "white",
          }}
        >
          {/* <View style={styles.button}> */}
          <Button color={"#9279f7"} title="Update" onPress={handleSubmit} />
          {/* </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
}
export default observer(EditScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  cancel: {
    marginRight: 20,
    marginTop: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 25,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  addImage: {
    backgroundColor: "pink",
    borderRadius: 10,
    padding: 10,
  },
  addImageText: {
    fontSize: 30,
  },
  input: {
    width: 250,
    margin: 12,

    padding: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#9279f7",
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 150,
    alignItems: "center",
    alignSelf: "center",
    marginRight: 35,
  },
});
