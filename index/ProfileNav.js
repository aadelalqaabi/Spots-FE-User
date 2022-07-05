import { createStackNavigator } from "@react-navigation/stack";
import EditScreen from "../screens/EditScreen";
import Profile from "../screens/Profile";

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

export default ProfileNav;
