import { StyleSheet, Text, View, TextInput, Image, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Center, Square, Circle } from "native-base";
import { useState, useEffect } from "react";
import authStore from "../../stores/authStore";
import React from "react";
import Reinput from "reinput";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareFlatList, KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
      <View style={{ width: "60%", alignSelf: "center" }}> 
        <View style={{ paddingBottom: 30 }}>
          {image === null ? (
            <View>
            {/* <Image
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPWpbYe9c5YS6KNOXFWiawk-ox545j3ya978qwGXmcladr3eLFh6IabWhNFVtFRI0YNjI&usqp=CAU" }}
            style={{
              alignSelf: "center",
              width: 240,
              height: 240,
              borderRadius: 150,
              marginTop: 260,
              marginBottom
              shadowOpacity: 0.8,
              shadowRadius: 4,
              shadowColor: "black",
              shadowOffset: {
                height: 0,
                width: 0,
              },
              elevation: 1,
            }}
            /> */}
            <View
              style={{
                alignSelf: "center",
                position: "absolute",
                zIndex: 1,
                marginTop: 100,
                borderColor: "black",
                borderWidth: 0.5,
                backgroundColor: "#4831d4",
                borderRadius: "50%",
                width: 220,
                padding: 5,
                paddingLeft: 30,
              }}
              // style={{
              //   alignSelf: "center",
              //   // position: "absolute",
              //   zIndex: 1,
              //   marginTop: 30,
              //   marginBottom: -30,
              //   borderColor: "black",
              //   borderWidth: 0.5,
              //   backgroundColor: "#111827",
              //   borderRadius: "50%",
              //   width: 220,
              //   padding: 5,
              //   paddingLeft: 30,
              // }}
            >
              <MaterialIcons
                style={{ position: "absolute", marginLeft: 10, marginTop: 8 }}
                name="file-upload"
                size={30}
                color="white"
              />
              <Button
                color={"white"}
                title="Add a Profile Picture"
                onPress={pickImage}
              />
            </View>
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

        <KeyboardAwareScrollView
      keyboardOpeningTime={500}
      // contentContainerStyle={styles.container}
      scrollEnabled={true}
    >
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
        </KeyboardAwareScrollView>
        <View style={styles.button}>
        <Button title="Register" color="white" onPress={handleSubmit} />
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
  },
});

{/* marginBottom: 120*/}
