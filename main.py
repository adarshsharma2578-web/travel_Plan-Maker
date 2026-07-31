from fastapi import FastAPI
from llm import llm

app = FastAPI()


@app.get("/")
def home():
    return {"status": "Server running"}


@app.get("/search")
def search(query: str):
    return llm.tavily.search(query)


@app.get("/weather")
def weather(city: str):
    return llm.weather.get_weather(city)


@app.post("/chat")
def chat(prompt: str):
    response = llm.openai.chat.completions.create(
        model="gpt-5",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return {
        "response": response.choices[0].message.content
    }