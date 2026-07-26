from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.sql import func

from app.database.base import Base


class Agent(Base):

    __tablename__ = "agents"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=False)
    website = Column(String, nullable=False)
    start_url = Column(String, nullable=False)
    browser = Column(String, nullable=False)
    schedule = Column(String, nullable=True)
    timeout = Column(Integer, default=30, nullable=False)
    retry_count = Column(Integer, default=3, nullable=False)
    enabled = Column(Boolean, default=True, nullable=False)
    deleted = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
