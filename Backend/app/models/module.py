from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.mixins import TimestampMixin


class Module(Base, TimestampMixin):
    __tablename__ = "modules"

    id: Mapped[int] = mapped_column(primary_key=True)

    roadmap_id: Mapped[int] = mapped_column(
        ForeignKey("roadmaps.id"),
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

    roadmap = relationship(
        "Roadmap",
        back_populates="modules",
    )

    topics = relationship(
        "Topic",
        back_populates="module",
        cascade="all, delete-orphan",
    )