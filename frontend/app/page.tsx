import { BookingService } from "@/lib/api";
import BookingsManager from "@/components/BookingsManager";
import { PageContainer } from "@/components/PageContainer";

export default async function BookingsPage() {
  const initialBookings = await BookingService.getAll();

  return (
    <PageContainer title="Bookings">
      <BookingsManager initialBookings={initialBookings} />
    </PageContainer>
  );
}
