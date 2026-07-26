from pydantic import BaseModel, HttpUrl
from typing import Optional
from datetime import datetime


class AgentBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: str
    website: HttpUrl
    start_url: HttpUrl
    browser: str
    schedule: Optional[str] = None
    timeout: Optional[int] = 30
    retry_count: Optional[int] = 3
    enabled: Optional[bool] = True


class AgentCreate(AgentBase):
    pass


class AgentUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    website: Optional[HttpUrl] = None
    start_url: Optional[HttpUrl] = None
    browser: Optional[str] = None
    schedule: Optional[str] = None
    timeout: Optional[int] = None
    retry_count: Optional[int] = None
    enabled: Optional[bool] = None


class AgentResponse(AgentBase):
    id: int
    deleted: bool
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
