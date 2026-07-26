from sqlalchemy import *

from app.database.base import Base

class Agent(Base):

    __tablename__ = "agents"

    id = Column(Integer, primary_key=True)

    name = Column(String)

    website = Column(String)

    category = Column(String)

    enabled = Column(Boolean, default=True)

    schedule = Column(String)
