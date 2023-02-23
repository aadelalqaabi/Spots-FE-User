import { makeAutoObservable, runInAction } from "mobx";
import { Alert } from "react-native";
import { instance } from "./instance";
import decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { I18n } from "i18n-js";
import Toast from "react-native-toast-message";
import * as Localization from "expo-localization";

const translations = {
  en: {
    name: "Enter Your Name",
    description:
      "Choose a name for your account\n (Must be at least 2 characters)",
    next: "Next",
  },
  ar: {
    name: "ادخل اسمك",
    description: "اختر اسم ليظهر في حسابك \n(يجب ان يكون حرفين على الاقل)",
    next: "التالي",
  },
};
const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;
class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  user = null;
  OTP = 1;
  userEmails = null;
  isChanged = "";

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
      this.setUser(token);
    }
  };

  register = async (newUser) => {
    newUser.email = newUser.email.toLowerCase();
    const formData = new FormData();
    try {
      for (const key in newUser) formData.append(key, newUser[key]);
      const response = await instance.post("/user/register", formData);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  login = async (userData) => {
    // userData.email = userData.email.toLowerCase();
    try {
      const response = await instance.post("/user/login", userData);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(error);
      i18n.locale === "en-US" || i18n.locale === "en"
        ? Alert.alert("Wrong email or password", "", [{ text: "Try Again" }])
        : Alert.alert("بريد الكتروني او كلمه سر خاطئه", "", [
            { text: "حاول مرة اخرى" },
          ]);
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
      this.setUser(res.data.token);
      // console.log("res", res.data)
    } catch (error) {
      console.log("here", error);
    }
  };

  changeUser = async (userChange) => {
    try {
      await instance.put(`/user/change`, userChange).then((response) => {
        if (response?.data?.isChanged === true) {
          Toast.show({
            type: "success",
            text1: "Password Changed 👍",
            text2: "try to sign back in 🤷‍♂️",
          });
          // this.logout()
        } else {
          i18n.locale === "en-US" || i18n.locale === "en"
            ? Alert.alert("Passwords Don't Match", "", [{ text: "Try Again" }])
            : Alert.alert("كلمات السر غير متطابقة", "", [
                { text: "حاول مرة اخرى" },
              ]);
        }
      });
    } catch (error) {
      console.log("change", error);
    }
  };

  forgotUser = async (userForgot) => {
    //userForgot.username = userForgot.username.toLowerCase();
    try {
      console.log("userForgot", userForgot);
      await instance.put(`/user/forgot`, userForgot);
    } catch (error) {
      console.log("forgot", error);
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

  getOTP = async () => {
    try {
      const res = await instance.post(`/user/OTP`);
      this.OTP = res.data;
    } catch (error) {
      console.log("OTP", error);
    }
  };

  //getUsernames = async () => {
  // try {
  //   const res = await instance.get(`/user/usernames`);
  //   this.useUsernames = res.data;
  // } catch (error) {
  //   console.log("usernames: ", error);
  //  }
  // };

  getEmails = async () => {
    try {
      const res = await instance.get(`/user/emails`);
      this.userEmails = res.data;
    } catch (error) {
      console.log("emails error", error);
    }
  };

  addToken = async (newToken) => {
    const newUser = {...this.user, notificationToken: newToken}
    try {
      const res = await instance.put(`/user/notification/add`, newUser);
      this.setUser(res.data.token);
    } catch (error) {
      console.log("add token", error);
    }
  };

  removeToken = async () => {
    const newUser = {...this.user, notificationToken: ""}
    try {
      const res = await instance.put(`/user/notification/remove`, newUser);
      this.setUser(res.data.token);
    } catch (error) {
      console.log("remove token", error);
    }
  };

  changeLocal = async (newLocale) => {
    const newUser = {...this.user, locale: newLocale}
    try {
      const res = await instance.put(`/user/local/change`, newUser);
      this.setUser(res.data.token);
    } catch (error) {
      console.log("change local", error);
    }
  };

  unRegisterUser = async (organizerId) => {
    try {
      console.log('Un Registerd')
      const res = await instance.put(`/user/un-register/${organizerId}`);
      this.setUser(res.data.token);
    } catch (error) {
      console.log("un reg", error);
    }
  };

  registerUser = async (organizerId) => {
    try {
      console.log('Registered')
      const res = await instance.put(`/user/register/${organizerId}`);
      this.setUser(res.data.token);
    } catch (error) {
      console.log("reg", error);
    }
  };
}

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
