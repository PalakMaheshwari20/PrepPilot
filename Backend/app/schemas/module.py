from pydantic import BaseModel, ConfigDict


class ModuleResponse(BaseModel):
    id: int
    roadmap_id: int
    title: str
    description: str | None
    order: int

    model_config = ConfigDict(from_attributes=True)