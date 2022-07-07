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
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import spotStore from "../stores/spotStore";
import categoryStore from "../stores/categoryStore";
import Spot from "./spots/Spot";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { baseURL } from "../stores/instance";
import { Ionicons } from "@expo/vector-icons";
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
          <Ionicons style={styles.icon} name="search-outline"></Ionicons>
          <TextInput
            placeholder="Search"
            style={styles.formField}
            placeholderTextColor={"grey"}
            onChangeText={(text) => setQuery(text)}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.categories}
          contentContainerStyle={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
        >
          <TouchableOpacity
            style={styles.overley}
            onPress={() => setCategory()}
          >
            <Text style={styles.catText}>All</Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <View style={styles.catButton}>
              <Image
                style={styles.thumb}
                source={{ uri: `${baseURL}${category.image}` }}
              ></Image>

              <TouchableOpacity
                style={styles.overley}
                onPress={() => setCategory(category)}
              >
                <Text style={styles.catText}>{category?.name}</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: "grey",
  },
  formField: {
    padding: 12,
    paddingLeft: 50,
    paddingRight: 20,
    borderRadius: 13,
    fontSize: 18,
    backgroundColor: "white",
  },
  categories: {
    display: "flex",
    flexDirection: "row",
    borderRadius: "10%",
    margin: 13,
    height: 40,
  },
  catButton: {
    color: "white",
    flexWrap: "wrap",
    width: 120,
    marginLeft: 7,
    borderRadius: "10%",
    fontWeight: "700",
    fontSize: "16",
    shadowColor: "white",
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 5.2,
    elevation: 2,
  },
  catText: {
    color: "white",
    flexWrap: "wrap",
    borderRadius: "10%",
    fontWeight: "700",
    fontSize: 17,
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 5.2,
    elevation: 2,
    alignSelf: "center",
    marginVertical: 10,
  },
  thumb: {
    position: "absolute",
    width: 120,
    height: 40,
    borderRadius: 10,
    zIndex: -1,
  },
  overley: {
    width: 120,
    height: 40,
    borderRadius: 10,
    zIndex: -1,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
  },
  icon: {
    position: "absolute",
    zIndex: 99,
    margin:15,
    height:400
  },
});
