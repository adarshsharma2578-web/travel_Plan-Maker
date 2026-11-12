import os

from groq import Groq
from dotenv import load_dotenv
from fastapi import APIRouter

load_dotenv()

router = APIRouter()


def search_query(query: str) -> dict:
    """
    Takes a user query string and generates a response using Groq.
    """

    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        raise ValueError("GROQ API KEY is not set in the .env file")

    groq_client = Groq(api_key=api_key)

    response = groq_client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "user",
                "content": query
            }
        ]
    )

    return {
        "query": query,
        "response": response.choices[0].message.content
    }


@router.get("/search")
def search(query: str):
    return search_query(query)