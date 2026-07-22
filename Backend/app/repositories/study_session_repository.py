from sqlalchemy.orm import Session

from app.models.module import Module
from app.models.task import Task
from app.models.topic import Topic
from app.models.enums import TaskStatus


class StudySessionRepository:
    def __init__(self, db: Session):
        self.db = db

    def build_session(self, requested_minutes: int):
        rows = (
            self.db.query(Task, Topic, Module)
            .join(Topic, Task.topic_id == Topic.id)
            .join(Module, Topic.module_id == Module.id)
            .filter(Task.status == TaskStatus.PENDING)
            .order_by(
                Module.order,
                Topic.order,
                Task.order,
            )
            .all()
        )

        total_minutes = 0
        tasks = []

        for task, topic, module in rows:
            minutes = task.estimated_minutes or 0

            # Always include the first task
            if not tasks:
                tasks.append(
                    {
                        "task_id": task.id,
                        "roadmap_id": module.roadmap_id,
                        "module_id": module.id,
                        "topic_id": topic.id,
                        "title": task.title,
                        "topic": topic.title,
                        "module": module.title,
                        "estimated_minutes": minutes,
                        "status": task.status.value,
                    }
                )
                total_minutes += minutes
                continue

            # Skip tasks that don't fit instead of ending the session
            if total_minutes + minutes > requested_minutes:
                continue

            tasks.append(
                {
                    "task_id": task.id,
                    "roadmap_id": module.roadmap_id,
                    "module_id": module.id,
                    "topic_id": topic.id,
                    "title": task.title,
                    "topic": topic.title,
                    "module": module.title,
                    "estimated_minutes": minutes,
                    "status": task.status.value,
                }
            )

            total_minutes += minutes

        return {
            "requested_minutes": requested_minutes,
            "total_minutes": total_minutes,
            "task_count": len(tasks),
            "tasks": tasks,
        }