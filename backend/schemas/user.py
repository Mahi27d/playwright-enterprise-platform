"""Wrapper: re-export user schemas from app.schemas.user"""
from app.schemas.user import UserCreate, UserResponse

__all__ = ["UserCreate", "UserResponse"]
