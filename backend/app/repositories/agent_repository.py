from sqlalchemy.orm import Session
from app.models.agent import Agent
from typing import List, Optional


def create_agent(db: Session, agent_data: dict) -> Agent:
    agent = Agent(**agent_data)
    db.add(agent)
    db.commit()
    db.refresh(agent)
    return agent


def get_agent(db: Session, agent_id: int) -> Optional[Agent]:
    return db.query(Agent).filter(Agent.id == agent_id, Agent.deleted == False).first()


def get_all_agents(db: Session, skip: int = 0, limit: int = 100, search: Optional[str] = None) -> List[Agent]:
    query = db.query(Agent).filter(Agent.deleted == False)
    if search:
        pattern = f"%{search}%"
        query = query.filter(
            Agent.name.ilike(pattern) | Agent.website.ilike(pattern) | Agent.category.ilike(pattern)
        )
    return query.offset(skip).limit(limit).all()


def update_agent(db: Session, agent_id: int, updates: dict) -> Optional[Agent]:
    agent = db.query(Agent).filter(Agent.id == agent_id, Agent.deleted == False).first()
    if not agent:
        return None
    for key, value in updates.items():
        setattr(agent, key, value)
    db.add(agent)
    db.commit()
    db.refresh(agent)
    return agent


def delete_agent(db: Session, agent_id: int) -> Optional[Agent]:
    agent = db.query(Agent).filter(Agent.id == agent_id, Agent.deleted == False).first()
    if not agent:
        return None
    agent.deleted = True
    agent.enabled = False
    db.add(agent)
    db.commit()
    db.refresh(agent)
    return agent


def clone_agent(db: Session, agent_id: int) -> Optional[Agent]:
    agent = db.query(Agent).filter(Agent.id == agent_id, Agent.deleted == False).first()
    if not agent:
        return None
    clone_name = f"{agent.name} Copy"
    clone = Agent(
        name=clone_name,
        description=agent.description,
        category=agent.category,
        website=agent.website,
        start_url=agent.start_url,
        browser=agent.browser,
        schedule=agent.schedule,
        timeout=agent.timeout,
        retry_count=agent.retry_count,
        enabled=agent.enabled,
        deleted=False,
    )
    db.add(clone)
    db.commit()
    db.refresh(clone)
    return clone


def enable_agent(db: Session, agent_id: int) -> Optional[Agent]:
    agent = db.query(Agent).filter(Agent.id == agent_id, Agent.deleted == False).first()
    if not agent:
        return None
    agent.enabled = True
    db.add(agent)
    db.commit()
    db.refresh(agent)
    return agent


def disable_agent(db: Session, agent_id: int) -> Optional[Agent]:
    agent = db.query(Agent).filter(Agent.id == agent_id, Agent.deleted == False).first()
    if not agent:
        return None
    agent.enabled = False
    db.add(agent)
    db.commit()
    db.refresh(agent)
    return agent
