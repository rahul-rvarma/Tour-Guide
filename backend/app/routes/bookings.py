from fastapi import APIRouter, Depends
from bson import ObjectId

from app.models.booking import Booking
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/bookings", tags=["Bookings"])

@router.post("/")
async def create_booking(
    data: Booking,
    user: User = Depends(get_current_user),
):
    data.user_id = user.id
    await data.insert()
    return {"message": "Booking created"}

@router.get("/me")
async def my_bookings(user: User = Depends(get_current_user)):
    return await Booking.find(Booking.user_id == user.id).to_list()
