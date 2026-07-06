from sqlalchemy.orm import Session

from app.models.enums import Difficulty, TaskType
from app.models.task import Task
from app.models.topic import Topic


def seed_tasks(db: Session, topic: Topic, tasks_data: list[dict]) -> list[Task]:
    tasks = []

    for task_data in tasks_data:
        task = (
            db.query(Task)
            .filter_by(
                topic_id=topic.id,
                title=task_data["title"],
            )
            .first()
        )

        if not task:
            task = Task(
                topic_id=topic.id,
                title=task_data["title"],
                type=TaskType(task_data["type"]),
                difficulty=Difficulty(task_data["difficulty"])
                if task_data.get("difficulty")
                else None,
                estimated_minutes=task_data["estimated_minutes"],
                order=task_data["order"],
            )

            db.add(task)
            db.flush()

        tasks.append(task)

    return tasks