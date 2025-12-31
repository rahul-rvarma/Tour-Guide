from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.db import init_db
from app.core.config import MONGODB_URI
from app.routes import auth, destinations, bookings
from pathlib import Path
import os

app = FastAPI(title="Keralam Backend")

# Create uploads directory if it doesn't exist
uploads_dir = Path("uploads")
uploads_dir.mkdir(exist_ok=True)

# Serve static files (uploaded images)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

import os

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://127.0.0.1:5173",  # Local development
        "https://*.onrender.com",  # Render deployment
        os.getenv("FRONTEND_URL", "")  # Production frontend URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def start_db():
    await init_db(MONGODB_URI)

@app.get("/")
async def root():
    return {"message": "Tour Guide API is running!"}

app.include_router(auth.router)
app.include_router(destinations.router)
app.include_router(bookings.router)
