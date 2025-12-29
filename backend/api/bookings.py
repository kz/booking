from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..schemas import schemas
from ..database import models, database

router = APIRouter()


@router.post("/", response_model=schemas.BookingResponse)
def create_booking(
    booking: schemas.BookingCreate, db: Session = Depends(database.get_db)
):
    db_booking = models.BookingModel(**booking.model_dump())

    tutor = (
        db.query(models.TutorModel)
        .filter(models.TutorModel.id == booking.tutor_id)
        .first()
    )
    student = (
        db.query(models.StudentModel)
        .filter(models.StudentModel.id == booking.student_id)
        .first()
    )
    if not tutor:
        raise HTTPException(
            status_code=422, detail=f"Tutor with id {booking.tutor_id} not found"
        )
    if not student:
        raise HTTPException(
            status_code=422, detail=f"Student with id {booking.student_id} not found"
        )

    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking


@router.get("/", response_model=list[schemas.BookingResponse])
def read_bookings(
    skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)
):
    bookings = db.query(models.BookingModel).offset(skip).limit(limit).all()
    return bookings
