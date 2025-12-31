from pydantic import BaseModel, EmailStr

class SignupSchema(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

class UserInfo(BaseModel):
    name: str
    email: EmailStr
    is_admin: bool = False

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserInfo
