import { BookingService } from "@/lib/api";
import BookingsManager from "@/components/BookingsManager";

export default async function BookingsPage() {
  const initialBookings = await BookingService.getAll();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>

      <BookingsManager initialBookings={initialBookings} />
    </div>
  );
}
