from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin


class Topic(Base, TimestampMixin):
    __tablename__ = "topics"

    id: Mapped[int] = mapped_column(primary_key=True)

    module_id: Mapped[int] = mapped_column(
        ForeignKey("modules.id"),
        nullable=False,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    order: Mapped[int] = mapped_column(
        nullable=False,
        default=1,
    )

    module = relationship(
        "Module",
        back_populates="topics",
    )

    tasks = relationship(
        "Task",
        back_populates="topic",
        cascade="all, delete-orphan",
    )