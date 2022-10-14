import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class RewardStore {
  constructor() {
    makeAutoObservable(this);
  }

  rewards = [];

  fetchRewards = async () => {
    try {
      const response = await instance.get("/reward");
      this.rewards = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  getRewardById = (rewardId) => {
    return this.rewards.find((reward) => reward._id === rewardId);
  };

  getRewardss = () => {
    return this.rewards;
  };

  userAdd = async (rewardId) => {
    try {
      const res = await instance.put(`/reward/user/${rewardId}`);
      this.rewards = this.rewards.map((reward) =>
        reward._id === rewardId ? res.data : reward
      );
    } catch (error) {
      console.log("reward error: ", error);
    }
  };
}

const rewardStore = new RewardStore();
rewardStore.fetchRewards();
export default rewardStore;
