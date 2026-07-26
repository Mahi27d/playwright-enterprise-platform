from typing import Optional
from sqlalchemy.orm import Session
from urllib.parse import urlparse

from app.repositories.agent_repository import (
    create_agent,
    get_agent,
    get_all_agents,
    update_agent,
    delete_agent,
    clone_agent,
    enable_agent,
    disable_agent,
)
from app.schemas.agent import AgentCreate, AgentUpdate
from app.models.agent import Agent


def validate_url(value: str) -> bool:
    parsed = urlparse(value)
    return bool(parsed.scheme and parsed.netloc)


def create_agent_service(db: Session, payload: AgentCreate) -> Agent:
    if payload.website and not validate_url(payload.website):
        raise ValueError("Invalid website URL")
    if payload.start_url and not validate_url(payload.start_url):
        raise ValueError("Invalid start URL")

    existing = db.query(Agent).filter(Agent.name == payload.name, Agent.deleted == False).first()
    if existing:
        raise ValueError("Agent name already exists")

    agent_data = payload.dict()
    agent_data["timeout"] = payload.timeout or 30
    agent_data["retry_count"] = payload.retry_count or 3
    agent_data["deleted"] = False
    return create_agent(db, agent_data)


def update_agent_service(db: Session, agent_id: int, payload: AgentUpdate) -> Optional[Agent]:
    updates = payload.dict(exclude_unset=True)
    if "website" in updates and updates["website"] and not validate_url(updates["website"]):
        raise ValueError("Invalid website URL")
    if "start_url" in updates and updates["start_url"] and not validate_url(updates["start_url"]):
        raise ValueError("Invalid start URL")

    if "name" in updates:
        existing = db.query(Agent).filter(Agent.name == updates["name"], Agent.id != agent_id, Agent.deleted == False).first()
        if existing:
            raise ValueError("Agent name already exists")

    return update_agent(db, agent_id, updates)


def delete_agent_service(db: Session, agent_id: int) -> Optional[Agent]:
    return delete_agent(db, agent_id)


def clone_agent_service(db: Session, agent_id: int) -> Optional[Agent]:
    return clone_agent(db, agent_id)


def enable_agent_service(db: Session, agent_id: int) -> Optional[Agent]:
    return enable_agent(db, agent_id)


def disable_agent_service(db: Session, agent_id: int) -> Optional[Agent]:
    return disable_agent(db, agent_id)


def get_agent_service(db: Session, agent_id: int) -> Optional[Agent]:
    return get_agent(db, agent_id)


def get_all_agents_service(db: Session, skip: int = 0, limit: int = 100, search: str = None) -> list[Agent]:
    return get_all_agents(db, skip=skip, limit=limit, search=search)
