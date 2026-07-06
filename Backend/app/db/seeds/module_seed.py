from sqlalchemy.orm import Session

from app.models.module import Module
from app.models.roadmap import Roadmap


def seed_modules(db: Session, roadmap: Roadmap, modules_data: list[dict]) -> list[Module]:
    modules = []

    for module_data in modules_data:
        module = (
            db.query(Module)
            .filter_by(
                roadmap_id=roadmap.id,
                title=module_data["title"],
            )
            .first()
        )

        if not module:
            module = Module(
                roadmap_id=roadmap.id,
                title=module_data["title"],
                description=module_data.get("description"),
                order=module_data["order"],
            )

            db.add(module)
            db.flush()

        modules.append(module)

    return modules