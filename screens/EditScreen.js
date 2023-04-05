import {
  Text,
  View,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
  useColorScheme,
  Platform,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import authStore from "../stores/authStore";
import { observer } from "mobx-react";
import { baseURL } from "../stores/instance";
import Toast from "react-native-toast-message";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import * as Localization from "expo-localization";
import TextInput from "react-native-text-input-interactive";
import { Ionicons } from "@expo/vector-icons";

function EditScreen() {
  const colorScheme = useColorScheme();
  const [image, setImage] = useState(baseURL + authStore.user.image);
  const [user, setUser] = useState();
  const [granted, setGranted] = useState();
  const [checkValidationColor, setCheckValidationColor] = useState("#e52b51");
  const [existsError, setExistsError] = useState(false);
  const [hideDone, setHideDone] = useState(false);
  const navigation = useNavigation();

  const cancelButton = () => {
    navigation.goBack();
  };
  const translations = {
    en: {
      phone: "Phone Number",
      login: "Login",
    },
    ar: {
      phone: "رقم الهاتف",
      login: "تسجيل دخول",
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

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
          setGranted(false);
        } else {
          setGranted(true);
        }
      }
    })();
  }, []);
  useEffect(() => {
    authStore.getEmails();
  }, []);

  const pickImage = async () => {
    if (granted === true) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });

      if (!result.canceled) {
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
        setHideDone(true);
      }
    } else {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };
  const handleChangeEmail = (name, value) => {
    setHideDone(true);
    const check = checkEntry(value);
    const checkExists = authStore.userEmails?.some(
      (user) => user.email === value
    );
    if (check === true && checkExists === false) {
      setUser({ ...user, [name]: value });
      setCheckValidationColor("green");
      setExistsError(false);
      setHideDone(true);
    } else if (check === false) {
      setCheckValidationColor("#ea3e29");
      setExistsError(false);
      setHideDone(false);
    } else {
      setCheckValidationColor("#ea3e29");
      setExistsError(true);
      setHideDone(false);
    }
  };
  const handleChangeName = (name, value) => {
    setHideDone(true);
    setUser({ ...user, [name]: value });
  };
  const checkEntry = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    Toast.show({
      type: "success",
      text1:
        i18n.language.split("-")[0] === "en"
          ? "Profile Updated 👍"
          : "👍 تم تحديث الملف الشخصي",
      position: "bottom",
    });
    navigation.goBack();
    await authStore.updateUser(user);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
      }}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.cancel}>
          <Button
            onPress={() => cancelButton()}
            title={i18n.language.split("-")[0] === "en" ? "Cancel" : "الغاء"}
            color={colorScheme === "light" ? "#000000" : "#f1f1f1"}
          />
        </View>
        <View style={styles.done}>
          {hideDone ? (
            <Button
              onPress={handleSubmit}
              title={i18n.language.split("-")[0] === "en" ? "Done" : "تم"}
              color={"#e52b51"}
            />
          ) : (
            <Button
              title={i18n.language.split("-")[0] === "en" ? "Done" : "تم"}
              disabled
            />
          )}
        </View>
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
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={
                    image !== baseURL
                      ? {
                          uri: image,
                        }
                      : require("../assets/PP.png")
                  }
                  style={{
                    alignSelf: "center",
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    margin: 10,
                    zIndex: -1,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    opacity: 0.2,
                  }}
                ></View>
                <Ionicons
                  style={{
                    position: "absolute",
                    zIndex: 99,
                    color: "#f1f1f1",
                    fontSize: 60,
                    shadowOpacity: 0.8,
                    shadowRadius: 4,
                    shadowColor: "black",
                    shadowOffset: {
                      height: 0,
                      width: 0,
                    },
                    elevation: 1,
                  }}
                  name="attach"
                ></Ionicons>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text
          style={{
            textAlign: i18n.language.split("-")[0] === "en" ? "left" : "right",
            width: "80%",
            padding: 10,
            paddingRight: 0,
            paddingLeft: 0,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "UbuntuBold" : "NotoBold",
            color: colorScheme === "light" ? "#000000" : "#f1f1f1",
            fontSize: 18,
          }}
        >
          {i18n.language.split("-")[0] === "en" ? "Full Name" : "الاسم الكامل"}
        </Text>
        <TextInput
          textInputStyle={{
            alignSelf: "center",
            width: "80%",
            marginBottom: 10,
            padding: 10,
            fontFamily:
              i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 1.41,
            elevation: 2,
          }}
          label="Name"
          onChangeText={(text) => {
            handleChangeName("name", text);
          }}
          defaultValue={authStore.user.name}
          placeholderTextColor={"grey"}
          keyboardType="web-search"
          editable={true}
        />
        {!authStore.user.email.includes("@privaterelay.appleid.com") ? (
          <>
            <Text
              style={{
                textAlign:
                  i18n.language.split("-")[0] === "en" ? "left" : "right",
                width: "80%",
                padding: 10,
                paddingRight: 0,
                paddingLeft: 0,
                fontFamily:
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                fontSize: 18,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Email"
                : "البريد الالكتروني"}
            </Text>
            <View style={{ width: "80%" }}>
              <TextInput
                textInputStyle={{
                  alignSelf: "center",
                  width: "100%",
                  padding: 10,
                  fontFamily:
                    i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                  backgroundColor: "white",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 1.41,
                  elevation: 2,
                }}
                label="Email"
                onChangeText={(text) => {
                  handleChangeEmail("email", text);
                }}
                mainColor={checkValidationColor}
                defaultValue={authStore.user.email}
                placeholderTextColor={"grey"}
                keyboardType="email-address"
                editable={true}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {i18n.language.split("-")[0] === "en" ? (
                <Text
                  style={{
                    color: "#ea3e29",
                    margin: 5,
                    marginTop: 10,
                    textAlign:
                      i18n.language.split("-")[0] === "en" ? "left" : "right",
                  }}
                >
                  {existsError === true ? "Email already exists" : ""}
                </Text>
              ) : (
                <Text
                  style={{
                    color: "#ea3e29",
                    margin: 5,
                    marginTop: 2,
                    textAlign:
                      i18n.language.split("-")[0] === "en" ? "left" : "right",
                  }}
                >
                  {existsError === true ? "البريد الالكتروني مستخدم" : ""}
                </Text>
              )}
            </View>
          </>
        ) : (
          <>
            <Text
              style={{
                textAlign:
                  i18n.language.split("-")[0] === "en" ? "left" : "right",
                width: "80%",
                padding: 10,
                paddingRight: 0,
                paddingLeft: 0,
                fontFamily:
                  i18n.language.split("-")[0] === "en"
                    ? "UbuntuBold"
                    : "NotoBold",
                color: colorScheme === "light" ? "#000000" : "#f1f1f1",
                fontSize: 18,
              }}
            >
              {i18n.language.split("-")[0] === "en"
                ? "Email"
                : "البريد الالكتروني"}
            </Text>

            <TextInput
              textInputStyle={{
                alignSelf: "center",
                width: "80%",
                marginBottom: 20,
                color: "grey",
                padding: 10,
                fontFamily:
                  i18n.language.split("-")[0] === "en" ? "Ubuntu" : "Noto",
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.1,
                shadowRadius: 1.41,
                elevation: 2,
              }}
              label="Email"
              defaultValue={authStore.user.email}
              placeholderTextColor={"grey"}
              keyboardType="email-address"
              editable={false}
            />
          </>
        )}
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
  containe2: {
    //width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
    marginTop: 5,
    marginRight: 15,
    marginLeft: 5,
    flex: 1,
  },
  cancel: {
    marginRight: 20,
    marginTop: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 25,
  },
  done: {
    marginLeft: 20,
    marginTop: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingRight: 25,
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 0,
    alignItems: "center",
    marginBottom: 10,
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
    backgroundColor: "#e52b51",
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
