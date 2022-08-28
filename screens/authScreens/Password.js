import { StyleSheet, View, Button, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import { Alert } from "react-native";
import React from "react";
import TextInput from "react-native-text-input-interactive";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function Password({ navigation, route }) {
  const { itemId } = route.params;
  const [user, setUser] = useState(itemId);
  const [checkValidation, setCheckValidation] = useState(true);
  const [checkValidationColor, setCheckValidationColor] = useState("#4831d4");
  const [showError, setShowError] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [number, setNumber] = useState(true);
  const [specialCharacter, setSpecialCharacter] = useState(true);
  const [characterLength, setCharacterLength] = useState(true);

  const handleChange = (name, value) => {
    const check = checkEntry(value);
    if(check === true){
      setUser({ ...user, [name]: value });
      setCheckValidation(false);
      setCheckValidationColor("#4831d4");
      setShowError(false);
    } else{
      setCheckValidation(true);
      setCheckValidationColor("red");
      setShowError(true);
    } 
  };
  const checkEntry = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const  lowerCase = new RegExp("^(?=.*[a-z])");
    const upperCase = new RegExp("^(?=.*[A-Z])");
    const number = new RegExp("^(?=.*[0-9])");
    const specialCharacter = new RegExp("^(?=.*[!@#\$%\^&\*])");
    const characterLength = new RegExp("^(?=.{8,})");

    if(lowerCase.test(password) === true){
      setLowerCase(false)
    } else{
      setLowerCase(true)
    }

    if(upperCase.test(password) === true){
      setUpperCase(false)
    } else{
      setUpperCase(true)
    }

    if(number.test(password) === true){
      setNumber(false)
    } else{
      setNumber(true)
    }

    if(specialCharacter.test(password) === true){
      setSpecialCharacter(false)
    } else{
      setSpecialCharacter(true)
    }

    if(characterLength.test(password) === true){
      setCharacterLength(false)
    } else{
      setCharacterLength(true)
    }
    
    return re.test(password);
  };
  let [fontsLoaded] = useFonts({
    UbuntuBold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
 
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    
    <View
      style={{
        width: "100%",
        height: "100%",
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
          Enter Password
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
          Create a password to protect your account
        </Text>
        <View style={{ width: "110%", alignSelf: "center", display:"flex", flexDirection:"column", justifyContent:"space-between", height:"73%" }}>
        <View style={styles.container}>
          <TextInput
            textInputStyle={{
              alignSelf: "center",
              width: "103%",
              marginBottom: 20,
            }}
            mainColor={checkValidationColor}
            label="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              handleChange("password", text);
            }}
            placeholder="Enter Password"
            keyboardType="web-search"
            onSubmitEditing={() => {
              checkValidation===false? navigation.navigate("MyImage", { itemId: user }) : Alert.alert("Invalid Password", "", [{ text: "Try Again" }]);;
            }}
          />
          {/* {showError === true ? 
            <>
              <Ionicons name="close-outline" size={24} color="red" />
            </>
            :
            <>
              <Ionicons name="checkmark" size={24} color="green" />
            </>
          } */}
          {lowerCase === true ? 
            <View style={styles.errorContainer}>
              <Ionicons name="close-circle" size={22} color="red" />
              <Text style={styles.errorText}>At least 1 lowercase character</Text>
            </View>
            :
            <View style={styles.errorContainer}>
              <Ionicons name="checkmark-circle" size={22} color="#00b100" />
              <Text style={styles.correctText}>At least 1 lowercase character</Text>
            </View>
          }
          {upperCase === true ? 
            <View style={styles.errorContainer}>
              <Ionicons name="close-circle" size={22} color="red" />
              <Text style={styles.errorText}>At least 1 uppercase character</Text>
            </View>
            :
            <View style={styles.errorContainer}>
              <Ionicons name="checkmark-circle" size={22} color="#00b100" />
              <Text style={styles.correctText}>At least 1 uppercase character</Text>
            </View>
          }
          {number === true ? 
            <View style={styles.errorContainer}>
              <Ionicons name="close-circle" size={22} color="red" />
              <Text style={styles.errorText}>At least 1 number</Text>
            </View>
            :
            <View style={styles.errorContainer}>
              <Ionicons name="checkmark-circle" size={22} color="#00b100" />
              <Text style={styles.correctText}>At least 1 number</Text>
            </View>
          }
          {specialCharacter === true ? 
            <View style={styles.errorContainer}>
              <Ionicons name="close-circle" size={22} color="red" />
              <Text style={styles.errorText}>At least 1 special character</Text>
            </View>
            :
            <View style={styles.errorContainer}>
              <Ionicons name="checkmark-circle" size={22} color="#00b100" />
              <Text style={styles.correctText}>At least 1 special character</Text>
            </View>
          }
          {characterLength === true ? 
            <View style={styles.errorContainer}>
              <Ionicons name="close-circle" size={22} color="red" />
              <Text style={styles.errorText}>At least 8 characters</Text>
            </View>
            :
            <View style={styles.errorContainer}>
              <Ionicons name="checkmark-circle" size={22} color="#00b100" />
              <Text style={styles.correctText}>At least 8 characters</Text>
            </View>
          }
          </View>
          <View style={{flex:1, justifyContent:"flex-end"}}>
          {checkValidation === true ? 
            <View style={styles.buttonx}>
              <Button
                title="Next"
                color="white"
                disabled={checkValidation}
                onPress={() => {
                  navigation.navigate("MyImage", { itemId: user });
                }}
              />
            </View>
            :
            <View style={styles.button}>
              <Button
                title="Next"
                color="white"
                disabled={checkValidation}
                onPress={() => {
                  navigation.navigate("MyImage", { itemId: user });
                }}
              />
            </View>
          }
          </View>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#4831d4",
  },
  buttonx: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#988be6",
  },
  errorContainer: {
    // borderWidth: 2,
    // borderTopWidth: 5,
    // borderBottomWidth: 5,
    // borderLeftWidth: 5,
    // borderRightWidth: 5,
    // borderColor: '#000',
    // paddingBottom: 10,
    flexDirection: 'row',
    // borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
    marginTop: -12,
    marginTop: 3,
    marginLeft: 6
  },
  errorText: {
    marginTop: 3,
    marginLeft: 10,
    color:"#525252",
    fontSize: 15
  },
  correctText: {
    marginTop: 3,
    marginLeft: 10,
    color:"#525252",
    fontSize: 15
  },
  container: {
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
    flex:1
  },
});
