import os
from dotenv import load_dotenv

# Load your .env file
load_dotenv()

# Get the API key from your environment
api_key = os.getenv("GOOGLE_MAPS_API_KEY")
place_query = "Space Needle,Seattle WA"

# Safely replace space with '+' for URL encoding
encoded_query = place_query.replace(" ", "+")

# Generate the iframe string
iframe_html = f"""
<iframe
  width="600"
  height="450"
  style="border:0"
  loading="lazy"
  allowfullscreen
  referrerpolicy="strict-origin-when-cross-origin"
  src="https://www.google.com/maps/embed/v1/place?key={api_key}&q={encoded_query}">
</iframe>
"""

print(iframe_html)
