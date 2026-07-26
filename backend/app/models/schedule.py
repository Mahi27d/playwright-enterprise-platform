from sqlalchemy import *

from app.database.base import Base

class Schedule(Base):

    __tablename__ = "schedules"

    id = Column(Integer, primary_key=True)

    cron = Column(String)

    enabled = Column(Boolean, default=True)
