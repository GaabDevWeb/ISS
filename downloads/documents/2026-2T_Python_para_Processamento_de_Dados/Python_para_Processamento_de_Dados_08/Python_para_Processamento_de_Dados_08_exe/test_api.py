import requests

BASE_URL = "http://localhost:5000/items"

# 1. Test GET request
print("--- Testing GET ---")
response = requests.get(BASE_URL)
print(f"Status Code: {response.status_code}")
print(f"Response JSON: {response.json()}\n")

# 2. Test POST request
print("--- Testing POST ---")
payload = {"name": "Item Three"}
response = requests.post(BASE_URL, json=payload)
print(f"Status Code: {response.status_code}")
print(f"Response JSON: {response.json()}\n")

# 3. Test GET again to confirm item was added
print("--- Testing GET (After POST) ---")
response = requests.get(BASE_URL)
print(f"Response JSON: {response.json()}")