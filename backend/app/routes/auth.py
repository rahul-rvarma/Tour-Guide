from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
import os

from app.models.user import User
from app.schemas.user import SignupSchema, LoginSchema, Token, UserInfo
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])
pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In-memory storage for testing when no database is available
test_users = {
    "admin@example.com": {
        "name": "Admin User",
        "email": "admin@example.com",
        "hashed_password": pwd.hash("admin123"),
        "is_admin": True
    }
}

@router.post("/signup")
async def signup(data: SignupSchema):
    # Check if we have a database connection
    mongodb_uri = os.getenv("MONGODB_URI")
    
    if not mongodb_uri:
        # Use in-memory storage for testing
        if data.email in test_users:
            raise HTTPException(400, "Email already exists")
        
        test_users[data.email] = {
            "name": data.name,
            "email": data.email,
            "hashed_password": pwd.hash(data.password),
            "is_admin": False  # Regular users are not admin by default
        }
        return {"message": "User created successfully"}
    else:
        # Use database
        try:
            if await User.find_one(User.email == data.email):
                raise HTTPException(400, "Email already exists")

            user = User(
                name=data.name,
                email=data.email,
                hashed_password=pwd.hash(data.password),
            )
            await user.insert()
            return {"message": "User created successfully"}
        except Exception as e:
            raise HTTPException(500, "Database operation failed")

@router.post("/login", response_model=Token)
async def login(data: LoginSchema):
    mongodb_uri = os.getenv("MONGODB_URI")
    
    if not mongodb_uri:
        # Use in-memory storage for testing
        if data.email not in test_users:
            raise HTTPException(401, "Invalid credentials")
        
        user_data = test_users[data.email]
        if not pwd.verify(data.password, user_data["hashed_password"]):
            raise HTTPException(401, "Invalid credentials")
        
        token = create_access_token({"user_id": data.email, "email": data.email})
        user_info = UserInfo(name=user_data["name"], email=user_data["email"], is_admin=user_data.get("is_admin", False))
        return {"access_token": token, "token_type": "bearer", "user": user_info}
    else:
        # Use database
        try:
            user = await User.find_one(User.email == data.email)
            if not user or not pwd.verify(data.password, user.hashed_password):
                raise HTTPException(401, "Invalid credentials")

            token = create_access_token({"user_id": str(user.id)})
            user_info = UserInfo(name=user.name, email=user.email, is_admin=user.is_admin)
            return {"access_token": token, "token_type": "bearer", "user": user_info}
        except Exception as e:
            raise HTTPException(500, "Database operation failed")
