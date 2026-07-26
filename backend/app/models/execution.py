from sqlalchemy import *

from app.database.base import Base

class Execution(Base):

    __tablename__ = "executions"

    id = Column(Integer, primary_key=True)

    agent_id = Column(Integer)

    status = Column(String)

    started_at = Column(String)

    ended_at = Column(String)

    records = Column(Integer)
