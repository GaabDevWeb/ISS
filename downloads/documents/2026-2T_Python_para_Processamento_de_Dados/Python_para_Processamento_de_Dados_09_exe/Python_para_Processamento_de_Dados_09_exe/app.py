import os
from flask import Flask, request, jsonify
from anthropic import Anthropic
from google import genai
from openai import OpenAI

app    = Flask(__name__)
claude_client = Anthropic(api_key="API_KEY")
gemini_client = genai.Client(api_key="API_KEY")
openai_client = OpenAI(api_key="API_KEY")

@app.route("/chat_with_claude", methods=["POST"])
def chat_with_claude():
    body     = request.get_json()
    pergunta = body.get("pergunta", "")

    resposta = claude_client.messages.create(
        model      = "claude-opus-4-6",
        max_tokens = 1024,
        messages   = [{"role": "user", "content": pergunta}]
    )

    return jsonify({
        "resposta": resposta.content[0].text,
        "modelo":   resposta.model,
        "tokens":   resposta.usage.input_tokens + resposta.usage.output_tokens
    })

@app.route("/chat_with_gemini", methods=["POST"])
def chat_with_gemini():
    body     = request.get_json()
    pergunta = body.get("pergunta", "")

    resposta = gemini_client.models.generate_content(
        model="gemini-3.5-flash",
        contents=pergunta
    )

    return jsonify({
        "resposta": resposta.text
    })

@app.route("/chat_with_openai", methods=["POST"])
def chat_with_openai():
    body     = request.get_json()
    pergunta = body.get("pergunta", "")

    resposta = openai_client.responses.create(
        model="gpt-5.5",
        input=pergunta
    )

    return jsonify({
        "resposta": resposta.output_text
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)