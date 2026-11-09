
from pymongo import AsyncMongoClient
from dotenv import load_dotenv
from pathlib import Path
import os

# Load environment variables
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

DATABASE_NAME = "Travel_plan_maker"

# Get MongoDB connection string
MONGODB_URI = os.getenv("MONGODB_URI")

# Create MongoDB client
client = None
db = None

if MONGODB_URI and MONGODB_URI.strip():
    client = AsyncMongoClient(
        MONGODB_URI,
        appname="Travel_plan_maker"
    )
    db = client[DATABASE_NAME]


def get_collection(name: str):
    if db is None:
        raise RuntimeError("MongoDB URI is missing!")
    return db[name]


def mongo_api_available():
    return client is not None
