from sqlalchemy.orm import Session

from app.models.enums import ResourceProvider, ResourceType
from app.models.resource import Resource
from app.models.task import Task


def seed_resources(db: Session, task: Task, resources_data: list[dict]) -> None:
    for resource_data in resources_data:
        resource = (
            db.query(Resource)
            .filter_by(
                task_id=task.id,
                title=resource_data["title"],
            )
            .first()
        )

        if resource:
            continue

        resource = Resource(
            task_id=task.id,
            title=resource_data["title"],
            type=ResourceType(resource_data["type"]),
            provider=ResourceProvider(resource_data["provider"]),
            url=resource_data["url"],
            order=resource_data.get("order", 1),
        )

        db.add(resource)

    db.flush()