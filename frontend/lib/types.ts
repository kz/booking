export interface Booking {
  id: number;
  tutor_id: number;
  student_id: number;
  start_time: string; // ISO 8601 format
  end_time: string; // ISO 8601 format
}

export interface CreateBookingRequest {
  tutor_id: number;
  student_id: number;
  start_time: string; // ISO 8601 format
  end_time: string; // ISO 8601 format
}
