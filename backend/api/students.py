from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.schemas import schemas
from backend.database import models, database

router = APIRouter()


@router.post("/", response_model=schemas.StudentResponse)
def create_student(
    student: schemas.StudentCreate, db: Session = Depends(database.get_db)
):
    db_student = models.StudentModel(**student.model_dump())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


@router.get("/{student_id}", response_model=schemas.StudentResponse)
def read_student(student_id: int, db: Session = Depends(database.get_db)):
    student = (
        db.query(models.StudentModel)
        .filter(models.StudentModel.id == student_id)
        .first()
    )
    if not student:
        raise HTTPException(
            status_code=404, detail=f"Student with id {student_id} not found"
        )
    return student
