import os
import requests
from dotenv import load_dotenv
from fastapi import APIRouter
from typing import Optional

load_dotenv()

router = APIRouter()

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")

@router.get("/flights")
def flight_information(
    destination: str,

    origin: Optional[str] = "JFK", 
    date: Optional[str] = "2026-10-01" 
):
    if not RAPIDAPI_KEY:
        return {"error": "RAPIDAPI_KEY is not set in .env"}

    url = "https://airplanesdb.p.rapidapi.com/?ordering=-plane"

    headers = {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": "airplanesdb.p.rapidapi.com"
    }

    params = {
        "origin": origin,
        "destination": destination,
        "date": date
    }

    
    try:
        response = requests.get(url, headers=headers, params=params)
        
        if response.status_code != 200:
            return {"error": f"Flight API returned an error: {response.status_code}"}
            
        return response.json()
    except Exception as e:
        return {"error": f"Failed to fetch flight data: {str(e)}"}