import { createStackNavigator } from "@react-navigation/stack";
import EditScreen from "../screens/EditScreen";
import Profile from "../screens/Profile";
import { SpotDetails } from "../screens/spots/SpotDetails";

const ProfileNav = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator
      screenOptions={
        {
          // headerShown: false,
        }
      }
    >
      <Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile}
      />
      <Screen name="Edit" component={EditScreen} />
      <Screen name="SpotDetails" component={SpotDetails} />
    </Navigator>
  );
};

export default ProfileNav;
