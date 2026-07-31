# use for the real time search ----<
import os

from tavily import tavilyClient
import dotenv
tavilt = tavilyClient(api_key=os.environ.get("TAVILY_API_KEY"))
user_query = input("what would you like to search on web")
if user_query.strip():
    print(f"\nSearching for:{user_query}")
    response = tavily.search(query=user,max_result=10)

    for i,result in enumerate(response['result'],1):
        print(f"[{i}]{result[title]}")
        print(f"URL:{result['url']}")
        print(f"Snippet:{result['content']}\n"+"-"*40)
else:
    print("Search quesry is empty")