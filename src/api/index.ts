import { Order, OrderDecision } from "@/types";
import axios from "axios";

const API_URL = "http://localhost:3001"; // JSON Server URL

export const api = {
  getOrders: async (
    page: number,
    perPage = 15
  ): Promise<{ orders: Order[]; totalPages: number; perPage: number }> => {
    const response = await axios.get(
      `${API_URL}/orders?_page=${page}&_per_page=${perPage}`
    );

    const totalCount = parseInt(response.data.items);
    const totalPages = Math.ceil(totalCount / perPage);

    return {
      orders: response.data.data,
      totalPages,
      perPage,
    };
  },
  updateOrderDecision: async (
    id: string,
    decision: OrderDecision
  ): Promise<Order> => {
    const response = await axios.patch(`${API_URL}/orders/${id}`, { decision });
    return response.data;
  },

  toggleOrderStatus: async (id: string, active: boolean): Promise<Order> => {
    const response = await axios.patch(`${API_URL}/orders/${id}`, { active });
    return response.data;
  },
};
