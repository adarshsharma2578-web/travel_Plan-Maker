import os
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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

# API Keys
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

if not TAVILY_API_KEY:
    print("❌ TAVILY_API_KEY not found in .env")
if not WEATHER_API_KEY:
    print("❌ WEATHER_API_KEY not found in .env")

# Tavily Client
tavily_client = TavilyClient(api_key=TAVILY_API_KEY) if TAVILY_API_KEY else None

# Weather API
WEATHER_API_URL = "http://api.weatherapi.com/v1/current.json"

class TripRequest(BaseModel):
    destination: str
    date: str
    days: int
    budget: str

@app.get("/")
def home():
    return {"message": "Trip Plan Maker API Running 🚀"}

# Generate Trip
@app.post("/api/generate-trip")
def generate_trip(trip: TripRequest):
    if not tavily_client:
        raise HTTPException(
            status_code=500, detail="TAVILY_API_KEY is missing."
        )
    try:
        query = f"""
        Create a detailed travel plan for:
        Destination: {trip.destination}
        Date: {trip.date}
        Duration: {trip.days} days
        Budget: {trip.budget}
        Provide an organized breakdown including a day-wise itinerary, food recommendations, and travel tips.
        """
        
        # Get an AI-synthesized answer directly from Tavily
        results = tavily_client.search(query=query, include_answer=True)
        
        # Extract the AI answer string or fallback to content snippets
        ai_answer = results.get("answer")
        web_snippets = results.get("results", [])
        
        return {
            "success": True,
            "destination": trip.destination,
            "answer": ai_answer if ai_answer else "Look at the web sources below for details.",
            "plan": web_snippets
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Tavily Error: {str(e)}"
        )


@app.get("/weather")
def weather(city: str):
    if not WEATHER_API_KEY:
        raise HTTPException(
            status_code=500, detail="WEATHER_API_KEY is missing."
        )
    try:
        response = requests.get(
            WEATHER_API_URL, 
            params={"key": WEATHER_API_KEY, "q": city, "aqi": "no"}, 
            timeout=10
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=500, detail=f"Weather API Error: {str(e)}"
        )
