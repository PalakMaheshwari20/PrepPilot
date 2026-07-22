from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.enums import TaskStatus
from app.models.task import Task


class DashboardRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_dashboard_stats(self):
        total_tasks = self.db.query(func.count(Task.id)).scalar() or 0

        completed_tasks = (
            self.db.query(func.count(Task.id))
            .filter(Task.status == TaskStatus.COMPLETED)
            .scalar()
            or 0
        )

        in_progress_tasks = (
            self.db.query(func.count(Task.id))
            .filter(Task.status == TaskStatus.IN_PROGRESS)
            .scalar()
            or 0
        )

        pending_tasks = (
            self.db.query(func.count(Task.id))
            .filter(Task.status == TaskStatus.PENDING)
            .scalar()
            or 0
        )

        remaining_minutes = (
            self.db.query(func.sum(Task.estimated_minutes))
            .filter(Task.status != TaskStatus.COMPLETED)
            .scalar()
            or 0
        )

        overall_progress = (
            round((completed_tasks / total_tasks) * 100, 1)
            if total_tasks
            else 0
        )

        return {
            "overall_progress": overall_progress,
            "completed_tasks": completed_tasks,
            "in_progress_tasks": in_progress_tasks,
            "pending_tasks": pending_tasks,
            "estimated_minutes_remaining": remaining_minutes,
        }