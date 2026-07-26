from datetime import datetime, timedelta
import os
from typing import Optional, Dict, Any

from jose import jwt, JWTError, ExpiredSignatureError

SECRET_KEY = os.getenv("SECRET_KEY", "change-me-for-prod")
ALGORITHM = os.getenv("ALGORITHM", "HS256")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token containing `data` and an expiry."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_token(token: str) -> Dict[str, Any]:
    """Decode and validate a JWT token. Raises `ExpiredSignatureError` or `JWTError` on failure."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except ExpiredSignatureError:
        raise
    except JWTError:
        raise


def is_token_expired(payload: Dict[str, Any]) -> bool:
    """Return True if the token payload indicates the token is expired."""
    exp = payload.get("exp")
    if exp is None:
        return True
    # `exp` may be a timestamp or datetime depending on encode; handle both
    if isinstance(exp, (int, float)):
        return datetime.utcnow().timestamp() > float(exp)
    if isinstance(exp, str):
        try:
            exp_val = float(exp)
            return datetime.utcnow().timestamp() > exp_val
        except ValueError:
            return True
    if isinstance(exp, datetime):
        return datetime.utcnow() > exp
    return True
