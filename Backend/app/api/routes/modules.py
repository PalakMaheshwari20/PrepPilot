from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.module import ModuleResponse
from app.services.module_service import ModuleService

router = APIRouter(
    prefix="/roadmaps/{roadmap_id}/modules",
    tags=["Modules"],
)


@router.get(
    "",
    response_model=list[ModuleResponse],
)
def get_modules(
    roadmap_id: int,
    db: Session = Depends(get_db),
):
    service = ModuleService(db)
    return service.get_modules(roadmap_id)


@router.get(
    "/{module_id}",
    response_model=ModuleResponse,
)
def get_module(
    roadmap_id: int,
    module_id: int,
    db: Session = Depends(get_db),
):
    service = ModuleService(db)

    module = service.get_module(module_id)

    if module is None or module.roadmap_id != roadmap_id:
        raise HTTPException(
            status_code=404,
            detail="Module not found",
        )

    return module