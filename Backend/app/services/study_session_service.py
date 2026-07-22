from sqlalchemy.orm import Session

from app.repositories.study_session_repository import StudySessionRepository


class StudySessionService:
    def __init__(self, db: Session):
        self.repository = StudySessionRepository(db)

    def build_session(self, requested_minutes: int):
        return self.repository.build_session(requested_minutes)