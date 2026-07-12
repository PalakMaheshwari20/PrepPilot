from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.resource import ResourceResponse
from app.services.resource_service import ResourceService

router = APIRouter(
    prefix="/tasks/{task_id}/resources",
    tags=["Resources"],
)


@router.get(
    "",
    response_model=list[ResourceResponse],
)
def get_resources(
    task_id: int,
    db: Session = Depends(get_db),
):
    service = ResourceService(db)
    return service.get_resources(task_id)


@router.get(
    "/{resource_id}",
    response_model=ResourceResponse,
)
def get_resource(
    task_id: int,
    resource_id: int,
    db: Session = Depends(get_db),
):
    service = ResourceService(db)

    resource = service.get_resource(resource_id)

    if resource is None or resource.task_id != task_id:
        raise HTTPException(
            status_code=404,
            detail="Resource not found",
        )

    return resource