import { makeAutoObservable, runInAction } from "mobx";
import { instance } from "./instance";
import decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import spotStore from "./spotStore";

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
      if (user.exp >= currentTime) {
        this.setUser(token);
      } else {
        this.logout();
      }
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
        this.user.image = res.data.image;
      });
    } catch (error) {
      console.log("here", error);
    }
  };

  spotAdd = async (spotId) => {
    try {
      const res = await instance.put(`/user/spots/${spotId}`);
      this.user.spots = res.data.spots;
    } catch (error) {
      console.log("here", error);
    }
  };

  removeSpot = async (spotId) => {
    try {
      const res = await instance.put(`/user/remove/${spotId}`);
      this.user.spots = res.data.spots.map((spot) => spot._id !== spotId);
    } catch (error) {
      console.log("here", error);
    }
  };
}

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
