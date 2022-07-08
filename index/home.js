import { createStackNavigator } from "@react-navigation/stack";
import Explore from "../screens/Explore";
import { SpotDetails } from "../screens/spots/SpotDetails";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import { Animated } from "react-native";

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
      <Screen name="Explore" component={Explore} options={{}} />
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
    </Navigator>
  );
};

export default RootNavigator;
