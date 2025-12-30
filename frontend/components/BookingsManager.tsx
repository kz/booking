"use client";

import { useState } from "react";
import { Booking } from "@/lib/types";
import { createBooking } from "@/lib/actions";

interface Props {
  initialBookings: Booking[];
}

export default function BookingsManager({ initialBookings }: Props) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError("");

    const startTime = formData.get("start_time") as string;
    const endTime = formData.get("end_time") as string;
    const startDateTime = new Date(startTime).toISOString();
    const endDateTime = new Date(endTime).toISOString();

    const requestData = {
      tutor_id: parseInt(formData.get("tutor_id") as string),
      student_id: parseInt(formData.get("student_id") as string),
      start_time: startDateTime,
      end_time: endDateTime,
    };

    const result = await createBooking(requestData);
    if (result.success) {
      setBookings((prev) => [...prev, result.data]);
    } else {
      setError(result.error);
    }

    setIsSubmitting(false);
  }

  return (
    <div>
      <div className="bg-gray-50 p-6 rounded mb-8">
        <h2 className="text-xl font-bold mb-4">Add Booking</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form action={handleSubmit} className="flex gap-4">
          <input
            name="tutor_id"
            type="number"
            placeholder="Tutor ID"
            className="border p-2 rounded"
            required
          />
          <input
            name="student_id"
            type="number"
            placeholder="Student ID"
            className="border p-2 rounded"
            required
          />
          <input
            name="start_time"
            type="datetime-local"
            className="border p-2 rounded"
            required
          />
          <input
            name="end_time"
            type="datetime-local"
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Add"}
          </button>
        </form>
      </div>

      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li
            key={booking.id}
            className="p-4 border rounded shadow-sm flex justify-between"
          >
            <span className="text-gray-700">Booking ID: {booking.id}</span>
            <span className="font-semibold">
              Tutor {booking.tutor_id} - Student {booking.student_id}
            </span>
            <span className="text-gray-500">
              {new Date(booking.start_time).toLocaleString()} -{" "}
              {new Date(booking.end_time).toLocaleTimeString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
