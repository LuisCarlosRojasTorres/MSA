from flask import Flask, jsonify, abort, make_response, request

app = Flask(__name__)
HOST = "0.0.0.0"
PORT = 4999

restaurantsList = [
{
"id": 1,
"name": "Restaurant1",
"address": {
    "postalCode":"111",
    "streetAddress":"Rua Um número 1111",
    "addressLocality":"Cidade1",
    "addressRegion":"Region1",
    "addressCountry":"Country1",
},
"url": "www.rest1.com.br",
"menu": "www.rest1.com.br/menu",
"telephone": "111-1111",
"priceRange": "$$11-111"
},
{
"id": 2,
"name": "Restaurant2",
"address": {
    "postalCode":"222",
    "streetAddress":"Rua Dois número 2222",
    "addressLocality":"Cidade2",
    "addressRegion":"Region2",
    "addressCountry":"Country2",
},
"url": "www.rest2.com.br",
"menu": "www.rest2.com.br/menu",
"telephone": "222-2222",
"priceRange": "$$22-222"
},
]

@app.route('/')
def index():
    return "Trabalho N2!"

@app.route("/todo/api/restaurants", methods=["GET"])
def get_restaurants():
    return jsonify({"List of Restaurants": restaurantsList})

@app.route("/todo/api/restaurants/<int:restaurant_id>", methods=["GET"])
def get_restaurant_by_index(restaurant_id):
    restaurant = [restaurant for restaurant in restaurantsList if restaurant["id"] == restaurant_id]
    if len(restaurant) == 0:
        abort(404)
    return jsonify({"restaurant selected by Id": restaurant[0]})

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({"error": "Not found"}), 404)

@app.route("/todo/api/restaurants", methods=["POST"])
def create_task():
    if not request.json or not "title" in request.json:
        abort(400)
    task = {
            "id": restaurantsList[-1]["id"] + 1,
            "title": request.json["title"],
            "description": request.json.get("description", ""),
            "done": False
        }
    restaurantsList.append(task)
    return jsonify({"task": task}), 201

@app.route("/todo/api/restaurants/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    task = [task for task in restaurantsList if task["id"] == task_id]
    if len(task) == 0:
        abort(404)
    if not request.json:
        abort(400)
    if "title" in request.json and type(request.json["title"]) != str:
        abort(400)
    if "description" in request.json and type(request.json["description"]) is not str:
        abort(400)
    if "done" in request.json and type(request.json["done"]) is not bool:
        abort(400)
    task[0]["title"] = request.json.get("title", task[0]["title"])
    task[0]["description"] = request.json.get("description", task[0]["description"])
    task[0]["done"] = request.json.get("done", task[0]["done"])
    return jsonify({"task": task[0]})

@app.route("/todo/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = [task for task in restaurantsList if task["id"] == task_id]
    if len(task) == 0:
        abort(404)
    restaurantsList.remove(task[0])
    return jsonify({"result": True})

if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=True)