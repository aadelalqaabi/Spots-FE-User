import { makeAutoObservable, runInAction } from "mobx";
import { instance } from "./instance";

class OrganizerStore {
  constructor() {
    makeAutoObservable(this);
  }

  organizers = [];

  fetchOrganizers = async () => {
    try {
      const response = await instance.get("/organizer");
      runInAction(() => {
        this.organizers = response.data;
      });
    } catch (error) {
      console.error(error);
    }
  };

  getOrganizerById = (organizerId) => {
    return this.organizers.find((organizer) => organizer._id === organizerId);
  };

  getOrganizers = () => {
    return this.organizers;
  };
}

const organizerStore = new OrganizerStore();
organizerStore.fetchOrganizers();
export default organizerStore;
