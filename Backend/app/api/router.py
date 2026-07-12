from fastapi import APIRouter

from app.api.routes.modules import router as module_router
from app.api.routes.resources import router as resource_router
from app.api.routes.roadmaps import router as roadmap_router
from app.api.routes.tasks import router as task_router
from app.api.routes.topics import router as topic_router

api_router = APIRouter()

api_router.include_router(roadmap_router)
api_router.include_router(module_router)
api_router.include_router(topic_router)
api_router.include_router(task_router)
api_router.include_router(resource_router)