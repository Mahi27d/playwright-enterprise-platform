import bcrypt


def _normalize_password(pw: str) -> bytes:
    b = pw.encode("utf-8") if isinstance(pw, str) else pw
    if len(b) > 72:
        b = b[:72]
    return b


def hash_password(password: str) -> str:
    b = _normalize_password(password)
    return bcrypt.hashpw(b, bcrypt.gensalt()).decode('utf-8')


def get_password_hash(password: str) -> str:
    return hash_password(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    b = _normalize_password(plain_password)
    try:
        return bcrypt.checkpw(b, hashed_password.encode('utf-8'))
    except Exception:
        return False
