from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.task import TaskResponse, TaskStatusUpdate
from app.services.task_service import TaskService

router = APIRouter(
    prefix="/topics/{topic_id}/tasks",
    tags=["Tasks"],
)


@router.get(
    "",
    response_model=list[TaskResponse],
)
def get_tasks(
    topic_id: int,
    db: Session = Depends(get_db),
):
    service = TaskService(db)
    return service.get_tasks(topic_id)


@router.get(
    "/{task_id}",
    response_model=TaskResponse,
)
def get_task(
    topic_id: int,
    task_id: int,
    db: Session = Depends(get_db),
):
    service = TaskService(db)

    task = service.get_task(task_id)

    if task is None or task.topic_id != topic_id:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return task

@router.patch(
    "/{task_id}/status",
    response_model=TaskResponse,
)
def update_task_status(
    topic_id: int,
    task_id: int,
    request: TaskStatusUpdate,
    db: Session = Depends(get_db),
):
    service = TaskService(db)

    task = service.get_task(task_id)

    if task is None or task.topic_id != topic_id:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return service.update_status(
        task_id,
        request.status,
    )