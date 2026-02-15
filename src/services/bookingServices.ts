import { api } from "../api/axios";
import type {
  Booking,
  BookingLog,
  BookingStatusHistory,
  PaginationResponse,
} from "../types/model";

export const bookingServices = {
  getAll: () => api.get<PaginationResponse<Booking>>("/booking"),

  getById: (id: number) => api.get<Booking>(`/booking/${id}`),

  create: (data: any) => api.post("/booking", data),

  updateStatus: (id: number, status: string) =>
    api.put(`/booking/${id}/status`, { status }),

  getHistory: (id: number) =>
    api.get<BookingStatusHistory[]>(`/booking/${id}/history`),

  getAllHistory: () => api.get<BookingStatusHistory[]>("/booking/history"),

  getLog: () => api.get<BookingLog[]>("/booking/log"),
};
