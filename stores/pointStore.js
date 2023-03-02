import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class PointStore {
  constructor() {
    makeAutoObservable(this);
  }

  points = [];

  createPoint = async (spotId) => {
    const newPoint = { amount: 0 };
    try {
      const response = await instance.post(`/point/${spotId}`, newPoint);
      this.points.push(response.data);
    } catch (error) {
      console.error("hello", error);
    }
  };

  updatePoint = async (points, pointId) => {
    const updatedPoint = { amount: points };
    try {
      const res = await instance.put(`point/update/${pointId}`, updatedPoint);
      this.points = this.points.map((point) =>
        point._id === pointId ? res.data : point
      );
    } catch (error) {
      console.error("hi", error);
    }
  };

  fetchPoints = async () => {
    try {
      const response = await instance.get("/point");
      this.points = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  getPointById = (pointId) => {
    return this.points.find((point) => point._id === pointId);
  };

  getPoints = () => {
    return this.points;
  };
}

const pointStore = new PointStore();
pointStore.fetchPoints();
export default pointStore;
