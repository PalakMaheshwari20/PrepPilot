from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.study_session import StudySessionResponse
from app.services.study_session_service import StudySessionService

router = APIRouter(
    prefix="/study-session",
    tags=["Study Session"],
)


@router.get(
    "",
    response_model=StudySessionResponse,
)
def get_study_session(
    minutes: int = Query(
        default=60,
        ge=15,
        le=480,
        description="Requested study duration in minutes",
    ),
    db: Session = Depends(get_db),
):
    service = StudySessionService(db)
    return service.build_session(minutes)