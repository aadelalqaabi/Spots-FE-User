import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Trophies({ userSpots }) {
  const stars = userSpots.length;
  return (
    <View>
      {stars >= 5 && stars < 10 && (
        <View
          style={{
            position: "absolute",
            zIndex: 99,
            alignSelf: "center",
            bottom: 0,
            display: "flex",
            flexDirection: "row",
            marginBottom: -10,
          }}
        >
          <AntDesign name="star" size={25} color="#e52b51" />
        </View>
      )}
      {stars >= 10 && stars < 20 && (
        <View
          style={{
            position: "absolute",
            zIndex: 99,
            alignSelf: "center",
            bottom: 0,
            display: "flex",
            flexDirection: "row",
            marginBottom: -15,
          }}
        >
          <AntDesign
            name="star"
            size={25}
            color="#e52b51"
            style={{ marginTop: 5, padding: 10 }}
          />

          <AntDesign
            name="star"
            size={25}
            color="#e52b51"
            style={{ marginTop: 5, padding: 10 }}
          />
        </View>
      )}
      {stars >= 20 && stars < 50 && (
        <View
          style={{
            position: "absolute",
            zIndex: 99,
            alignSelf: "center",
            bottom: 0,
            display: "flex",
            flexDirection: "row",
            marginBottom: -15,
          }}
        >
          <AntDesign
            name="star"
            size={25}
            color="#e52b51"
            style={{ marginTop: 10 }}
          />
          <AntDesign
            name="star"
            size={25}
            color="#e52b51"
            style={{ marginTop: 20 }}
          />
          <AntDesign
            name="star"
            size={25}
            color="#e52b51"
            style={{ marginTop: 10 }}
          />
        </View>
      )}
      {stars >= 50 && stars < 100 && (
        <View
          style={{
            position: "absolute",
            zIndex: 99,
            alignSelf: "center",
            bottom: 0,
            display: "flex",
            flexDirection: "row",
            marginBottom: -10,
          }}
        >
          <AntDesign name="star" size={25} color="#e52b51" />
          <AntDesign
            name="star"
            size={25}
            color="#e52b51"
            style={{ marginTop: 15, padding: 0 }}
          />

          <AntDesign
            name="star"
            size={25}
            color="#e52b51"
            style={{ marginTop: 15, padding: 0 }}
          />
          <AntDesign name="star" size={25} color="#e52b51" />
        </View>
      )}
      {stars >= 100 && (
        <View
          style={{
            position: "absolute",
            zIndex: 99,
            alignSelf: "center",
            bottom: 0,
            display: "flex",
            flexDirection: "row",
            marginBottom: -15,
          }}
        >
          <AntDesign name="star" size={22} color="#e52b51" />
          <AntDesign
            name="star"
            size={22}
            color="#e52b51"
            style={{ marginTop: 20 }}
          />
          <AntDesign
            name="star"
            size={40}
            color="#e52b51"
            style={{ marginTop: 20 }}
          />
          <AntDesign
            name="star"
            size={22}
            color="#e52b51"
            style={{ marginTop: 20 }}
          />
          <AntDesign name="star" size={22} color="#e52b51" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
