import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class PopularStore {
  constructor() {
    makeAutoObservable(this);
  }

  populars = [];

  fetchPopulars = async () => {
    try {
      const response = await instance.get("/popular");
      this.populars = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  updatePopular = async (updatedPopular, popularId) => {
    try {
      const res = await instance.put(
        `/popular/update/${popularId}`,
        updatedPopular
      );
      this.populars = this.populars.map((popular) =>
        popular._id === popularId ? res.data : popular
      );
    } catch (error) {
      console.error("popular", error);
    }
  };

  getPopularById = (popularId) => {
    return this.populars.find((popular) => popular._id === popularId);
  };

  getPopulars = () => {
    return this.populars;
  };
}

const popularStore = new PopularStore();
popularStore.fetchPopulars();
export default popularStore;
