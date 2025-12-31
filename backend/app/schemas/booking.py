from pydantic import BaseModel

class BookingCreate(BaseModel):
    destination_id: int
    date: str
    people: int

class BookingOut(BookingCreate):
    id: int

    class Config:
        orm_mode = True
