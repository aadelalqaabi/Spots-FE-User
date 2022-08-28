import { StyleSheet, View, Button, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import React from "react";
import TextInput from "react-native-text-input-interactive";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import PhoneInput from "react-native-phone-number-input";
import AppLoading from "expo-app-loading";

export default function PhoneNo({ navigation, route }) {
  const { itemId } = route.params;
  const [user, setUser] = useState(itemId);
  const [checkValidation, setCheckValidation] = useState(true);
  const [checkValidationColor, setCheckValidationColor] = useState("#4831d4");
  const [begining, setBegining] = useState(true);
  const [showError, setShowError] = useState(true);

  const handleChange = (name, value) => {
    const check = checkEntry(value);
    if(check === true){
      setUser({ ...user, [name]: value });
      console.log('user.phone', user.phone)
      setCheckValidation(false);
      setCheckValidationColor("#4831d4");
      setShowError(false);
    } else{
      setCheckValidation(true);
      setCheckValidationColor("red");
      setBegining(false);
      setShowError(true);
    } 
  };
  const checkEntry = (phoneNumber) => {
    // const re = new RegExp("^(?=.[0-9]{7,7}$)");
    const re = new RegExp("^(?=.[0-9]{11,11}$)");
    // ^[0-9]{4} ^(?=.{8,})
    return re.test(phoneNumber);
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
          Enter Phone Number
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
          Add a phone number for your account (Must be at least 8 numbers)
        </Text>
        <View style={{ width: "110%", alignSelf: "center", display:"flex", flexDirection:"column", justifyContent:"space-between", height:"73%" }}>
          <View style={styles.container}>
            {/* <TextInput
              textInputStyle={{
                alignSelf: "center",
                width: "100%",
                marginBottom: 10,
                padding: 14,
                paddingLeft: 50,
                fontFamily: "Ubuntu", 
              }}
              mainColor={checkValidationColor}
              label="Phone Number"
              onChangeText={(text) => {
                handleChange("phone", text);
              }}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              onSubmitEditing={() => {
                navigation.navigate("Email", { itemId: user });
              }}
            />
            {begining === true ? (
              <Ionicons style={styles.icon} name="call" size={18} color="#4831d4" />
            ) : (
              <>
                {showError === true ? (
                  <Ionicons style={styles.icon} name="close-outline" size={18} color="red" />
                ) : (
                  <Ionicons style={styles.icon} name="checkmark" size={16} color="#00b100" />
                )}
              </>
            )} */}
            <PhoneInput
                // ref={phoneInput}
                containerStyle={{
                    alignSelf: "center",
                    width: "103%",
                    marginBottom: 10,
                    // padding: 14, 
                }}
                textInputStyle={{
                    fontFamily: "Ubuntu", 
                }}
                defaultValue={user.phoneNumber}
                defaultCode="KW"
                layout="first"
                // second
                // onChangeText={(text) => {
                //     handleChange("phone", text);
                // }}
                onChangeFormattedText={(text) => {
                    handleChange("phone", text);
                }}
                withDarkTheme
                withShadow
                autoFocus
            />
          </View>
          <View style={{flex:1, justifyContent:"flex-end"}}>
          {checkValidation === true ? 
            <View style={styles.buttonx}>
              <Button
                title="Next"
                color="white"
                disabled={checkValidation}
                onPress={() => {
                  navigation.navigate("Email", { itemId: user });
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
                  navigation.navigate("Email", { itemId: user });
                }}
              />
            </View>
          }</View>
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
    marginLeft: 8
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
  },
  container: {
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
    flex:1
  },
  icon: {
    zIndex: 99,
    position: "absolute",
    marginLeft: 12,
    marginTop: 12,
    fontSize: 25,
    // color: "grey",
  },
  formField: {
    padding: 14,
    paddingLeft: 50,
    borderRadius: 13,
    fontSize: 18,
    fontFamily: "Ubuntu",
    width: "100%",
  },
});

{
  /* marginBottom: 120*/
}
