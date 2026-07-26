from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from starlette.status import HTTP_201_CREATED

from app.auth.dependencies import get_db, require_roles
from app.models.user import Role
from app.schemas.agent import AgentCreate, AgentUpdate, AgentResponse
from app.services.agent_service import (
    create_agent_service,
    update_agent_service,
    delete_agent_service,
    get_agent_service,
    get_all_agents_service,
    clone_agent_service,
    enable_agent_service,
    disable_agent_service,
)

router = APIRouter(prefix="/agents", tags=["agents"])

@router.get("/", response_model=List[AgentResponse])
def list_agents(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None),
    current_user=Depends(require_roles(Role.Manager, Role.Admin)),
    db: Session = Depends(get_db),
):
    return get_all_agents_service(db, skip=skip, limit=limit, search=search)

@router.get("/{agent_id}", response_model=AgentResponse)
def get_agent(agent_id: int, current_user=Depends(require_roles(Role.Manager, Role.Admin)), db: Session = Depends(get_db)):
    agent = get_agent_service(db, agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent

@router.post("/", response_model=AgentResponse, status_code=HTTP_201_CREATED)
def create_agent(payload: AgentCreate, current_user=Depends(require_roles(Role.Manager, Role.Admin)), db: Session = Depends(get_db)):
    try:
        return create_agent_service(db, payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

@router.put("/{agent_id}", response_model=AgentResponse)
def update_agent(agent_id: int, payload: AgentUpdate, current_user=Depends(require_roles(Role.Manager, Role.Admin)), db: Session = Depends(get_db)):
    try:
        agent = update_agent_service(db, agent_id, payload)
        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")
        return agent
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

@router.delete("/{agent_id}", response_model=AgentResponse)
def delete_agent(agent_id: int, current_user=Depends(require_roles(Role.Manager, Role.Admin)), db: Session = Depends(get_db)):
    agent = delete_agent_service(db, agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent

@router.post("/{agent_id}/clone", response_model=AgentResponse)
def clone_agent(agent_id: int, current_user=Depends(require_roles(Role.Manager, Role.Admin)), db: Session = Depends(get_db)):
    agent = clone_agent_service(db, agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent

@router.patch("/{agent_id}/enable", response_model=AgentResponse)
def enable_agent(agent_id: int, current_user=Depends(require_roles(Role.Manager, Role.Admin)), db: Session = Depends(get_db)):
    agent = enable_agent_service(db, agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent

@router.patch("/{agent_id}/disable", response_model=AgentResponse)
def disable_agent(agent_id: int, current_user=Depends(require_roles(Role.Manager, Role.Admin)), db: Session = Depends(get_db)):
    agent = disable_agent_service(db, agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent
