from sqlalchemy.orm import Session

from app.models.module import Module
from app.models.topic import Topic


def seed_topics(db: Session, module: Module, topics_data: list[dict]) -> list[Topic]:
    topics = []

    for topic_data in topics_data:
        topic = (
            db.query(Topic)
            .filter_by(
                module_id=module.id,
                title=topic_data["title"],
            )
            .first()
        )

        if not topic:
            topic = Topic(
                module_id=module.id,
                title=topic_data["title"],
                description=topic_data.get("description"),
                order=topic_data["order"],
            )

            db.add(topic)
            db.flush()

        topics.append(topic)

    return topics