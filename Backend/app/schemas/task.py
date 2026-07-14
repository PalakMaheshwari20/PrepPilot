from pydantic import BaseModel, ConfigDict

from app.models.enums import Difficulty, TaskStatus, TaskType


class TaskResponse(BaseModel):
    id: int
    topic_id: int
    title: str
    description: str | None
    status: TaskStatus
    estimated_minutes: int
    order: int
    type: TaskType
    difficulty: Difficulty | None

    model_config = ConfigDict(from_attributes=True)


class TaskStatusUpdate(BaseModel):
    status: TaskStatus