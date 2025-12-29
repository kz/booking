import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .base import override_get_db, test_db

from ..main import app
from ..database.database import Base, get_db
from ..database import models


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


def test_create_booking(test_db):
    # Create a test database session
    db = next(override_get_db())

    # Insert one tutor using ORM
    tutor = models.TutorModel(name="John Doe")
    db.add(tutor)
    db.commit()
    db.refresh(tutor)

    # Insert one student using ORM
    student = models.StudentModel(name="Jane Smith")
    db.add(student)
    db.commit()
    db.refresh(student)

    # Prepare booking data
    booking_data = {
        "tutor_id": tutor.id,
        "student_id": student.id,
        "start_time": "2025-12-30T10:00:00",
        "end_time": "2025-12-30T11:00:00",
    }

    response = client.post("/bookings/", json=booking_data)

    assert response.status_code == 200
    response_data = response.json()
    assert response_data["id"] is not None
    assert isinstance(response_data["id"], int)
    assert response_data["tutor_id"] == tutor.id
    assert response_data["student_id"] == student.id

    db.close()


def run_tests():
    import sys

    exit_code = pytest.main([__file__, "-v"])
    sys.exit(exit_code)


if __name__ == "__main__":
    run_tests()
