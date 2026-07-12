from sqlalchemy.orm import Session, joinedload

from app.models.topic import Topic
from app.models.task import Task


class TopicRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_module(self, module_id: int) -> list[Topic]:
        return (
            self.db.query(Topic)
            .filter(Topic.module_id == module_id)
            .order_by(Topic.order)
            .all()
        )

    def get_by_id(self, topic_id: int) -> Topic | None:
        return (
            self.db.query(Topic)
            .filter(Topic.id == topic_id)
            .first()
        )
    
    def get_full_by_id(self, topic_id: int) -> Topic | None:
        return (
            self.db.query(Topic)
            .options(
                joinedload(Topic.tasks).joinedload(Task.resources)
            )
            .filter(Topic.id == topic_id)
            .first()
        )