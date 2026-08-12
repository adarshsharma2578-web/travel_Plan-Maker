import os
import requests
from dotenv import load_dotenv

load_dotenv()


def Flight_information(Flight_name: str) -> dict:
    """
    Provide flight information to make your trip better.
    """

    # RapidAPI URL
    url = "https://booking-com15.p.rapidapi.com/api/v2/cars/bookingSummary?countryOfResidence=us"

    # RapidAPI headers
    headers = {
        "x-rapidapi-key": os.getenv("RAPIDAPI_KEY"),
        "x-rapidapi-host": "booking-com15.p.rapidapi.com"
    }

    # Send GET request
    response = requests.get(url, headers=headers)

    # Check response
    if response.status_code == 200:
        data = response.json()

        return {
            "flight_Name": data.get("flight_Name"),
            "flight_date": data.get("flight_date")
        }

    else:
        raise Exception(
            f"Failed to fetch flight information. "
            f"Status code: {response.status_code}"
        )