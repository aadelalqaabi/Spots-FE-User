import { StyleSheet, Text, View, TextInput, Image, Button } from "react-native";
import { Center, Square, Circle } from "native-base";
import { useState, useEffect } from "react";
import authStore from "../../stores/authStore";
import React from "react";
import Reinput from "reinput";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function Register() {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email:"",
    image: "",
  });

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

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    authStore.register(user);
  };
  return (
    <View
      style={{
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ width: "60%", alignSelf: "center", marginBottom: 120 }}>
        <View style={{ paddingBottom: 30 }}>
          {image === null ? (
            <View
              style={{
                alignSelf: "center",
                position: "absolute",
                zIndex: 1,
                marginTop: 100,
                borderColor: "black",
                borderWidth: 0.5,
                backgroundColor: "#04a9f4",
                borderRadius: "50%",
                width: 200,
                padding: 5,
                paddingLeft: 30,
              }}
            >
              <MaterialIcons
                style={{ position: "absolute", marginLeft: 10, marginTop: 8 }}
                name="file-upload"
                size={30}
                color="white"
              />
              <Button
                color={"white"}
                title="Choose an image"
                onPress={pickImage}
              />
            </View>
          ) : (
            <></>
          )}

          <View>
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
          </View>
          {image && (
            <Button title="Choose another image " onPress={pickImage} />
          )}
        </View>
        <Reinput
          label="Username"
          onChangeText={(text) => {
            handleChange("username", text);
          }}
          placeholder="Enter Username"
        />
        <Reinput
          label="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            handleChange("password", text);
          }}
          placeholder="Enter Password"
        />
        <Reinput
          label="Email"
          onChangeText={(text) => {
            handleChange("email", text);
          }}
          placeholder="Enter Email"
        />

        {/* <Button size={"lg"} colorScheme={"blue"} onPress={handleSubmit}>
          "Register"
        </Button> */}
        <View style={styles.button}>
        <Button style={styles.titleb} title="Register" onPress={handleSubmit} />
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
    backgroundColor: "#FFB91C",
  },
  titleb: {
    color: "white"
  }
});
