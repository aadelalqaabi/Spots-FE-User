import { createStackNavigator } from "@react-navigation/stack";
import  SpotttedDetails  from "../screens/spots/SpotttedDetails";
import { Spotted } from "../screens/spots/Spotted";
import MySpots from "../screens/MySpots"

const SpottedNav = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        options={{ headerShown: false }}
        name="MySpots"
        component={MySpots}
      />

      <Screen name="SpotttedDetails" component={SpotttedDetails} /> 

    </Navigator>
  );
};

export default SpottedNav;
