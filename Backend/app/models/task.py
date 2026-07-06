from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Enum
from app.models.enums import Difficulty, TaskStatus, TaskType
from app.db.base import Base
from app.models.mixins import TimestampMixin


class Task(Base, TimestampMixin):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)

    topic_id: Mapped[int] = mapped_column(
        ForeignKey("topics.id"),
        nullable=False,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        String(1000),
        nullable=True,
    )

    status: Mapped[TaskStatus] = mapped_column(
        Enum(TaskStatus),
        nullable=False,
        default=TaskStatus.PENDING,
        index=True,
    )

    estimated_minutes: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=30,
    )

    order: Mapped[int] = mapped_column(
        nullable=False,
        default=1,
    )

    topic = relationship(
        "Topic",
        back_populates="tasks",
    )

    resources = relationship(
        "Resource",
        back_populates="task",
        cascade="all, delete-orphan",
    )

    type: Mapped[TaskType] = mapped_column(
        Enum(TaskType),
        nullable=False,
        default=TaskType.THEORY,
    )

    difficulty: Mapped[Difficulty | None] = mapped_column(
        Enum(Difficulty),
        nullable=True,
    )