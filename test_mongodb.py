
import asyncio
from database.db import client, mongo_api_available

async def test_mongodb():

    if not mongo_api_available():
        print("MongoDB URI is missing!")
        return

    try:
        await client.admin.command("ping")
        print("MongoDB Connected Successfully!")

    except Exception as e:
        print("MongoDB Connection Failed!")
        print("Error:", e)

    finally:
        await client.close()


asyncio.run(test_mongodb())
