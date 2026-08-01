from openai import OpenAI
from tools.tavilyAgent import TavilyAgent
from tools.weather import get_weather
import config


class LLMManager:
    def __init__(self):
        self.tavily = TavilyAgent()
        self.weather = get_weather
        self.openai = OpenAI(api_key=config.OPENAI_API_KEY) if config.OPENAI_API_KEY else None


llm = LLMManager()

