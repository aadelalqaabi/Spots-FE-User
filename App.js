import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import MySpots from "./screens/MySpots";
import { Ionicons } from "@expo/vector-icons";
import AuthButtons from "./screens/authScreens/AuthButtons";
import MainPageRegister from "./screens/authScreens/MainPageRegister";
import Login from "./screens/authScreens/Login";
import authStore from "./stores/authStore";
import { SpotDetails } from "./screens/spots/SpotDetails";
import { SpotttedDetails } from "./screens/spots/SpotttedDetails";
import RootNavigator from "./index/home";
import ProfileNav from "./index/ProfileNav";
import Toast from "react-native-toast-message";
import { MenuProvider } from "react-native-popup-menu";
import Email from "./screens/authScreens/Email";
import Password from "./screens/authScreens/Password";
import MyImage from "./screens/authScreens/MyImage";
import SpottedNav from "./index/SpottedNav";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const checkUser = authStore.user;
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <MenuProvider>
          {checkUser ? (
            <TabBar />
          ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Set Up Account" component={AuthButtons} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen
                name="MainPageRegister"
                component={MainPageRegister}
              />
              <Stack.Screen name="Email" component={Email} />
              <Stack.Screen name="Password" component={Password} />
              <Stack.Screen name="MyImage" component={MyImage} />
              <Stack.Screen name="SpotDetails" component={SpotDetails} />
            </Stack.Navigator>
          )}
        </MenuProvider>
      </NavigationContainer>
      <Toast />
    </NativeBaseProvider>
  );
}

export default observer(App);

function TabBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
          marginBottom: 10,
          marginLeft: 5,
          marginRight: 5,
          borderTopWidth: 0,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={RootNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused, tintColor }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              size={40}
              color={color}
              style={{ position: "absolute", paddingTop: "13%" }}
            ></Ionicons>
          ),

          tabBarActiveTintColor: "#4831d4",
          tabBarInactiveTintColor: "#8D9C98",
        }}
      />
      <Tab.Screen
        name="MySpots"
        component={SpottedNav}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused, tintColor }) => (
            <Ionicons
              name={focused ? "location" : "location-outline"}
              size={40}
              color={color}
              style={{
                position: "absolute",
                paddingTop: "13%",
              }}
            />
          ),
          tabBarActiveTintColor: "#4831d4",
          tabBarInactiveTintColor: "#8D9C98",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNav}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused, tintColor }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={40}
              color={color}
              style={{ position: "absolute", paddingTop: "13%" }}
            />
          ),
          tabBarActiveTintColor: "#4831d4",
          tabBarInactiveTintColor: "#8D9C98",
        }}
      />
    </Tab.Navigator>
  );
}
