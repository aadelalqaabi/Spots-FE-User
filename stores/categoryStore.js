import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class CategoryStore {
  constructor() {
    makeAutoObservable(this);
  }

  categories = [];

  fetchCategories = async () => {
    try {
      const response = await instance.get("/category");
      this.categories = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  getCategoriesById = (categoryId) => {
    return this.categories.find((category) => category._id === categoryId);
  };

  getCategories = () => {
    return this.categories;
  };
}

const categoryStore = new CategoryStore();
categoryStore.fetchCategories();
export default categoryStore;
