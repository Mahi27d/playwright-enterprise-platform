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
from app.api.agents import router as agents_router

app.include_router(auth_router)
app.include_router(agents_router)

@app.get("/")
def root():
    return {"message": "EPAP"}
