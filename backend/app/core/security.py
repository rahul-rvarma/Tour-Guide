from datetime import datetime, timedelta
from jose import jwt
from app.core.config import JWT_SECRET, ALGORITHM

def create_access_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(days=1)
    return jwt.encode(payload, JWT_SECRET, algorithm=ALGORITHM)
