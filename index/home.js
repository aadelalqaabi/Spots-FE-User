import { createStackNavigator } from "@react-navigation/stack";
import Explore from "../screens/Explore";
import { SpotDetails } from "../screens/spots/SpotDetails";

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
    </Navigator>
  );
};

export default RootNavigator;
