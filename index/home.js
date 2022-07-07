import { createStackNavigator } from "@react-navigation/stack";
import Explore from "../screens/Explore";
import { SpotDetails } from "../screens/spots/SpotDetails";
import OrganizerProfile from "../screens/OrganizerProfile";

const RootNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Explore" component={Explore} />
      <Screen name="SpotDetails" component={SpotDetails} />
      <Screen name="Organizer" component={OrganizerProfile}  options={{ headerShown: false }}/>
    </Navigator>
  );
};

export default RootNavigator;
