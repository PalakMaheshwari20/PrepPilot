from sqlalchemy.orm import Session

from app.models.resource import Resource
from app.repositories.resource_repository import ResourceRepository


class ResourceService:
    def __init__(self, db: Session):
        self.repository = ResourceRepository(db)

    def get_resources(self, task_id: int) -> list[Resource]:
        return self.repository.get_by_task(task_id)

    def get_resource(self, resource_id: int) -> Resource | None:
        return self.repository.get_by_id(resource_id)