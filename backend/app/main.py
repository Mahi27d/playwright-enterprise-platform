from fastapi import FastAPI

from app.database.database import engine
from app.database.base import Base

import app.models.user
import app.models.agent
import app.models.schedule
import app.models.execution

Base.metadata.create_all(bind=engine)

app = FastAPI()

from app.auth.router import router as auth_router

app.include_router(auth_router)

from fastapi import Depends
from app.auth.dependencies import get_current_user, get_db, require_roles
from sqlalchemy.orm import Session
from app.models.agent import Agent
from app.models.user import Role


@app.get('/agents')
def list_agents(current_user = Depends(require_roles(Role.Manager, Role.Admin)), db: Session = Depends(get_db)):
    agents = db.query(Agent).all()
    return [
        {
            'id': a.id,
            'name': a.name,
            'website': a.website,
            'category': a.category,
            'enabled': a.enabled,
            'schedule': a.schedule,
        }
        for a in agents
    ]

@app.get("/")
def root():
    return {"message":"EPAP"}
