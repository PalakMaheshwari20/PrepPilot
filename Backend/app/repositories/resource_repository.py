from sqlalchemy.orm import Session

from app.models.resource import Resource


class ResourceRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_task(self, task_id: int) -> list[Resource]:
        return (
            self.db.query(Resource)
            .filter(Resource.task_id == task_id)
            .order_by(Resource.order)
            .all()
        )

    def get_by_id(self, resource_id: int) -> Resource | None:
        return (
            self.db.query(Resource)
            .filter(Resource.id == resource_id)
            .first()
        )