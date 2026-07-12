from pydantic import BaseModel, ConfigDict

from app.models.enums import ResourceProvider, ResourceType


class ResourceResponse(BaseModel):
    id: int
    task_id: int
    title: str
    type: ResourceType
    provider: ResourceProvider
    url: str
    order: int

    model_config = ConfigDict(from_attributes=True)