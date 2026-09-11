import os
from tavily import TavilyClient
from dotenv import load_dotenv
from fastapi import APIRouter

load_dotenv()

router = APIRouter()


def search_query(query: str) -> dict:
    """
    Takes a user query string, searches the web using Tavily,
    and returns the search results as a dictionary.
    """

    api_key = os.getenv("TAVILY_API_KEY")

    if not api_key:
        raise ValueError("TAVILY_API_KEY is not set in the .env file")

    tavily_client = TavilyClient(api_key=api_key)

    response = tavily_client.search(
        query=query,
        search_depth="advanced"
    )

    return response


@router.get("/search")
def search(query: str):
    return search_query(query)