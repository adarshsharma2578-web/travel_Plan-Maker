import os
import requests
from dotenv import load_dotenv
from fastapi import APIRouter

load_dotenv()

router = APIRouter()

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")


@router.get("/flight")
def flight_information(
    origin: str,
    destination: str,
    date: str
):
    if not RAPIDAPI_KEY:
        raise ValueError("RAPIDAPI_KEY is not set in .env")

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

    response = requests.get(
        url,
        headers=headers,
        params=params
    )

    response.raise_for_status()

    return response.json()