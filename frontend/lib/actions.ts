"use server";

import { BookingService } from "./api";
import { CreateBookingRequest, Booking } from "./types";

type CreateBookingResult =
  | { success: true; data: Booking }
  | { success: false; error: string };

export async function createBooking(
  data: CreateBookingRequest
): Promise<CreateBookingResult> {
  try {
    const newBooking = await BookingService.create(data);
    return { success: true, data: newBooking };
  } catch (err) {
    return { success: false, error: "Failed to create booking" };
  }
}
