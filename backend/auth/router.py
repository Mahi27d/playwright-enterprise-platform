"""Wrapper: re-export auth router from app.auth.router"""
from app.auth.router import router as router

__all__ = ["router"]
