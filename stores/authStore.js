import { makeAutoObservable, runInAction } from "mobx";
import { Alert } from "react-native";
import { instance } from "./instance";
import decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  REGISTER,
  LOGIN,
  UPDATE,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  ADD_DEST,
  REMOVE_DEST,
  REWARD,
  U_OTP,
  EMAILS,
  ADD_TOKEN,
  REMOVE_TOKEN,
  CHANGE_LOCAL,
  UN_REGISTER_USER,
  REGISTER_USER,
  DELETE_USER,
} from "../config/info";
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
  OTP = "178345hdjfjv84r8u9r0ri0rifnvbdvbej8339797530i5358fhdjvb";
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
      const response = await instance.post(REGISTER, formData);
      this.setUser(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  login = async (userData) => {
    userData.email = userData.email.toLowerCase();
    try {
      const response = await instance.post(LOGIN, userData);
      this.setUser(response.data.token);
      return "logged in";
    } catch (error) {
      console.error(error);
      return "not logged in";
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
      const res = await instance.put(UPDATE, formData);
      this.setUser(res.data.token);
      // console.log("res", res.data)
    } catch (error) {
      console.error("here", error);
    }
  };

  changeUser = async (userChange) => {
    let status = "";
    try {
      if (
        userChange.currentPassword !== "" &&
        userChange.newPassword === userChange.confirmedPassword
      ) {
        await instance.put(CHANGE_PASSWORD, userChange).then((response) => {
          if (response?.data?.isChanged === true) {
            Toast.show({
              type: "success",
              text1: "Password Changed 👍",
              text2: "try to sign back in 🤷‍♂️",
            });
          } else {
            status = "Passwords Don't Match";
          }
        });
      } else {
        status = "Passwords Don't Match";
      }
      return status;
    } catch (error) {
      console.error("change", error);
    }
  };

  forgotUser = async (userForgot) => {
    userForgot.email = userForgot.email.toLowerCase();
    console.log("userForgot", userForgot);
    console.log(
      "userForgot",
      userForgot.newPassword === userForgot.confirmedPassword
    );
    let status = "";
    try {
      if (
        userForgot.newPassword === userForgot.confirmPassword &&
        userForgot.email !== ""
      ) {
        await instance.put(FORGOT_PASSWORD, userForgot).then((response) => {
          if (response?.data?.isChanged === true) {
            Toast.show({
              type: "success",
              text1: "Password Changed 👍",
              text2: "try to sign back in 🤷‍♂️",
            });
          } else {
            status = "Passwords Don't Match";
          }
        });
      } else {
        status = "Passwords Don't Match";
      }
      return status;
    } catch (error) {
      console.error("forgot", error);
    }
  };

  spotAdd = async (spotId) => {
    try {
      const res = await instance.put(ADD_DEST + spotId);
      this.setUser(res.data.token);
    } catch (error) {
      console.error("here", error);
    }
  };

  rewardAdd = async (rewardId) => {
    //TODO TEST with ADEL add token to reward return from user.controllers rewardAdd function
    try {
      const res = await instance.put(REWARD + rewardId);
      for (const key in this.user) this.user[key] = res.data[key];
    } catch (error) {
      console.error("reward error: ", error);
    }
  };

  removeSpot = async (spotId) => {
    //TODO ADD return token
    try {
      const res = await instance.put(REMOVE_DEST + spotId);
      this.user.spots = res.data.spots.filter((spot) => spot._id !== spotId);
    } catch (error) {
      console.error("here", error);
    }
  };

  getOTP = async (email) => {
    let status = "";
    try {
      const res = await instance.post(U_OTP + "/" + email.toLowerCase());
      if (res.data?.message === "No User Found") {
        console.log("OTP", this.OTP);
        status = "No User Found";
      } else if (res.data.message === "User Found") {
        this.OTP = res.data.OTP;
        console.log("in", this.OTP);
        status = "User Found";
      }
      return status;
    } catch (error) {
      console.error("OTP", error);
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
      const res = await instance.get(EMAILS);
      this.userEmails = res.data;
    } catch (error) {
      console.error("emails error", error);
    }
  };

  addToken = async (newToken) => {
    const newUser = { ...this.user, notificationToken: newToken };
    try {
      const res = await instance.put(ADD_TOKEN, newUser);
      this.setUser(res.data.token);
    } catch (error) {
      console.error("add token", error);
    }
  };

  removeToken = async () => {
    const newUser = { ...this.user, notificationToken: "" };
    try {
      const res = await instance.put(REMOVE_TOKEN, newUser);
      this.setUser(res.data.token);
    } catch (error) {
      console.error("remove token", error);
    }
  };

  changeLocal = async (newLocale) => {
    const newUser = { ...this.user, locale: newLocale };
    try {
      const res = await instance.put(CHANGE_LOCAL, newUser);
      this.setUser(res.data.token);
    } catch (error) {
      console.error("change local", error);
    }
  };

  unRegisterUser = async (organizerId) => {
    try {
      const res = await instance.put(UN_REGISTER_USER + organizerId);
      this.setUser(res.data.token);
    } catch (error) {
      console.error("un reg", error);
    }
  };

  registerUser = async (organizerId) => {
    try {
      const res = await instance.put(REGISTER_USER + organizerId);
      this.setUser(res.data.token);
    } catch (error) {
      console.error("reg", error);
    }
  };
  deleteUser = async () => {
    try {
      const res = await instance.delete(DELETE_USER + this.user.id);
      if (res.data === "deleted") {
        this.logout();
      }
    } catch (error) {
      console.log("delete", error);
    }
  };
}

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
