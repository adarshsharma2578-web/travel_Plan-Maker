import os
import requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from tavily import TavilyClient

app = FastAPI()

# Initialize Tavily client using environment variable
tavily_client = TavilyClient(api_key=os.environ.get("TAVILY_API_KEY"))

# Your weather API configurations
WEATHER_API_KEY = os.environ.get("WEATHER_API_KEY")
WEATHER_API_URL = "https://weatherapi.com" # Example URL

class ChatRequest(BaseModel):
    prompt: str

@app.get("/")
def home():
    return {"status": "Server running"}

@app.get("/search")
def search(query: str):
    try:
        results = tavily_client.search(query=query)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/weather")
def weather(city: str):
    if not WEATHER_API_KEY:
        raise HTTPException(status_code=500, detail="Weather API key not configured")
    
    try:
        # Example HTTP request to a standard weather service
        params = {"key": WEATHER_API_KEY, "q": city, "aqi": "no"}
        response = requests.get(WEATHER_API_URL, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Weather API error: {str(e)}")

@app.post("/chat")
def chat(req: ChatRequest):
    try:
        # Direct fallback to Tavily search as your primary data provider
        results = tavily_client.search(query=req.prompt)
        return {"response": results, "note": "Using Tavily search results"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
