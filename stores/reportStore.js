import { makeAutoObservable, toJS } from "mobx";
import { instance } from "./instance";

class ReportStore {
  constructor() {
    makeAutoObservable(this);
  }

  createReports = async (newReport) => {
    try {
        await instance.post(`/report/create`, newReport);
    } catch (error) {
      console.log(error);
    }
  };
}

const reportStore = new ReportStore();
export default reportStore;
