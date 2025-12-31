from pydantic import BaseModel

class DestinationCreate(BaseModel):
    title: str
    description: str
    price: int

class DestinationOut(DestinationCreate):
    id: int

    class Config:
        orm_mode = True
