from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..schemas import schemas
from ..database import models, database

router = APIRouter()


@router.post("/", response_model=schemas.TutorResponse)
def create_tutor(
    tutor: schemas.TutorCreate, db: Session = Depends(database.get_db)
):
    db_tutor = models.TutorModel(**tutor.model_dump())
    db.add(db_tutor)
    db.commit()
    db.refresh(db_tutor)
    return db_tutor


@router.get("/{tutor_id}", response_model=schemas.TutorResponse)
def read_tutor(tutor_id: int, db: Session = Depends(database.get_db)):
    tutor = db.query(models.TutorModel).filter(models.TutorModel.id == tutor_id).first()
    if not tutor:
        raise HTTPException(status_code=404, detail=f"Tutor with id {tutor_id} not found")
    return tutor
