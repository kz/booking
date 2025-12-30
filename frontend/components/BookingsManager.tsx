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
      <form
        action={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8"
      >
        <h2 className="text-xl font-bold mb-4">Add Booking</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="flex flex-col gap-4">
          {/* Tutor ID Input Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tutor ID
            </label>
            <input
              name="tutor_id"
              type="number"
              placeholder="Enter tutor ID"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Student ID Input Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student ID
            </label>
            <input
              name="student_id"
              type="number"
              placeholder="Enter student ID"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Start Time Input Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              name="start_time"
              type="datetime-local"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* End Time Input Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              name="end_time"
              type="datetime-local"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Submit Button - full width for better mobile/desktop experience */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex justify-between"
          >
            <div>
              <h3 className="font-semibold text-gray-800">
                Tutor {booking.tutor_id} - Student {booking.student_id}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(booking.start_time).toLocaleString()} -{" "}
                {new Date(booking.end_time).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
