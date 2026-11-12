

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class UserRegister(BaseModel):
    name: str
    email: str
    password: str


@router.post("/register")
async def register_user(user: UserRegister):
    # Your registration logic 
    return {"message": "Account created successfully"}