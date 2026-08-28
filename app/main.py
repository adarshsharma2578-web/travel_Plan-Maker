from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers.weather import router as weather_router
from routers.searchAgent import router as search_router
from routers.FLIGHT_Search import router as FLIGHT_router

load_dotenv()


app = FastAPI(
    title="Trip Plan Maker API",
    description="Trip planning API with Weather, Tavily Search and Flight Search",
    version="1.0.0"
)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(weather_router)
app.include_router(search_router)
app.include_router(FLIGHT_router)



@app.get("/")
async def root():
    return {
        "message": "Trip Plan Maker API is running"
    }