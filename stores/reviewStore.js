import { makeAutoObservable } from "mobx";
import authStore from "./authStore";
import { instance } from "./instance";

class ReviewStore {
  constructor() {
    makeAutoObservable(this);
  }

  reviews = [];

  createReview = async (spotId) => {
    try {
      const response = await instance.post(`/review/${spotId}`);
      this.reviews.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchReviews = async () => {
    try {
        const response = await instance.get("/review");
        this.reviews = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  getReviewById = (reviewId) => {
    return this.reviews.find((review) => review._id === reviewId);
  };

  getReview = () => {
    return this.reviews;
  };
}

const reviewStore = new ReviewStore();
reviewStore.fetchReviews();
export default reviewStore;
