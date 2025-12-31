from beanie import Document
from pydantic import EmailStr

class User(Document):
    name: str
    email: EmailStr
    hashed_password: str
    is_admin: bool = False

    class Settings:
        name = "users"
