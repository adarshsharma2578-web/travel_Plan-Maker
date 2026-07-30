import os
import requests
from dotenv import laod_dotenv
load_dotenv()

API_KEY = os.getenv("WEATHER_API_KEY")

def get_weather(city):
    url = "https://api.openweathermap.org/data/2.5/weather"

params = {
    "q" : City,
    "applid" : API_KEY,
    "unit" : "metric"

}
response =  requests.get(url,params=params)
response.raise_for_status()

data = response.json()

return {
    "city": data["name"],
    "temperature": data["main"]["temp"],
    "humidity": data["main"]["humidity"],
    "condition": data["weather"][0]["description"]
}


