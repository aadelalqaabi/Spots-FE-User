import { makeAutoObservable, runInAction } from "mobx";
import { instance } from "./instance";

class OfferStore {
  constructor() {
    makeAutoObservable(this);
  }

  offers = [];

  fetchOffers = async () => {
    try {
      const response = await instance.get("/offer");
      runInAction(() => {
        this.offers = response.data;
      });
    } catch (error) {
      console.error(error);
    }
  };

  getOfferById = (offerId) => {
    return this.offers.find((offer) => offer._id === offerId);
  };

  getOffers = () => {
    return this.offers;
  };
}

const offerStore = new OfferStore();
offerStore.fetchOffers();
export default offerStore;
