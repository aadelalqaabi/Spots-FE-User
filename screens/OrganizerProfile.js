import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import organizerStore from '../stores/organizerStore';
import spotStore from '../stores/spotStore';
import ProfileSpot from '../screens/spots/ProfileSpot'
import OrganizerSpot from '../screens/spots/OrganizerSpot'
import { observer } from "mobx-react";
import { baseURL } from "../stores/instance";
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Fontisto } from '@expo/vector-icons';
import { useState } from "react";

function OrganizerProfile({route}) {
    const [notification, setNotification] = useState();
    const organizer = organizerStore.getOrganizerById(route.params.organizer);

    // const organizerSpots = organizer.spots.map(spotId => spotStore.spots.find(spot => spot._id === spotId));
    function renderSpot({ item: spot }) {
        return <OrganizerSpot spot={spot} />;
    }

    const handleNotification = () => {
        if(notification === false){
            console.log("organizer: "+organizer.username)
            setNotification(true);
            Toast.show({
                type: "success",
                text1: `You Will Be Notified The Next Time ${organizer.username} uploads a New Spot`,
            }); 
        } else{
            setNotification(false)
        }

    } 

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.profile}>{organizer.username}</Text>
      <TouchableOpacity onPress={handleNotification}>
          {(notification === false) ?
            <Fontisto style={{alignSelf: "flex-end", marginRight: 20, marginTop: 34}} name="bell-alt" size={24} color="grey" />
            :
            <Fontisto style={{alignSelf: "flex-end", marginRight: 20, marginTop: 34}} name="bell-alt" size={24} color="#4831d4" />
          }
      </TouchableOpacity>
        <View style={styles.imageUserNameEdit}>
          <View style={styles.imageUserName}>
           {organizer.image ?
           <Image
              style={styles.profileImage}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPWpbYe9c5YS6KNOXFWiawk-ox545j3ya978qwGXmcladr3eLFh6IabWhNFVtFRI0YNjI&usqp=CAU",
              }}
            /> : <Image
            style={styles.profileImage}
            source={{
              uri: baseURL + organizer.image,
            // uri: "https://yt3.ggpht.com/7-qLGZftqc4sDt0lfK3Hf5d3meDKr8d0CEouodYTZ1_Zost1xrmkZxgwhoHJeIjkbrvaodvsxw=s900-c-k-c0x00ffffff-no-rj",
            }}
          />
            }
          </View>
        </View>
        {/* <Text style={styles.bio}>{organizer.bio}</Text> */}
        <View>
            <Text style={styles.bio}>
                    🥇 1st Coding Academy in the Middle East
                    💻 Learn To Code Websites, Apps, & MORE
                    👩🏻‍🎓 Intensive Courses & Bootcamps
                    🚀 400+ Graduates Since 2015
            </Text>
        </View>
        <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >
        <FlatList
            style={styles.spotsList}
            contentContainerStyle={styles.spotsListContainer}
            data={organizer.spots}
            renderItem={renderSpot}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        />
        <Text style={{margin:10, color: "white"}}>HELP</Text>
       </ScrollView>
    </SafeAreaView>
  );
}
export default observer(OrganizerProfile);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  imageUserNameEdit: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  imageUserName: {
    justifyContent: "flex-Start",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    marginLeft: 2,
  },
  profile: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 75,
    marginLeft: 28,
    fontSize: 30,
    alignSelf: "flex-start",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 150,
    marginRight: 105,
    marginLeft: 112,
    marginTop: 80,
    borderWidth: 2,
  },
  bio: {
    fontSize: 90,
    marginTop: 30,
    fontWeight: "900",
  },
  spotsTitle: {
    fontSize: 30,
    marginTop: -10,
    // fontWeight: "bold",
  },
  edit: {
    borderRadius: 10,
    position: "absolute",
    marginTop: 360,
    marginLeft: "16%",
    backgroundColor: "#e7e7e7",
    borderRadius: "50%",
    justifyContent: "center",
    paddingLeft: 80,
    paddingRight: 80,
  },
  bio: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "justify",
    margin: 12,
    padding: 10,

    paddingTop: 2,
    paddingBottom: 15,
    fontSize: 9,
  },
  bioText: {
    fontSize: 17,
    paddingBottom: 20,
  },
  tripList: {
    grid: 2,
    gridtemplate: "c1 c2",
  },
  imageCard: {
    // alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
    zIndex: -1,
    opacity: 0.8,
  },
  spotsList: {
    backgroundColor: "#fffffc",
    height: "100%",
    width: "100%",
  },
  spotsListContainer: {
    backgroundColor: "#fffffc",
  },
});