from sqlalchemy.orm import Session

from app.models.roadmap import Roadmap
from app.repositories.roadmap_repository import RoadmapRepository


class RoadmapService:
    def __init__(self, db: Session):
        self.repository = RoadmapRepository(db)

    def get_all_roadmaps(self) -> list[Roadmap]:
        return self.repository.get_all()

    def get_roadmap(self, roadmap_id: int) -> Roadmap | None:
        return self.repository.get_by_id(roadmap_id)
    
    def get_full_roadmap(self, roadmap_id: int) -> Roadmap | None:
        return self.repository.get_full_by_id(roadmap_id)