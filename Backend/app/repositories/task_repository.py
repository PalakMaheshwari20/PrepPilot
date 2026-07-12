from sqlalchemy.orm import Session

from app.models.task import Task


class TaskRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_topic(self, topic_id: int) -> list[Task]:
        return (
            self.db.query(Task)
            .filter(Task.topic_id == topic_id)
            .order_by(Task.order)
            .all()
        )

    def get_by_id(self, task_id: int) -> Task | None:
        return (
            self.db.query(Task)
            .filter(Task.id == task_id)
            .first()
        )