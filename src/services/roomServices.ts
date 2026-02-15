import { api } from "../api/axios";
import type { Room } from "../types/model";

export const roomServices = {
  getAll: () => api.get<Room[]>("/room"),

  create: (data: { name: string; location: string }) => api.post("/room", data),

  delete: (id: number) => api.delete(`/room/${id}`),
};
