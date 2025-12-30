import { Booking, CreateBookingRequest } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const BookingService = {
  getAll: async (): Promise<Booking[]> => {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }
    return res.json();
  },

  create: async (data: CreateBookingRequest): Promise<Booking> => {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create booking");
    }
    return res.json();
  },
};
