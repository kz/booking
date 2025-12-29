from datetime import datetime

from pydantic import BaseModel


class TutorBase(BaseModel):
    name: str


class TutorCreate(TutorBase):
    pass


class Tutor(TutorBase):
    id: int
    model_config = {"from_attributes": True}


class TutorResponse(Tutor):
    pass


class StudentBase(BaseModel):
    name: str


class StudentCreate(StudentBase):
    pass


class Student(StudentBase):
    id: int
    model_config = {"from_attributes": True}


class StudentResponse(Student):
    pass


class BookingBase(BaseModel):
    tutor_id: int
    student_id: int
    start_time: datetime
    end_time: datetime


class BookingCreate(BookingBase):
    pass


class Booking(BookingBase):
    id: int
    model_config = {"from_attributes": True}


class BookingResponse(Booking):
    pass
