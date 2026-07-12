from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.topic import TopicResponse
from app.schemas.topic_full import TopicFullResponse
from app.services.topic_service import TopicService

router = APIRouter(
    prefix="/modules/{module_id}/topics",
    tags=["Topics"],
)


@router.get(
    "",
    response_model=list[TopicResponse],
)
def get_topics(
    module_id: int,
    db: Session = Depends(get_db),
):
    service = TopicService(db)
    return service.get_topics(module_id)

@router.get(
    "/{topic_id}/full",
    response_model=TopicFullResponse,
)
def get_full_topic(
    topic_id: int,
    db: Session = Depends(get_db),
):
    service = TopicService(db)

    topic = service.get_full_topic(topic_id)

    if topic is None:
        raise HTTPException(
            status_code=404,
            detail="Topic not found",
        )

    return topic

@router.get(
    "/{topic_id}",
    response_model=TopicResponse,
)
def get_topic(
    module_id: int,
    topic_id: int,
    db: Session = Depends(get_db),
):
    service = TopicService(db)

    topic = service.get_topic(topic_id)

    if topic is None or topic.module_id != module_id:
        raise HTTPException(
            status_code=404,
            detail="Topic not found",
        )

    return topic