# Open routers/auth.py and make sure it looks like this:

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class UserRegister(BaseModel):
    name: str
    email: str
    password: str

# 🛑 FIX: Make sure this says "/register", NOT "/"
@router.post("/register")
async def register_user(user: UserRegister):
    # Your registration logic here (e.g., saving to database)
    return {"message": "Account created successfully"}