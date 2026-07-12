from sqlalchemy.orm import Session

from app.models.roadmap import Roadmap
from app.models.module import Module
from sqlalchemy.orm import Session, joinedload


class RoadmapRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[Roadmap]:
        return (
            self.db.query(Roadmap)
            .filter(Roadmap.is_active.is_(True))
            .all()
        )

    def get_by_id(self, roadmap_id: int) -> Roadmap | None:
        return (
            self.db.query(Roadmap)
            .filter(
                Roadmap.id == roadmap_id,
                Roadmap.is_active.is_(True),
            )
            .first()
        )
    
    def get_full_by_id(self, roadmap_id: int) -> Roadmap | None:
        return (
            self.db.query(Roadmap)
            .options(
            joinedload(Roadmap.modules).joinedload(Module.topics)            )
            .filter(
                Roadmap.id == roadmap_id,
                Roadmap.is_active.is_(True),
            )
            .first()
        )