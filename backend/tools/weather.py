# Show the weather condition in the city

import os
import requests
from dotenv import load_dotenv
from fastapi import APIRouter

load_dotenv()

router = APIRouter()
API_KEY = os.getenv("WEATHER_API_KEY")

def get_weather(city: str):
    if not API_KEY:
        return {
            "error": "WEATHER_API_KEY not set. Add your OpenWeatherMap API key to the .env file.",
            "city": city
        }

    url = "https://api.openweathermap.org/data/2.5/weather"

    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric"
    }

    response = requests.get(url, params=params)
    
    # 1. FIX: Better error handling instead of response.raise_for_status()
    # This stops FastAPI from crashing if the user types a city that doesn't exist
    if response.status_code != 200:
        return {"error": f"Could not find weather for '{city}'. Please check the spelling."}

    data = response.json()

    return {
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "condition": data["weather"][0]["description"]
    }

# 2. FIX: Removed "/{city}" so it accepts query parameters (?city=London)
@router.get("/weather")
def weather(city: str):
    return get_weather(city)