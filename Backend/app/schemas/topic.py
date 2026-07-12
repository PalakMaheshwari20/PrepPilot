from pydantic import BaseModel, ConfigDict


class TopicResponse(BaseModel):
    id: int
    module_id: int
    title: str
    description: str | None
    order: int

    model_config = ConfigDict(from_attributes=True)