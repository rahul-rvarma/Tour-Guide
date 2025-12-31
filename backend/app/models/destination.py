from beanie import Document
from typing import Optional

class Destination(Document):
    name: str
    description: str
    image_filename: Optional[str] = None
    price: float
    location: str
    rating: float

    class Settings:
        name = "destinations"
