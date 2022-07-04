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
import { observer } from "mobx-react";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  const checkUser = authStore.user;
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {checkUser ? (
          <TabBar />
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Set Up Account"
              component={AuthButtons}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
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
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Explore}
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

          tabBarActiveTintColor: "#111827",
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
              name={focused ? "location" : "location-outline"}
              size={40}
              color={color}
              style={{ position: "absolute", paddingTop: "13%" }}
            />
          ),
          tabBarActiveTintColor: "#111827",
          tabBarInactiveTintColor: "#8D9C98",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
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
          tabBarActiveTintColor: "#111827",
          tabBarInactiveTintColor: "#8D9C98",
        }}
      />
    </Tab.Navigator>
  );
}
export default observer(App);


const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
  },
});
