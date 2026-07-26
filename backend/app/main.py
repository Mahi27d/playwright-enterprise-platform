from fastapi import FastAPI

from app.database.database import engine
from app.database.base import Base

import app.models.user
import app.models.agent
import app.models.schedule
import app.models.execution

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def root():
    return {"message":"EPAP"}
