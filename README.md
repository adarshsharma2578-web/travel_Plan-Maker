# Travel Plan Maker - FastAPI Server

A FastAPI server for a travel planning application with real-time web search (Tavily), weather lookups (OpenWeatherMap), and AI chat (OpenAI).

## Setup

### 1. Install dependencies

```bash
python -m venv venv
venv\Scripts\pip install -r requirements.txt
```

### 2. Configure environment variables

Create a `.env` file in the project root with:

```
TAVILY_API_KEY=your_tavily_api_key
WEATHER_API_KEY=your_openweathermap_api_key
OPENAI_API_KEY=your_openai_api_key
```

- `TAVILY_API_KEY` — **Required** for `/search` endpoint (get it at [tavily.com](https://tavily.com))
- `WEATHER_API_KEY` — Required for `/weather` endpoint (get it at [openweathermap.org](https://openweathermap.org))
- `OPENAI_API_KEY` — Required for AI chat in `/chat` endpoint (get it at [platform.openai.com](https://platform.openai.com)). If not set, `/chat` falls back to Tavily search results.

### 3. Run the server

```bash
venv\Scripts\python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

For auto-reload during development:

```bash
venv\Scripts\python -m uvicorn main:app --reload
```

## API Endpoints

| Method | Endpoint     | Description                                | Parameters                      |
|--------|--------------|--------------------------------------------|---------------------------------|
| GET    | `/`          | Health check                               | —                               |
| GET    | `/search`    | Real-time web search via Tavily            | `query` (string)                |
| GET    | `/weather`   | Get weather for a city via OpenWeatherMap  | `city` (string)                 |
| POST   | `/chat`      | AI chat (OpenAI) or fallback to Tavily     | JSON body: `{"prompt": "..."}`  |

### Example Requests

**Health check:**
```
GET http://localhost:8000/
```

**Search:**
```
GET http://localhost:8000/search?query=best%20travel%20destinations
```

**Weather:**
```
GET http://localhost:8000/weather?city=Tokyo
```

**Chat:**
```
POST http://localhost:8000/chat
Content-Type: application/json

{"prompt": "Best places to visit in Japan"}
```

### Interactive Docs

Once running, visit **http://localhost:8000/docs** for Swagger UI (interactive API documentation) or **http://localhost:8000/redoc** for ReDoc.

