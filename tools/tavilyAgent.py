# use for the real time search
from tavily import TavilyClient
import config


class TavilyAgent:
    def __init__(self):
        self.client = TavilyClient(api_key=config.TAVILY_API_KEY)

    def search(self, query: str, max_results: int = 5):
        response = self.client.search(query=query, max_results=max_results)
        return response.get("results", [])

