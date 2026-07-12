from sqlalchemy.orm import Session

from app.models.module import Module
from app.repositories.module_repository import ModuleRepository


class ModuleService:
    def __init__(self, db: Session):
        self.repository = ModuleRepository(db)

    def get_modules(self, roadmap_id: int) -> list[Module]:
        return self.repository.get_by_roadmap(roadmap_id)

    def get_module(self, module_id: int) -> Module | None:
        return self.repository.get_by_id(module_id)