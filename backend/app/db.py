from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
import logging

from app.models.user import User
from app.models.destination import Destination
from app.models.booking import Booking

async def init_db(uri: str):
    if not uri:
        logging.warning("MongoDB URI not provided. Skipping database initialization.")
        return
        
    try:
        client = AsyncIOMotorClient(uri)
        await init_beanie(
            database=client.get_default_database(),
            document_models=[User, Destination, Booking],
        )
        logging.info("Database initialized successfully")
    except Exception as e:
        logging.error(f"Failed to initialize database: {e}")
        logging.info("Application will run without database functionality")
