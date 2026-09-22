import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Routers
from routers.weather import router as weather_router
from routers.searchAgent import router as search_router
from routers.FLIGHT_Search import router as flight_router
from routers.auth import router as auth_router
from routers.login import router as login_router
from routers.budget import router as budget_router

# Load environment variables
load_dotenv()

# Create FastAPI application
app = FastAPI(
    title="Travel Plan Maker API",
    description="AI-powered Travel Planning API with Weather, Travel Search, Flight Search, Budget Planning and Authentication",
    version="1.0.0"
)


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(weather_router, prefix="/api")
app.include_router(search_router, prefix="/api")
app.include_router(flight_router, prefix="/api")
app.include_router(auth_router, prefix="/auth")
app.include_router(login_router, prefix="/login")
app.include_router(budget_router, prefix="/budget")

@app.get("/")
async def root():
    return {
        "message": "Travel Plan Maker API is running",
        "features": [
            "Weather",
            "Travel Search",
            "Flight Search",
            "Budget Planning",
            "User Registration",
            "User Login"
        ]
    }


if __name__ == "__main__":
    # This allows you to run the file using `python main.py`
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)