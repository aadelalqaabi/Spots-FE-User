import { observer } from "mobx-react";
import Carousel from "react-native-snap-carousel";
import {
  TextInput,
  SafeAreaView,
  StatusBar,
  LogBox,
  View,
  StyleSheet,
} from "react-native";
import spotStore from "../stores/spotStore";
import categoryStore from "../stores/categoryStore";
import Spot from "./spots/Spot";
import Category from "./categories/Category";
LogBox.ignoreAllLogs(true);

function Explore({ navigation }) {
  const spots = spotStore.getSpots();
  const categories = categoryStore.getCategories();
  function renderSpot({ item: spot }) {
    return (
      <Spot
        spot={spot}
        onPress={() => {
          navigation.navigate("SpotDetails", { id: spot._id });
        }}
      />
    );
  }
  function renderCategory({ item: category }) {
    return (
      <Category
        category={category}
        onPress={() => {
          spots.filter((spot) => spot.category === category);
        }}
      />
    );
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
          />
        </View>
        <View style={styles.containercat}>
          <Carousel
            style={styles.spotsList}
            contentContainerStyle={styles.spotsListContainer}
            data={categories}
            renderItem={renderCategory}
            sliderWidth={400}
            itemWidth={200}
            windowSize={1}
            layout={"default"}
            containerCustomStyle={{ alignSelf: "center" }}
            useScrollView={true}
          />
        </View>

        <Carousel
          style={styles.spotsList}
          contentContainerStyle={styles.spotsListContainer}
          data={spots}
          renderItem={renderSpot}
          windowSize={1}
          sliderWidth={450}
          itemWidth={400}
          layout={"stack"}
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
    backgroundColor: "#C9FB5F",
  },
});
