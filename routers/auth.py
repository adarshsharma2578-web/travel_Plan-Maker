from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# This matches the JSON body you send from React
class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

@router.post("/register")
async def register_user(user: RegisterRequest):
    # In a real app, you would hash the password and save to a database here.
    # For now, we just return a success message so your frontend works!
    
    return {
        "message": "User registered successfully", 
        "name": user.name,
        "email": user.email
    }