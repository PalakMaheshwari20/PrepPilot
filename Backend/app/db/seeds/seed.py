from app.db.session import SessionLocal
from app.db.seeds.module_seed import seed_modules
from app.db.seeds.roadmap_seed import seed_roadmap
from app.db.seeds.task_seed import seed_tasks
from app.db.seeds.topic_seed import seed_topics
from app.db.seeds.resource_seed import seed_resources
from app.db.seeds.utils import load_json


def seed_dsa():
    db = SessionLocal()

    try:
        roadmap_data = load_json()
        roadmap = seed_roadmap(db, roadmap_data)

        modules = seed_modules(
            db,
            roadmap,
            roadmap_data["modules"],
        )

        for module, module_data in zip(modules, roadmap_data["modules"]):

            topics = seed_topics(
                db,
                module,
                module_data["topics"],
            )

            for topic, topic_data in zip(topics, module_data["topics"]):
                tasks = seed_tasks(
                    db,
                    topic,
                    topic_data["tasks"],
                )

                for task, task_data in zip(tasks, topic_data["tasks"]):
                    seed_resources(
                        db,
                        task,
                        task_data.get("resources", []),
                    )
        db.commit()
        print("✅ DSA roadmap seeded successfully!")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_dsa()