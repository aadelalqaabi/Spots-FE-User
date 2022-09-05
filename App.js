import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import { Ionicons } from "@expo/vector-icons";
import AuthButtons from "./screens/authScreens/AuthButtons";
import MainPageRegister from "./screens/authScreens/MainPageRegister";
import Login from "./screens/authScreens/Login";
import authStore from "./stores/authStore";
import ProfileNav from "./index/ProfileNav";
import Toast from "react-native-toast-message";
import { MenuProvider } from "react-native-popup-menu";
import Email from "./screens/authScreens/Email";
import Password from "./screens/authScreens/Password";
import PhoneNo from "./screens/authScreens/PhoneNo";
import MyImage from "./screens/authScreens/MyImage";
import * as Linking from "expo-linking";
import { Text } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Explore from "./screens/Explore";
import { SpotDetails } from "./screens/spots/SpotDetails";
import OrganizerProfile from "./screens/OrganizerProfile";
import BookingDetails from "./screens/booking/BookingDetails";
import Payment from "./screens/booking/Payment";
import Confirmation from "./screens/booking/Confirmation";
import SpotttedDetails from "./screens/spots/SpotttedDetails";
import MySpots from "./screens/MySpots";
import Scanner from "./screens/Scanner";
import SpottedScanner from "./screens/SpottedScanner";
import Search from "./screens/Search";
import Info from "./screens/spots/Info";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnBoarding from "./screens/authScreens/OnBoarding";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const prefix = Linking.createURL("/");

function App() {
  const checkUser = authStore.user;
  const config = {
    screens: {
      Profile: "Profile/:spotId",
    },
  };
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  React.useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
        return;
      } else {
        setIsFirstLaunch(false);
        return;
      }
    });
  }, []);
  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: "vetrical",
          }}
        >
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="Set Up Account" component={AuthButtons} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="PhoneNo" component={PhoneNo} />
          <Stack.Screen name="MainPageRegister" component={MainPageRegister} />
          <Stack.Screen name="Email" component={Email} />
          <Stack.Screen name="Password" component={Password} />
          <Stack.Screen name="MyImage" component={MyImage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NativeBaseProvider>
        <NavigationContainer
          linking={{ prefixes: [prefix], config }}
          fallback={<Text>Loading...</Text>}
        >
          <MenuProvider>
            {checkUser ? (
              <RootNavigator />
            ) : (
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  gestureEnabled: true,
                  gestureDirection: "horizontal",
                }}
              >
                <Stack.Screen
                  name="Set Up Account"
                  component={AuthButtons}
                  options={{
                    gestureEnabled: true,
                  }}
                />
                <Stack.Screen name="Login" component={Login} />

                <Stack.Screen
                  name="MainPageRegister"
                  component={MainPageRegister}
                  options={{
                    gestureEnabled: true,
                  }}
                />
                <Stack.Screen name="PhoneNo" component={PhoneNo} />

                <Stack.Screen name="Email" component={Email} />
                <Stack.Screen name="Password" component={Password} />
                <Stack.Screen name="MyImage" component={MyImage} />
              </Stack.Navigator>
            )}
          </MenuProvider>
        </NavigationContainer>
        <Toast />
      </NativeBaseProvider>
    );
  }
}

export default observer(App);

function RootNavigator() {
  const { Navigator, Screen, Group } = createStackNavigator();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Screen name="Explore" component={TabBar} />
      <Screen
        name="SpotDetails"
        component={SpotDetails}
        options={{
          gestureDirection: "horizontal",
          gestureEnabled: "true",
          presentation: "transparentModal",
        }}
      />
      <Screen
        options={{ headerShown: false }}
        name="MySpots"
        component={MySpots}
      />
      <Group
        screenOptions={{
          presentation: "modal",
          cardStyle: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          },
          gestureEnabled: "true",
          gestureDirection: "vertical",
          gestureResponseDistance: 10000,
        }}
      >
        <Screen name="SpotttedDetails" component={SpotttedDetails} />
      </Group>
      <Screen name="Scanner" component={Scanner} />
      <Screen name="SpottedScanner" component={SpottedScanner} />
      <Screen
        name="Search"
        options={{
          gestureDirection: "horizontal",
          gestureEnabled: "true",
          presentation: "transparentModal",
        }}
        component={Search}
      />
      <Screen
        name="Organizer"
        component={OrganizerProfile}
        options={{ headerShown: false }}
      />
      <Screen name="BookingDetails" component={BookingDetails} />
      <Screen name="Info" component={Info} />
      <Screen name="Payment" component={Payment} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}

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

          tabBarActiveTintColor: "#4831d4",
          tabBarInactiveTintColor: "#8D9C98",
        }}
      />
      <Tab.Screen
        name="MySpots"
        component={MySpots}
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
