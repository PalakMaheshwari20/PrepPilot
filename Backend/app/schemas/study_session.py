from pydantic import BaseModel


class StudyTask(BaseModel):
    task_id: int
    roadmap_id: int
    module_id: int
    topic_id: int

    title: str
    topic: str
    module: str

    estimated_minutes: int
    status: str


class StudySessionResponse(BaseModel):
    requested_minutes: int
    total_minutes: int
    task_count: int
    tasks: list[StudyTask]