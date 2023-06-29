import {
  NavigationContainer,
  useNavigation,
  useScrollToTop,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import { Ionicons } from "@expo/vector-icons";
import AuthButtons from "./screens/authScreens/AuthButtons";
import MainPageRegister from "./screens/authScreens/MainPageRegister";
import Login from "./screens/authScreens/Login";
import authStore from "./stores/authStore";
import Toast from "react-native-toast-message";
import Email from "./screens/authScreens/Email";
import Password from "./screens/authScreens/Password";
import PhoneNo from "./screens/authScreens/PhoneNo";
import MyImage from "./screens/authScreens/MyImage";
import * as Linking from "expo-linking";
import { Platform, useColorScheme } from "react-native";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import * as Notifications from "expo-notifications";
import {
  createStackNavigator,
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
import AppleUsername from "./screens/authScreens/AppleUsername";
import AppleImage from "./screens/authScreens/AppleImage";
import ReviewsPage from "./screens/reviews/ReviewsPage";
import { useEffect, useRef, useState } from "react";
import SpottedInfo from "./screens/spots/SpottedInfo";
import RegisteredNotifications from "./screens/notification/RegisteredNotifications";
import ContactUs from "./screens/ContactUs";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import OffersTerms from "./screens/offers/OffersTerms";
import RewardsTerms from "./screens/rewards/RewardsTerms";
import Report from "./screens/Report";
import ProfileSwitcher from "./screens/ProfileSwitcher";
import MySpotsSwitcher from "./screens/MySpotsSwitcher";
import Popular from "./screens/Popular/Popular";
import Bookmarked from "./screens/Popular/Bookmarked";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
let id = null;

function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  setTimeout(async function () {
    await SplashScreen.hideAsync();
  }, 2000);
  useEffect(() => {
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

  const checkUser = authStore.user;

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <NavigationContainer>
        {authStore.user != null || authStore.guest === true ? (
          <RootNavigator />
        ) : (
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
            <Stack.Screen name="AppleUsername" component={AppleUsername} />
            <Stack.Screen name="PhoneNo" component={PhoneNo} />
            <Stack.Screen
              name="MainPageRegister"
              component={MainPageRegister}
            />
            <Stack.Screen name="Email" component={Email} />
            <Stack.Screen name="Password" component={Password} />
            <Stack.Screen name="MyImage" component={MyImage} />
            <Stack.Screen name="AppleImage" component={AppleImage} />
            <Stack.Screen name="UsernameCheck" component={UsernameCheck} />
            <Stack.Screen name="CheckOTP" component={CheckOTP} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Explore" component={TabBar} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        {authStore.user != null || authStore.guest === true ? (
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
            <Stack.Screen name="AppleImage" component={AppleImage} />
            <Stack.Screen name="AppleUsername" component={AppleUsername} />
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
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Explore" component={TabBar} />
          </Stack.Navigator>
        )}
        <Toast />
      </NavigationContainer>
    );
  }
}

export default observer(App);

function RootNavigator() {
  const { Navigator, Screen } = createStackNavigator();
  const colorScheme = useColorScheme();

  const translations = {
    en: {
      explore: "Explore",
    },
    ar: {
      explore: "اكتشف",
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

  const navigation = useNavigation();
  Notifications.addNotificationResponseReceivedListener((response) => {
    let notificationLink = response.notification.request.content.data.link;
    if (notificationLink) {
      const regex = /SpotDetails\/(.+)/;
      let match = notificationLink.match(regex);
      if (match && match[1]) {
        id = match[1];
        navigation.navigate("SpotDetails", { id: id });
      }
    }
  });
  let url = Linking.useURL();

  if (url) {
    const regex = /SpotDetails\/(.+)/;
    let match = url.match(regex);
    if (match && match[1]) {
      id = match[1];
      navigation.navigate("SpotDetails", { id: id });
    }
  }
  return i18n.language.split("-")[0] === "en" ? (
    <Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        presentation: "card",
        cardStyle: {
          backgroundColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
        },
      }}
    >
      <Screen name="Explore" component={TabBar} />
      {/* <Screen name="Advertisments" component={Advertisments} /> */}
      <Screen
        name="SpotDetails"
        component={SpotDetails}
        initialParams={{ id }}
      />
      <Screen name="SpotttedDetails" component={SpotttedDetails} />
      <Screen name="SpottedInfo" component={SpottedInfo} />
      <Screen name="ReviewsPage" component={ReviewsPage} />
      <Screen name="Scanner" component={Scanner} />
      <Screen name="SpottedScanner" component={SpottedScanner} />
      <Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Screen name="Report" component={Report} />
      <Screen
        name="Search"
        options={{
          gestureDirection: "horizontal",
          gestureEnabled: true,
          presentation: "transparentModal",
        }}
        component={Search}
      />

      <Screen name="BookingDetails" component={BookingDetails} />
      <Screen name="Info" component={Info} />
      <Screen name="Payment" component={Payment} />
      <Screen name="Confirmation" component={Confirmation} />

      <Screen name="ProfileSpotDetails" component={ProfileSpotDetails} />
      <Screen name="RewardsTerms" component={RewardsTerms} />
      <Screen name="OffersTerms" component={OffersTerms} />

      <Screen name="Settings" component={Settings} />
      <Screen name="ContactUs" component={ContactUs} />
      <Screen name="Bookmarked" component={Bookmarked} />
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
        name="RegisteredOrganizers"
        component={RegisteredNotifications}
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
      <Screen name="Login" component={Login} />
      <Screen name="AppleImage" component={AppleImage} />
      <Screen name="AppleUsername" component={AppleUsername} />
      <Screen
        name="MainPageRegister"
        component={MainPageRegister}
        options={{
          gestureEnabled: true,
        }}
      />
      <Screen name="PhoneNo" component={PhoneNo} />
      <Screen name="Email" component={Email} />
      <Screen name="Password" component={Password} />
      <Screen name="MyImage" component={MyImage} />
      <Screen name="UsernameCheck" component={UsernameCheck} />
      <Screen name="CheckOTP" component={CheckOTP} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
    </Navigator>
  ) : (
    <Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
        },
      }}
    >
      <Screen
        name="Explore"
        component={TabBar}
        options={{ gestureEnabled: false }}
      />
      {/* <Screen
        name="Advertisments"
        component={Advertisments}
        options={{ gestureEnabled: true, gestureResponseDistance: 135 }}
      /> */}
      <Screen
        name="ReviewsPage"
        component={ReviewsPage}
        options={{ gestureEnabled: true, gestureResponseDistance: 135 }}
      />
      <Screen
        name="SpotDetails"
        component={SpotDetails}
        options={{
          headerShown: false,
          gestureDirection: "horizontal-inverted",
        }}
        initialParams={{ id }}
      />
      <Screen
        name="Bookmarked"
        component={Bookmarked}
        options={{
          headerShown: false,
          gestureDirection: "horizontal-inverted",
        }}
      />
      <Screen
        name="SpottedInfo"
        component={SpottedInfo}
        options={{
          headerShown: false,
          gestureDirection: "horizontal-inverted",
        }}
      />

      <Screen
        options={{
          gestureDirection: "horizontal-inverted",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="SpotttedDetails"
        component={SpotttedDetails}
      />

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
        name="ContactUs"
        options={{
          gestureDirection: "horizontal-inverted",
          gestureEnabled: "true",
          presentation: "transparentModal",
        }}
        component={ContactUs}
      />

      <Screen
        name="RegisteredOrganizers"
        component={RegisteredNotifications}
        options={{
          gestureDirection: "horizontal-inverted",
          gestureEnabled: "true",
          presentation: "transparentModal",
        }}
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

      <Screen
        name="Settings"
        component={Settings}
        options={{
          gestureDirection: "horizontal-inverted",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

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
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: false,
          gestureDirection: "horizontal-inverted",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Screen
        name="Report"
        component={PrivacyPolicy}
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
      <Screen
        options={{
          gestureDirection: "horizontal-inverted",
          gestureEnabled: "true",
          presentation: "transparentModal",
        }}
        name="Login"
        component={Login}
      />
      <Screen
        options={{
          gestureDirection: "horizontal-inverted",
          gestureEnabled: "true",
          presentation: "transparentModal",
        }}
        name="AppleImage"
        component={AppleImage}
      />
      <Screen
        options={{
          gestureDirection: "horizontal-inverted",
          gestureEnabled: "true",
          presentation: "transparentModal",
        }}
        name="AppleUsername"
        component={AppleUsername}
      />
      <Screen
        name="MainPageRegister"
        component={MainPageRegister}
        options={{
          gestureEnabled: true,
        }}
      />
      <Screen
        options={{
          gestureDirection: "horizontal-inverted",
          gestureEnabled: "true",
          presentation: "transparentModal",
        }}
        name="PhoneNo"
        component={PhoneNo}
      />
      <Screen
        options={{
          gestureDirection: "horizontal-inverted",
          gestureEnabled: "true",
          presentation: "transparentModal",
        }}
        name="Email"
        component={Email}
      />
      <Screen
        options={{
          gestureDirection: "horizontal-inverted",
          gestureEnabled: "true",
          presentation: "transparentModal",
        }}
        name="Password"
        component={Password}
      />
      <Screen
        options={{
          gestureDirection: "horizontal-inverted",
          gestureEnabled: "true",
          presentation: "transparentModal",
        }}
        name="MyImage"
        component={MyImage}
      />
      <Screen
        options={{
          gestureDirection: "horizontal-inverted",
          gestureEnabled: "true",
          presentation: "transparentModal",
        }}
        name="UsernameCheck"
        component={UsernameCheck}
      />
      <Screen
        options={{
          gestureDirection: "horizontal-inverted",
          gestureEnabled: "true",
          presentation: "transparentModal",
        }}
        name="CheckOTP"
        component={CheckOTP}
      />
      <Screen
        options={{
          gestureDirection: "horizontal-inverted",
          gestureEnabled: "true",
          presentation: "transparentModal",
        }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
    </Navigator>
  );
}

function TabBar() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="Popular"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
          borderTopWidth: 0,
          paddingBottom: "7%",
          marginTop: "1%",
          shadowColor: colorScheme === "dark" ? "#000000" : "#f1f1f1",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Popular"
        component={Popular}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused, tintColor }) => (
            <Ionicons
              name={focused ? "flame" : "flame-outline"}
              size={35}
              color={color}
              style={{
                position: "absolute",
              }}
            />
          ),
          tabBarActiveTintColor: "#e52b51",
          tabBarInactiveTintColor:
            colorScheme === "light" ? "#000000" : "#f1f1f1",
        }}
      />
      <Tab.Screen
        name="Home"
        component={Explore}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused, tintColor }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              size={35}
              color={color}
              style={{
                position: "absolute",
              }}
            ></Ionicons>
          ),
          tabBarActiveTintColor: "#e52b51",
          tabBarInactiveTintColor:
            colorScheme === "light" ? "#000000" : "#f1f1f1",
        }}
      />
      <Tab.Screen
        name="MySpots"
        component={MySpotsSwitcher}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused, tintColor }) => (
            <Ionicons
              name={focused ? "location" : "location-outline"}
              size={35}
              color={color}
              style={{
                position: "absolute",
              }}
            />
          ),

          tabBarActiveTintColor: "#e52b51",
          tabBarInactiveTintColor:
            colorScheme === "light" ? "#000000" : "#f1f1f1",
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileSwitcher}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused, tintColor }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={35}
              color={color}
              style={{
                position: "absolute",
              }}
            />
          ),
          tabBarActiveTintColor: "#e52b51",
          tabBarInactiveTintColor:
            colorScheme === "light" ? "#000000" : "#f1f1f1",
        }}
      />
    </Tab.Navigator>
  );
}
