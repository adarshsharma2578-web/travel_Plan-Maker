from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routers.weather import router as weather_router
from routers.searchAgent import router as search_router 
from routers.FLIGHT_Search import router as FLIGHT_router
from routers.auth import router as auth_router
from routers.login import router as login_router
from routers.budget import router as budget_router
load_dotenv()

app = FastAPI(
    title="Trip Plan Maker API",
    description="Trip planning API with Weather, Tavily Search and Flight Search",
    version="1.0.0"
)
origns = [
    "http://localhost:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origns,  #all frontend requests will be allowed
    allow_credentials=True,
    allow_methods=["*"],  # get ,put , post, delete
    allow_headers=["*"],
)
 #  this is the path for the frontend file
app.include_router(weather_router, prefix="/api")
app.include_router(search_router, prefix="/api")
app.include_router(FLIGHT_router, prefix="/api")
# 2. Include it here with the "/auth" prefix
app.include_router(auth_router, prefix="/auth")
app.include_router(login_router, prefix="/login")
app.include_router(budget_router, prefix="/budget")
@app.get("/")
async def root():
    return {
        "message": "core enbale for weather, search and flight search",
    }