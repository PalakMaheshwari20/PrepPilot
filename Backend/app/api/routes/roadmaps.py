from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.roadmap import RoadmapResponse
from app.schemas.roadmap_full import RoadmapFullResponse
from app.services.roadmap_service import RoadmapService

router = APIRouter(
    prefix="/roadmaps",
    tags=["Roadmaps"],
)


@router.get(
    "",
    response_model=list[RoadmapResponse],
)
def get_roadmaps(db: Session = Depends(get_db)):
    service = RoadmapService(db)
    return service.get_all_roadmaps()

@router.get(
    "/{roadmap_id}/full",
    response_model=RoadmapFullResponse,
)
def get_full_roadmap(
    roadmap_id: int,
    db: Session = Depends(get_db),
):
    service = RoadmapService(db)

    roadmap = service.get_full_roadmap(roadmap_id)

    if roadmap is None:
        raise HTTPException(
            status_code=404,
            detail="Roadmap not found",
        )

    return roadmap


@router.get(
    "/{roadmap_id}",
    response_model=RoadmapResponse,
)
def get_roadmap(
    roadmap_id: int,
    db: Session = Depends(get_db),
):
    service = RoadmapService(db)

    roadmap = service.get_roadmap(roadmap_id)

    if roadmap is None:
        raise HTTPException(
            status_code=404,
            detail="Roadmap not found",
        )

    return roadmap