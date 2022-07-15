import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import Explore from "./screens/Explore";
import MySpots from "./screens/MySpots";
import Profile from "./screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import AuthButtons from "./screens/authScreens/AuthButtons";
import Register from "./screens/authScreens/Register";
import Login from "./screens/authScreens/Login";
import authStore from "./stores/authStore";
import { SpotDetails } from "./screens/spots/SpotDetails";
import RootNavigator from "./index/home";
import ProfileNav from "./index/ProfileNav";
import Toast from "react-native-toast-message";
import { MenuProvider } from "react-native-popup-menu";

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
            <Stack.Navigator>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Set Up Account"
                component={AuthButtons}
              />
              {/* , headerTintColor: "#4831d4" */}
              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  headerBackTitle: "Back to Login",
                  headerTintColor: "#4831d4",
                  headerTitleStyle: { color: "black" },
                }}
              />
              <Stack.Screen name="SpotDetails" component={SpotDetails} />
              <Stack.Screen name="Login" component={Login} />
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
        name="Create A Trip"
        component={MySpots}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused, tintColor }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              size={38}
              color={color}
              style={{ position: "absolute", paddingTop: "13%" }}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
  },
});
