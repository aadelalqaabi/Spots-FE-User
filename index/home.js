import { createStackNavigator } from "@react-navigation/stack";


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
      <Screen
        options={{ headerShown: false }}
        name="TripList"
        component={TripList}
      />
      <Screen name="Owner" component={OwnerScreen} />
      <Screen name="EditTrip" component={EditTrip} />
      <Screen
        name="TripDetails"
        component={TripDetails}
        options={({ route }) => {
          const { id } = route.params;
          return {
            title: tripStore.getTripById(id).title,
            headerBackTitleVisible: false,
          };
        }}
      />
    </Navigator>
  );
};

export default RootNavigator;
