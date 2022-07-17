import { createStackNavigator } from "@react-navigation/stack";
import EditScreen from "../screens/EditScreen";
import Profile from "../screens/Profile";
import { SpotDetails } from "../screens/spots/SpotDetails";
import OrganizerProfile from "../screens/OrganizerProfile";

const ProfileNav = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile}
      />
      <Screen name="SpotDetails" component={SpotDetails} />

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
    </Navigator>
  );
};

export default ProfileNav;
