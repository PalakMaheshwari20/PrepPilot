from sqlalchemy.orm import Session

from app.models.roadmap import Roadmap


def seed_roadmap(db: Session, roadmap_data: dict) -> Roadmap:
    roadmap = db.query(Roadmap).filter_by(code=roadmap_data["code"]).first()

    if roadmap:
        return roadmap

    roadmap = Roadmap(
        code=roadmap_data["code"],
        name=roadmap_data["name"],
        description=roadmap_data["description"],
        icon=roadmap_data["icon"],
        color=roadmap_data["color"],
    )

    db.add(roadmap)
    db.flush()

    return roadmap