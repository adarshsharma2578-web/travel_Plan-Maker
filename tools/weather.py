# show the weather condition in the city
import os
import requests
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv("WEATHER_API_KEY")


def get_weather(city):
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
    response.raise_for_status()
    data = response.json()
    return {
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "condition": data["weather"][0]["description"]
    }

