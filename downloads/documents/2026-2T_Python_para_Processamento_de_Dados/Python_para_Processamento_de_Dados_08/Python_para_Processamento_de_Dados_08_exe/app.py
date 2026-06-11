from flask import Flask, jsonify, request

app = Flask(__name__)

# In-memory data store
data_store = [
    {"id": 1, "name": "Item One"},
    {"id": 2, "name": "Item Two"}
]

@app.route('/items', methods=['GET'])
def get_items():
    return jsonify({"items": data_store}), 200

@app.route('/items', methods=['POST'])
def add_item():
    new_item = request.get_json()
    if not new_item or 'name' not in new_item:
        return jsonify({"error": "Bad Request", "message": "Missing 'name' field"}), 400
    
    new_item['id'] = len(data_store) + 1
    data_store.append(new_item)
    return jsonify(new_item), 201

if __name__ == '__main__':
    # host='0.0.0.0' allows external traffic to reach the app inside the container
    app.run(host='0.0.0.0', port=5000)