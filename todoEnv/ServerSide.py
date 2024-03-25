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
    newRestaurant = {
            "id": restaurantsList[-1]["id"] + 1,
            "name": request.json["name"],
            "address": request.json.get("address", ""),
            "url": request.json.get("url", ""),
            "menu": request.json.get("menu", ""),
            "telephone": request.json.get("telephone", ""),
            "priceRange": request.json.get("priceRange", ""),
        }
    restaurantsList.append(newRestaurant)
    return jsonify({"Created Restaurant": newRestaurant}), 201

@app.route("/todo/api/restaurants/<int:restaurant_id>", methods=["PUT"])
def update_task(restaurant_id):
    restaurant = [restaurant for restaurant in restaurant if restaurant["id"] == restaurant_id]
    if len(restaurant) == 0:
        abort(404)
    if not request.json:
        abort(400)
    if "name" in request.json and type(request.json["name"]) != str:
        abort(400)
    if "address" in request.json and type(request.json["address"]) is not str:
        abort(400)
    if "url" in request.json and type(request.json["url"]) is not str:
        abort(400)
    if "menu" in request.json and type(request.json["menu"]) is not str:
        abort(400)
    if "telephone" in request.json and type(request.json["telephone"]) is not str:
        abort(400)
    if "priceRange" in request.json and type(request.json["priceRange"]) is not str:
        abort(400)

    restaurant[0]["name"] = request.json.get("name", restaurant[0]["name"])
    restaurant[0]["address"] = request.json.get("address", restaurant[0]["address"])
    restaurant[0]["url"] = request.json.get("url", restaurant[0]["url"])
    restaurant[0]["menu"] = request.json.get("menu", restaurant[0]["menu"])
    restaurant[0]["telephone"] = request.json.get("telephone", restaurant[0]["telephone"])
    restaurant[0]["priceRange"] = request.json.get("priceRange", restaurant[0]["priceRange"])
    
    return jsonify({"Updated restaurant": restaurant[0]})

@app.route("/todo/api/restaurants/<int:restaurants_id>", methods=["DELETE"])
def delete_restaurants(restaurants_id):
    restaurants = [restaurants for restaurants in restaurantsList if restaurants["id"] == restaurants_id]
    if len(restaurants) == 0:
        abort(404)
    restaurantsList.remove(restaurants[0])
    return jsonify({"Result Of Deletion by Id": True})

if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=True)