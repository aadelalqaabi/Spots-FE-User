import { makeAutoObservable } from "mobx";
import authStore from "./authStore";
import { instance } from "./instance";
import spotStore from "./spotStore";

class ReviewStore {
  constructor() {
    makeAutoObservable(this);
  }

  reviews = [];

  createReview = async (review, numOfSrtars, spotId) => {
    review.stars = numOfSrtars;
    try {
      const response = await instance.post(`/review/${spotId}`, review);
      this.reviews.push(response.data);
      const addReview = spotStore.getSpotsById(spotId);
      addReview.reviews.push(response.data);

      // spotStore.spots = spotStore.spots.map((spot) =>
      // spot._id === spotId ? spot.reviews.push(response.data) : spot
      // );
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
