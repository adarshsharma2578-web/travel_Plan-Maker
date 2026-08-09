import os
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from weather import router as weather_router
from tavily import router as searchAgent
from pydantic import BaseModel
from tavily import TavilyClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Trip Plan Maker API")

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

searchAgent_router = APIRouter()

@searchAgent_router.get("/search")
def search():
    return {"message": "Searching"}
app.include_router(weather_router)
app.include_router(searchAgent_router)
