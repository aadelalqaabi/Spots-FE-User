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
      const response = await instance.post(`/ticket/${spotId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      this.tickets.push(response.data.newTicket);
      authStore.setUser(response.data.token)
    } catch (error) {
      console.error("create ticket", error);
    }
  };

  fetchTickets = async () => {
    try {
      const response = await instance.get("/ticket");
      this.tickets = response.data;
    } catch (error) {
      console.error("fetch tricket", error);
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
      console.error("delete ticket", error);
    }
  };
}

const ticketStore = new TicketStore();
ticketStore.fetchTickets();
export default ticketStore;
