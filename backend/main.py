from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .api import bookings, students, tutors
from .database import database, models
from .schemas import schemas


@asynccontextmanager
async def lifespan(app: FastAPI):
    database.Base.metadata.create_all(bind=database.engine)
    yield


app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows POST, GET, PUT, DELETE, etc.
    allow_headers=["*"],
)

app.include_router(bookings.router, prefix="/bookings", tags=["bookings"])
app.include_router(students.router, prefix="/students", tags=["students"])
app.include_router(tutors.router, prefix="/tutors", tags=["tutors"])
