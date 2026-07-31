from dotenv import load_dotenv
import os
load_dotenv()
tavity_api_key = os.getenv("TAVILY_API_KEY")
weather_api_key = os.getenv("WEATHER_API_KEY")