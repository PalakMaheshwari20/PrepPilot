from sqlalchemy.orm import Session

from app.models.task import Task
from app.models.enums import TaskStatus


class ResetRepository:
    def __init__(self, db: Session):
        self.db = db

    def reset_progress(self):
        self.db.query(Task).update(
            {Task.status: TaskStatus.PENDING},
            synchronize_session=False,
        )
        self.db.commit()