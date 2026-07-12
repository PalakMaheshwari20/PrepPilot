from pydantic import BaseModel, ConfigDict


class RoadmapResponse(BaseModel):
    id: int
    code: str
    name: str
    description: str | None
    icon: str
    color: str
    is_active: bool

    model_config = ConfigDict(from_attributes=True)