import { makeAutoObservable } from "mobx";
import authStore from "./authStore";
import { instance } from "./instance";

class TicketStore {
  constructor() {
    makeAutoObservable(this);
  }

  tickets = [];

  createTicket = async (newTicket, spotId) => {
    try {
      const formData = new FormData();
      for (const key in newTicket) formData.append(key, newTicket[key]);
      const response = await instance.post(`/ticket/${spotId}`, formData);
      this.tickets.push(response.data.newTicket);
      authStore.setUser(response.data.token);
      console.log("response.data", response.data);
    } catch (error) {
      console.log("hello", error);
    }
  };

  fetchTickets = async () => {
    try {
      const response = await instance.get("/ticket");
      this.tickets = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  getTicketById = (ticketId) => {
    return this.tickets.find((ticket) => ticket._id === ticketId);
  };

  getTicket = () => {
    return this.tickets;
  };

  deleteTicket = async (ticketId) => {
    try {
      await instance.delete(`/ticket/delete/${ticketId}`);
      this.tickets = this.tickets.filter((ticket) => ticket._id !== ticketId);
    } catch (error) {
      console.log(error);
    }
  };
}

const ticketStore = new TicketStore();
ticketStore.fetchTickets();
export default ticketStore;
