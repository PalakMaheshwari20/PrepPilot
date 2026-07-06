from sqlalchemy import Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import ResourceProvider, ResourceType
from app.models.mixins import TimestampMixin


class Resource(Base, TimestampMixin):
    __tablename__ = "resources"

    id: Mapped[int] = mapped_column(primary_key=True)

    task_id: Mapped[int] = mapped_column(
        ForeignKey("tasks.id"),
        nullable=False,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    type: Mapped[ResourceType] = mapped_column(
        Enum(ResourceType),
        nullable=False,
    )

    provider: Mapped[ResourceProvider] = mapped_column(
        Enum(ResourceProvider),
        nullable=False,
    )

    url: Mapped[str] = mapped_column(
        String(1000),
        nullable=False,
    )

    order: Mapped[int] = mapped_column(
        default=1,
        nullable=False,
    )

    task = relationship(
        "Task",
        back_populates="resources",
    )