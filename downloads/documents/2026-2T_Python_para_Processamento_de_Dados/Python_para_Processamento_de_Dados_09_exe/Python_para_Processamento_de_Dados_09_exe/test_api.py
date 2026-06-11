import requests

BASE = "<SERVER_URL>"

r = requests.post(f"{BASE}/chat_with_claude", json={
    "pergunta": "Quais as caracteristicas do Python?"
})

print(r.status_code)
print(r.json()["resposta"])