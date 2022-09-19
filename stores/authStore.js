import { makeAutoObservable, runInAction } from "mobx";
import { Alert } from "react-native";
import { instance } from "./instance";
import decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import spotStore from "./spotStore";
import moment from "moment";
import emailjs from "emailjs-com";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = null;

  setUser = async (token) => {
    await AsyncStorage.setItem("myToken", JSON.stringify(token));
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
  };

  checkForToken = async () => {
    let token = null;
    const jsonValue = await AsyncStorage.getItem("myToken");
    if (jsonValue !== null) token = JSON.parse(jsonValue);
    if (token) {
      const currentTime = Date.now();
      const user = decode(token);
      // if (user.exp >= currentTime) {
      this.setUser(token);
      // } else {
      //   this.logout();
      // }
    }
  };

  register = async (newUser) => {
    try {
      const formData = new FormData();
      for (const key in newUser) formData.append(key, newUser[key]);
      const response = await instance.post("/user/register", formData);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  login = async (userData) => {
    try {
      const response = await instance.post("/user/login", userData);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(error);
      Alert.alert("Wrong username or password", "", [{ text: "Try Again" }]);
    }
  };

  logout = () => {
    this.user = null;
    AsyncStorage.removeItem("myToken");
    delete instance.defaults.headers.common.Authorization;
  };

  updateUser = async (updatedUser) => {
    try {
      const formData = new FormData();
      for (const key in updatedUser) formData.append(key, updatedUser[key]);
      const res = await instance.put(`/user/update`, formData);
      runInAction(() => {
        for (const key in this.user) this.user[key] = res.data[key];
      });
    } catch (error) {
      console.log("here", error);
    }
  };

  spotAdd = async (spotId) => {
    try {
      const formData = new FormData();
      for (const key in updatedUser) formData.append(key, updatedUser[key]);
      const res = await instance.put(`/user/spots/${spotId}`);
      runInAction(() => {
        for (const key in this.user) this.user[key] = res.data[key];
      });
    } catch (error) {
      console.log("here", error);
    }
  };
  rewardAdd = async (rewardId) => {
    try {
      const res = await instance.put(`/user/rewards/${rewardId}`);
      for (const key in this.user) this.user[key] = res.data[key];
    } catch (error) {
      console.log("reward error: ", error);
    }
  };

  removeSpot = async (spotId) => {
    try {
      const res = await instance.put(`/user/remove/${spotId}`);
      this.user.spots = res.data.spots.filter((spot) => spot._id !== spotId);
    } catch (error) {
      console.log("here", error);
    }
  };

  sendBookingEmail = (tickets, spot) => {
    let date = moment(spot.startDate).format("LL");
    const emailContent = {
      to_name: this.user.username,
      message: `Thank You For Your purchase of ${tickets} tickets for ${spot.name} Spot.
      The Spot begins at ${spot.startTime} on ${date}`,
      to_email: this.user.email,
    };
    emailjs.init("0CGPMjHzm16JAhRPl");
    // emailjs.accessToken("nHQDJbHUos1qKT50oPIoG")

    emailjs.send("AB-Serv-12", "template_uma67do", emailContent);
  };
}

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
