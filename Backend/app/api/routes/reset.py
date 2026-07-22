from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.repositories.reset_repository import ResetRepository
from app.services.reset_service import ResetService

router = APIRouter(prefix="/reset", tags=["Reset"])


@router.post("")
def reset_progress(db: Session = Depends(get_db)):
    repo = ResetRepository(db)
    service = ResetService(repo)
    return service.reset_progress()