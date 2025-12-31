from fastapi import APIRouter, Depends, HTTPException, Form, File, UploadFile
from fastapi.staticfiles import StaticFiles
from app.models.destination import Destination
from app.core.deps import admin_required
import os
import uuid
from pathlib import Path

router = APIRouter(prefix="/destinations", tags=["Destinations"])

# In-memory storage for testing when no database is available
test_destinations = []

# Create uploads directory if it doesn't exist
UPLOADS_DIR = Path("uploads")
UPLOADS_DIR.mkdir(exist_ok=True)

@router.get("/")
async def list_destinations():
    mongodb_uri = os.getenv("MONGODB_URI")
    
    if not mongodb_uri:
        # Use in-memory storage for testing
        return test_destinations
    else:
        # Use database
        try:
            return await Destination.find_all().to_list()
        except Exception as e:
            raise HTTPException(500, "Database operation failed")

@router.post("/", dependencies=[Depends(admin_required)])
async def add_destination(
    name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    location: str = Form(...),
    rating: float = Form(...),
    image: UploadFile = File(None)
):
    mongodb_uri = os.getenv("MONGODB_URI")
    
    # Handle image upload
    image_filename = None
    if image and image.filename:
        # Generate unique filename
        file_extension = os.path.splitext(image.filename)[1]
        image_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = UPLOADS_DIR / image_filename
        
        # Save the file
        with open(file_path, "wb") as buffer:
            content = await image.read()
            buffer.write(content)
    
    if not mongodb_uri:
        # Use in-memory storage for testing
        destination_dict = {
            "name": name,
            "description": description,
            "image_filename": image_filename,
            "price": price,
            "location": location,
            "rating": rating
        }
        test_destinations.append(destination_dict)
        return {"message": "Destination added successfully"}
    else:
        # Use database
        try:
            destination = Destination(
                name=name,
                description=description,
                image_filename=image_filename,
                price=price,
                location=location,
                rating=rating
            )
            await destination.insert()
            return {"message": "Destination added successfully"}
        except Exception as e:
            raise HTTPException(500, "Database operation failed")
