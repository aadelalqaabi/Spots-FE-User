import { makeAutoObservable, runInAction } from "mobx";
import { instance } from "./instance";

class SpotStore {
  constructor() {
    makeAutoObservable(this);
  }

  spots = [];

  fetchSpots = async () => {
    try {
      const response = await instance.get("/spot");
      runInAction(() => {
        this.spots = response.data;
      });
    } catch (error) {
      console.error(error);
    }
  };

  updateSpot = async (updatedSpot, spotId) => {
    try {
      const res = await instance.put(
        `spot/update/${spotId}/cat/${updatedSpot.category}`,
        updatedSpot
      );
      runInAction(() => {
        this.spots = this.spots.map((spot) =>
          spot._id === spotId ? res.data : spot
        );
      });
    } catch (error) {
      console.error("hi", error);
    }
  };

  getSpotsById = (spotId) => {
    return this.spots.find((spot) => spot._id === spotId);
  };

  getSpots = () => {
    return this.spots;
  };
}

const spotStore = new SpotStore();
spotStore.fetchSpots();
export default spotStore;
