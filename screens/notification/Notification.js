// import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { View, Button, Platform } from "react-native";
import authStore from "../../stores/authStore";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
//!!!!! expo install expo-notifications
export default function Notification({ spot }) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {/* <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View> */}
      <View
        style={{
          borderColor: "#e52b51",
          borderWidth: 0.5,
          width: 150,
          alignSelf: "center",
          borderRadius: "50%",
          backgroundColor: "white",
        }}
      >
        <Button
          title="Schedule a Notification"
          color={"#e52b51"}
          onPress={async () => {
            await schedulePushNotification(spot);
          }}
        />
      </View>
    </View>
  );
}

async function schedulePushNotification(spot) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Can't Wait to see you ${authStore.user.name} !!!`,
      body: `Don't Forget ${spot.name} starts in 2 hours`,
      //   data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  //   if (Device.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
