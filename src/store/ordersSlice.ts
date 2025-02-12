import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Order, OrderDecision } from "../types";
import { api } from "@/api";

interface OrdersState {
  orders: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
  perPage: number;
}

const initialState: OrdersState = {
  orders: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
  perPage: 15,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (page: number) => {
    const response = await api.getOrders(page);
    return {
      orders: response.orders,
      totalPages: response.totalPages,
      currentPage: page, // Include currentPage in the payload
    };
  }
);

export const updateOrderDecision = createAsyncThunk(
  "orders/updateOrderDecision",
  async ({ id, decision }: { id: string; decision: OrderDecision }) => {
    const response = await api.updateOrderDecision(id, decision);
    return response;
  }
);

export const toggleOrderStatus = createAsyncThunk(
  "orders/toggleOrderStatus",
  async ({ id, active }: { id: string; active: boolean }) => {
    const response = await api.toggleOrderStatus(id, active);
    return response;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchOrders.fulfilled,
        (
          state,
          action: PayloadAction<{
            orders: Order[];
            totalPages: number;
            currentPage: number;
          }>
        ) => {
          state.status = "succeeded";
          state.orders = action.payload.orders;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage; // Update currentPage
          state.error = null;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch orders";
      })
      .addCase(
        updateOrderDecision.fulfilled,
        (state, action: PayloadAction<Order>) => {
          const index = state.orders.findIndex(
            (order) => order.id === action.payload.id
          );
          if (index !== -1) {
            state.orders[index] = action.payload;
          }
        }
      )
      .addCase(
        toggleOrderStatus.fulfilled,
        (state, action: PayloadAction<Order>) => {
          const index = state.orders.findIndex(
            (order) => order.id === action.payload.id
          );
          if (index !== -1) {
            state.orders[index] = action.payload;
          }
        }
      );
  },
});

export default ordersSlice.reducer;
