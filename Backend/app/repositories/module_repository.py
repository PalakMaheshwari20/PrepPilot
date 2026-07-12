from sqlalchemy.orm import Session

from app.models.module import Module


class ModuleRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_roadmap(self, roadmap_id: int) -> list[Module]:
        return (
            self.db.query(Module)
            .filter(Module.roadmap_id == roadmap_id)
            .order_by(Module.order)
            .all()
        )

    def get_by_id(self, module_id: int) -> Module | None:
        return (
            self.db.query(Module)
            .filter(Module.id == module_id)
            .first()
        )