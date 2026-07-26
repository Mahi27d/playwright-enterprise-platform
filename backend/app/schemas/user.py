from pydantic import BaseModel, EmailStr
from typing import Optional


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

    class Config:
        orm_mode = True
