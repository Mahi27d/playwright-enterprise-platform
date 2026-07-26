"""Wrapper: re-export user model and Role enum from app.models.user"""
from app.models.user import User, Role

__all__ = ["User", "Role"]
