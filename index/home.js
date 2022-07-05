import { createStackNavigator } from "@react-navigation/stack";
import EditScreen from "../screens/EditScreen";
import Profile from "../screens/Profile";


const RootNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator
      screenOptions={
        {
          // headerShown: false,
        }
      }
    >
      {/* <Screen
        options={{ headerShown: false }}
        name="TripList"
        component={TripList}
      />
      <Screen name="Owner" component={OwnerScreen} /> */}
      {/* <Screen name="Edit" component={EditScreen} /> */}
      {/* <Screen name="Profile" component={Profile} /> */}
      {/* <Screen
        name="TripDetails"
        component={TripDetails}
        options={({ route }) => {
          const { id } = route.params;
          return {
            title: tripStore.getTripById(id).title,
            headerBackTitleVisible: false,
          };
        }}
      /> */}
    </Navigator>
  );
};

export default RootNavigator;
