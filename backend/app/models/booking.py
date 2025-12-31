from beanie import Document, PydanticObjectId

class Booking(Document):
    user_id: PydanticObjectId
    destination_id: PydanticObjectId
    date: str
    people: int

    class Settings:
        name = "bookings"
