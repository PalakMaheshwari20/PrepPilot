from pydantic import BaseModel


class DashboardResponse(BaseModel):
    overall_progress: float
    completed_tasks: int
    in_progress_tasks: int
    pending_tasks: int
    estimated_minutes_remaining: int