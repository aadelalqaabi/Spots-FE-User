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
import Toast from "react-native-toast-message";
import { MenuProvider } from "react-native-popup-menu";
import Email from "./screens/authScreens/Email";
import Password from "./screens/authScreens/Password";
import PhoneNo from "./screens/authScreens/PhoneNo";
import MyImage from "./screens/authScreens/MyImage";
import * as Linking from "expo-linking";
import { Text, useColorScheme } from "react-native";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
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
import Settings from "./screens/Settings";
import EditScreen from "./screens/EditScreen";
import ProfileSpotDetails from "./screens/spots/ProfileSpotDetails";
import Profile from "./screens/Profile";
import ForgotPassword from "./screens/changePass/ForgotPassword";
import UsernameCheck from "./screens/changePass/UsernameCheck";
import CheckOTP from "./screens/changePass/CheckOTP";
import ChangePassword from "./screens/changePass/ChangePassword";
import EndedSpot from "./screens/spots/EndedSpot";
import Advertisments from "./Advertisments";
import GoogleUsername from "./screens/authScreens/GoogleUsername";
import GoogleImage from "./screens/authScreens/GoogleImage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const prefix = Linking.createURL("/");

function App() {
  const checkUser = authStore.user;
  const config = {
    screens: {
      SpotDetails: "SpotDetails/:id",
    },
  };
  const linking = {
    prefixes: [prefix],
    config,
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
          <Stack.Screen name="SetUpAccount" component={AuthButtons} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="GoogleUsername" component={GoogleUsername} />
          <Stack.Screen name="PhoneNo" component={PhoneNo} />
          <Stack.Screen name="MainPageRegister" component={MainPageRegister} />
          <Stack.Screen name="Email" component={Email} />
          <Stack.Screen name="Password" component={Password} />
          <Stack.Screen name="MyImage" component={MyImage} />
          <Stack.Screen name="GoogleImage" component={GoogleImage} />
          <Stack.Screen name="UsernameCheck" component={UsernameCheck} />
          <Stack.Screen name="CheckOTP" component={CheckOTP} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NativeBaseProvider>
        <NavigationContainer
          linking={linking}
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
                  name="SetUpAccount"
                  component={AuthButtons}
                  options={{
                    gestureEnabled: true,
                  }}
                />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="GoogleImage" component={GoogleImage} />
                <Stack.Screen
                  name="GoogleUsername"
                  component={GoogleUsername}
                />
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
                <Stack.Screen name="UsernameCheck" component={UsernameCheck} />
                <Stack.Screen name="CheckOTP" component={CheckOTP} />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
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
  const colorScheme = useColorScheme();
  const translations = {
    en: {
      explore: "Explore",
    },
    ar: {
      explore: "اكتشف",
    },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  return i18n.locale === "en-US" || i18n.locale === "en" ? (
    <>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
          },
        }}
      >
        <Screen
          name="Advertisments"
          component={Advertisments}
          options={{
            presentation: "modal",
            gestureEnabled: true,
            gestureResponseDistance: 135,
          }}
        />

        <Screen
          name="Explore"
          component={TabBar}
          options={{ gestureEnabled: false }}
        />
        <Screen
          name="SpotDetails"
          component={SpotDetails}
          options={{
            gestureDirection: "horizontal",
            gestureEnabled: "true",
            presentation: "transparentModal",
          }}
        />
        <Group
          screenOptions={{
            presentation: "modal",
            cardStyle: {
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            },
            detachPreviousScreen: false,
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

        <Screen name="BookingDetails" component={BookingDetails} />
        <Screen name="Info" component={Info} />
        <Screen name="Payment" component={Payment} />
        <Screen name="Confirmation" component={Confirmation} />

        <Screen name="ProfileSpotDetails" component={ProfileSpotDetails} />
        <Group
          screenOptions={{
            presentation: "modal",

            cardStyle: {
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            },
            detachPreviousScreen: false,
            gestureResponseDistance: 10000,
          }}
        >
          <Screen name="Settings" component={Settings} />
        </Group>
        <Screen
          name="Edit"
          component={EditScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name="Organizer"
          component={OrganizerProfile}
          options={{ headerShown: false }}
        />
        <Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Screen
          name="EndedSpot"
          component={EndedSpot}
          options={{ headerShown: false }}
        />
      </Navigator>
    </>
  ) : (
    <>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colorScheme === "dark" ? "#1b1b1b" : "#f1f1f1",
          },
        }}
      >
        <Screen
          name="Advertisments"
          component={Advertisments}
          options={{ gestureEnabled: true, gestureResponseDistance: 135 }}
        />
        <Screen
          name="Explore"
          component={TabBar}
          options={{ gestureEnabled: false }}
        />
        <Screen
          name="SpotDetails"
          component={SpotDetails}
          options={{
            gestureEnabled: "true",
            presentation: "transparentModal",
            headerShown: false,
            gestureDirection: "horizontal-inverted",
          }}
        />
        <Group
          screenOptions={{
            presentation: "modal",
            cardStyle: {
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            },
            detachPreviousScreen: false,
            gestureResponseDistance: 10000,
          }}
        >
          <Screen name="SpotttedDetails" component={SpotttedDetails} />
        </Group>
        <Screen
          name="Scanner"
          component={Scanner}
          options={{
            gestureDirection: "horizontal-inverted",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Screen
          name="SpottedScanner"
          component={SpottedScanner}
          options={{
            gestureDirection: "horizontal-inverted",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Screen
          name="Search"
          options={{
            gestureDirection: "horizontal-inverted",
            gestureEnabled: "true",
            presentation: "transparentModal",
          }}
          component={Search}
        />
        <Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            gestureDirection: "horizontal-inverted",
            gestureEnabled: "true",
            presentation: "transparentModal",
          }}
        />
        <Screen
          name="BookingDetails"
          component={BookingDetails}
          options={{
            gestureDirection: "horizontal-inverted",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Screen
          name="Info"
          component={Info}
          options={{
            gestureDirection: "horizontal-inverted",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Screen
          name="EndedSpot"
          component={EndedSpot}
          options={{
            gestureDirection: "horizontal-inverted",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Screen
          name="Payment"
          component={Payment}
          options={{
            gestureDirection: "horizontal-inverted",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Screen
          name="Confirmation"
          component={Confirmation}
          options={{
            gestureDirection: "horizontal-inverted",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        <Screen
          name="ProfileSpotDetails"
          component={ProfileSpotDetails}
          options={{
            gestureDirection: "horizontal-inverted",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Group
          screenOptions={{
            presentation: "modal",
            cardStyle: {
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            },
            detachPreviousScreen: false,
            gestureResponseDistance: 10000,
          }}
        >
          <Screen name="Settings" component={Settings} />
        </Group>
        <Screen
          name="Edit"
          component={EditScreen}
          options={{
            headerShown: false,
            gestureDirection: "horizontal-inverted",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Screen
          name="Organizer"
          component={OrganizerProfile}
          options={{
            headerShown: false,
            gestureDirection: "horizontal-inverted",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Navigator>
    </>
  );
}

function TabBar() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
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

          tabBarActiveTintColor: "#e52b51",
          tabBarInactiveTintColor:
            colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
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
          tabBarActiveTintColor: "#e52b51",
          tabBarInactiveTintColor:
            colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
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
          tabBarActiveTintColor: "#e52b51",
          tabBarInactiveTintColor:
            colorScheme === "light" ? "#1b1b1b" : "#f1f1f1",
        }}
      />
    </Tab.Navigator>
  );
}
