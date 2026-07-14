from sqlalchemy.orm import Session

from app.models.task import Task
from app.models.enums import TaskStatus
from app.repositories.task_repository import TaskRepository


class TaskService:
    def __init__(self, db: Session):
        self.repository = TaskRepository(db)

    def get_tasks(self, topic_id: int) -> list[Task]:
        return self.repository.get_by_topic(topic_id)

    def get_task(self, task_id: int) -> Task | None:
        return self.repository.get_by_id(task_id)
    
    def update_status(
        self,
        task_id: int,
        status: TaskStatus,
    ) -> Task | None:

        task = self.repository.get_by_id(task_id)

        if task is None:
            return None

        task.status = status

        return self.repository.update_status(task)