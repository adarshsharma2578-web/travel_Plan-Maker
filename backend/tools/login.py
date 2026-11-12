from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# --- Pydantic Models ---
class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

# --- Routes ---
@router.post("/register")
async def register_user(user: RegisterRequest):
    # Mock registration
    return {"message": "User registered successfully", "name": user.name}

@router.post("/login")
async def login_user(user: LoginRequest):
    # Mock login validation (In a real app, check the database here)
    if not user.email or not user.password:
        raise HTTPException(status_code=400, detail="Invalid email or password")
        
    # Return a fake token to simulate a successful login
    return {
        "message": "Login successful",
        "token": "fake-jwt-token-12345"
    }