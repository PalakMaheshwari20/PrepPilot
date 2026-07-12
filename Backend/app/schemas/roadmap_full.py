from pydantic import BaseModel, ConfigDict


class TopicSummary(BaseModel):
    id: int
    title: str
    order: int

    model_config = ConfigDict(from_attributes=True)


class ModuleSummary(BaseModel):
    id: int
    title: str
    description: str | None
    order: int
    topics: list[TopicSummary]

    model_config = ConfigDict(from_attributes=True)


class RoadmapFullResponse(BaseModel):
    id: int
    code: str
    name: str
    description: str | None
    icon: str
    color: str
    is_active: bool
    modules: list[ModuleSummary]

    model_config = ConfigDict(from_attributes=True)