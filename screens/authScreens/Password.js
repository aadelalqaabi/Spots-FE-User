import { StyleSheet, View, Button, Text } from "react-native";
import { useState } from "react";
import React from "react";
import TextInput from "react-native-text-input-interactive";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function Password({ navigation, route }) {
  const { itemId } = route.params;
  const [user, setUser] = useState(itemId);
  const [checkValidation, setCheckValidation] = useState(true);
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
      setShowError(false);
    } else{
      setCheckValidation(true);
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
          Create a password to protect your account with it
        </Text>
        <View style={{ width: "100%", alignSelf: "center" }}>
          <TextInput
            textInputStyle={{
              alignSelf: "center",
              width: "100%",
              marginBottom: 10,
            }}
            mainColor="#4831d4"
            label="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              handleChange("password", text);
            }}
            placeholder="Enter Password"
            keyboardType="web-search"
            onSubmitEditing={() => {
              navigation.navigate("MyImage", { itemId: user });
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
              <Ionicons name="close-outline" size={18} color="red" />
              <Text style={styles.errorText}>The password must contain at least one lowercase character</Text>
            </View>
            :
            <View style={styles.errorContainer}>
              <Ionicons name="checkmark" size={16} color="green" />
              <Text style={styles.correctText}>The password must contain at least one lowercase character</Text>
            </View>
          }
          {upperCase === true ? 
            <View style={styles.errorContainer}>
              <Ionicons name="close-outline" size={18} color="red" />
              <Text style={styles.errorText}>The password must contain at least one uppercase character</Text>
            </View>
            :
            <View style={styles.errorContainer}>
              <Ionicons name="checkmark" size={16} color="green" />
              <Text style={styles.correctText}>The password must contain at least one uppercase character</Text>
            </View>
          }
          {number === true ? 
            <View style={styles.errorContainer}>
              <Ionicons name="close-outline" size={18} color="red" />
              <Text style={styles.errorText}>The password must contain at least one number</Text>
            </View>
            :
            <View style={styles.errorContainer}>
              <Ionicons name="checkmark" size={16} color="green" />
              <Text style={styles.correctText}>The password must contain at least one number</Text>
            </View>
          }
          {specialCharacter === true ? 
            <View style={styles.errorContainer}>
              <Ionicons name="close-outline" size={18} color="red" />
              <Text style={styles.errorText}>The password must contain at least one special character</Text>
            </View>
            :
            <View style={styles.errorContainer}>
              <Ionicons name="checkmark" size={16} color="green" />
              <Text style={styles.correctText}>The password must contain at least one special character</Text>
            </View>
          }
          {characterLength === true ? 
            <View style={styles.errorContainer}>
              <Ionicons name="close-outline" size={18} color="red" />
              <Text style={styles.errorText}>The password must be eight characters or longer</Text>
            </View>
            :
            <View style={styles.errorContainer}>
              <Ionicons name="checkmark" size={16} color="green" />
              <Text style={styles.correctText}>The password must be eight characters or longer</Text>
            </View>
          }
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
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#4831d4",
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
    marginLeft: -3,
    color:"red",
    fontSize: 10
  },
  correctText: {
    marginTop: 3,
    marginLeft: -2,
    color:"green",
    fontSize: 10
  }
});
