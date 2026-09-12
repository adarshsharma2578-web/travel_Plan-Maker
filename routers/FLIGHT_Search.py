import os
import requests
from dotenv import load_dotenv
from fastapi import APIRouter
from typing import Optional

load_dotenv()

router = APIRouter()

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")

# 1. FIX: Changed "/flight" to "/flights" to match the React fetch URL
@router.get("/flights")
def flight_information(
    destination: str,
    # 2. FIX: Made origin and date optional with default values. 
    # Because React only sends "destination", this prevents a 422 error.
    origin: Optional[str] = "JFK", 
    date: Optional[str] = "2026-10-01" 
):
    # 3. FIX: Return a JSON error instead of crashing the server
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

    # 4. FIX: Try/except block for safe error handling
    try:
        response = requests.get(url, headers=headers, params=params)
        
        if response.status_code != 200:
            return {"error": f"Flight API returned an error: {response.status_code}"}
            
        return response.json()
    except Exception as e:
        return {"error": f"Failed to fetch flight data: {str(e)}"}