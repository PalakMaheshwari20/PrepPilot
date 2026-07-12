from pydantic import BaseModel, ConfigDict

from app.models.enums import Difficulty, ResourceProvider, ResourceType, TaskStatus, TaskType


class ResourceSummary(BaseModel):
    id: int
    title: str
    type: ResourceType
    provider: ResourceProvider
    url: str
    order: int

    model_config = ConfigDict(from_attributes=True)


class TaskSummary(BaseModel):
    id: int
    title: str
    description: str | None
    status: TaskStatus
    estimated_minutes: int
    order: int
    type: TaskType
    difficulty: Difficulty | None
    resources: list[ResourceSummary]

    model_config = ConfigDict(from_attributes=True)


class TopicFullResponse(BaseModel):
    id: int
    module_id: int
    title: str
    description: str | None
    order: int
    tasks: list[TaskSummary]

    model_config = ConfigDict(from_attributes=True)