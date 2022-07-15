import { createStackNavigator } from "@react-navigation/stack";
import Explore from "../screens/Explore";
import { SpotDetails } from "../screens/spots/SpotDetails";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import OrganizerProfile from "../screens/OrganizerProfile";


const RootNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  const config = {
    animation: "spring",
    config: {
      stiffness: 2000,
      damping: 500,
      mass: 2,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Explore" component={Explore} />
      <Screen
        name="SpotDetails"
        component={SpotDetails}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
          ...TransitionPresets.ScaleFromCenterAndroid,

          transitionSpec: {
            open: config,
            close: config,
          },
          presentation: "transparentModal",
        }}
      />
            <Screen name="Organizer" component={OrganizerProfile}  options={{ headerShown: false }}/>

    </Navigator>
  );
};

export default RootNavigator;
