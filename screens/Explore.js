import { observer } from "mobx-react";
import Carousel from "react-native-snap-carousel";
import {
  TextInput,
  SafeAreaView,
  StatusBar,
  LogBox,
  View,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import spotStore from "../stores/spotStore";
import categoryStore from "../stores/categoryStore";
import Spot from "./spots/Spot";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
LogBox.ignoreAllLogs(true);

function Explore() {
  const navigation = useNavigation();
  const [category, setCategory] = useState();
  const [query, setQuery] = useState("");
  const categories = categoryStore.getCategories();

  const spots = spotStore.spots
    .filter((spot) => (!category ? spot : spot.category?._id === category?._id))
    .filter((category) =>
      category?.name.toLowerCase().includes(query.toLowerCase())
    );

  function renderSpot({ item: spot }) {
    return <Spot spot={spot} navigation={navigation} />;
  }

  return (
    <View style={{ backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <TextInput
            placeholder="Search"
            style={styles.formField}
            placeholderTextColor={"grey"}
            onChangeText={(text) => setQuery(text)}
          />
        </View>

        <ScrollView horizontal={true} style={styles.categories}>
          <Button title="All" onPress={() => setCategory()} />
          {categories.map((category) => (
            <Button
              title={category?.name}
              onPress={() => setCategory(category)}
            />
          ))}
        </ScrollView>

        <Carousel
          style={styles.spotsList}
          contentContainerStyle={styles.spotsListContainer}
          data={spots}
          renderItem={renderSpot}
          windowSize={1}
          sliderWidth={450}
          itemWidth={350}
          layout={"default"}
          containerCustomStyle={{ alignSelf: "center" }}
          useScrollView={true}
        />
      </SafeAreaView>
    </View>
  );
}

export default observer(Explore);

const styles = StyleSheet.create({
  spotsList: {
    backgroundColor: "#ffffff",
  },
  spotsListContainer: {
    backgroundColor: "#ffffff",
  },
  container: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: 13,
    elevation: 3,
    margin: 20,
  },
  containercat: {
    backgroundColor: "white",
  },
  formField: {
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 13,
    fontSize: 18,
    backgroundColor: "white",
  },
  categories: {
    display: "flex",
    flexDirection: "row",
  },
});
