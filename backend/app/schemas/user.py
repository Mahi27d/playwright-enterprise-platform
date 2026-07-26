from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    username: str
    email: Optional[EmailStr] = None
    password: str
    role: Optional[str] = "Viewer"


class UserResponse(BaseModel):
    id: int
    username: str
    email: Optional[EmailStr] = None
    role: Optional[str] = "Viewer"
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
