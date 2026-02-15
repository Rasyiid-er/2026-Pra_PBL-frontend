export interface Room {
  id: number;
  name: string;
  location: string;
}

export interface Booking {
  id: number;
  borrowerName: string;
  startTime: string;
  endTime: string;
  roomId: number;
  status: string;
}

export interface PaginationResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface BookingStatusHistory {
  id: number;
  bookingId: number;
  status: string;
  changedAt: string;
}

export interface BookingLog {
  id: number;
  borrowerName: string;
  roomName: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  status: string;
}
