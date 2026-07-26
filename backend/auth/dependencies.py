"""Wrapper: re-export auth dependency helpers from app.auth.dependencies"""
from app.auth.dependencies import get_current_user, get_db, require_roles, oauth2_scheme

__all__ = ["get_current_user", "get_db", "require_roles", "oauth2_scheme"]
