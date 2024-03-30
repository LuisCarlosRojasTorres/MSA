from flask import Flask, jsonify, make_response, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
HOST = "localhost"
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
{
"id": 3,
"name": "Restaurant3",
"address": {
    "postalCode":"111",
    "streetAddress":"Rua Tres número 3333",
    "addressLocality":"Cidade1",
    "addressRegion":"Region1",
    "addressCountry":"Country1",
},
"url": "www.rest3.com.br",
"menu": "www.rest3.com.br/menu",
"telephone": "333-3333",
"priceRange": "$$33-333"
},
{
"id": 4,
"name": "Restaurant4",
"address": {
    "postalCode":"444",
    "streetAddress":"Rua Quatro número 4444",
    "addressLocality":"Cidade4",
    "addressRegion":"Region4",
    "addressCountry":"Country4",
},
"url": "www.rest4.com.br",
"menu": "www.rest4.com.br/menu",
"telephone": "444-4444",
"priceRange": "$$44-444"
},
]

@app.route('/')
def index():
    return "Trabalho N2! Arquitetura de Microserviços"

@app.route("/todo/api/restaurants", methods=["GET"])
def get_restaurants():
    city = request.args.get("addressLocality")
    if city is None:
        return jsonify(restaurantsList)
    else:
        print(" - City: " + city)
        ans = list()
        for restaurant in restaurantsList:
            if restaurant["address"]["addressLocality"] == city:
                ans.append(restaurant)
            
        if len(restaurant) == 0:
            return not_found()
        return jsonify({"Restaurant selected by address new way": ans})

        

    #print("get_restaurants()")
    #return jsonify({"Lista de Restaurants": restaurantsList})

@app.route("/todo/api/restaurants/<int:restaurant_id>", methods=["GET"])
def get_restaurant_by_index(restaurant_id):
    print("get_restaurant_by_index")
    try:
        id = int(restaurant_id)
        restaurant = restaurantsList[id]
        if len(restaurant) == 0:
            return not_found()
        return jsonify(restaurant)
    except (ValueError, TypeError):
        return not_found()

@app.route("/todo/api/restaurants/<restaurant_addr>", methods=["GET"])
def get_restaurant_by_City(restaurant_addr):
    print("get_restaurant_by_City")
    ans = list()
    for restaurant in restaurantsList:
        if restaurant["address"]["addressLocality"] == restaurant_addr:
            ans.append(restaurant)
            
    if len(restaurant) == 0 or len(ans) == 0:
        return not_found()
    return jsonify(ans)

@app.route("/todo/api/restaurants/cities", methods=["GET"])
def get_AllCities():
    ans = list()
    for restaurant in restaurantsList:
        if restaurant["address"]["addressLocality"] not in ans:
            print(" - City:" + restaurant["address"]["addressLocality"])
            ans.append(restaurant["address"]["addressLocality"])
            
    if len(ans) == 0:
        return not_found()
    ans.sort()
    return jsonify({"cities": ans})

@app.errorhandler(404)
def not_found():
    return make_response(jsonify({"error": "Restaurant não encontrado!"}), 404)

@app.errorhandler(400)
def bad_request(field):
    return make_response(jsonify({"error": "O {} é mandatório!".format(field)}), 400)

@app.route("/todo/api/restaurants", methods=["POST"])
def create_restaurant():
    if not request.json or not "name" in request.json or not request.json["name"]:
        return bad_request("Nome")
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
    return jsonify(newRestaurant), 201

@app.route("/todo/api/restaurants/<int:restaurant_id>", methods=["PUT"])
def update_restaurant(restaurant_id):
    restaurant = [restaurant for restaurant in restaurantsList if restaurant["id"] == restaurant_id]
    if len(restaurant) == 0:
        return not_found()
    if not request.json or not "name" in request.json:
        return bad_request("Name")
    if "name" in request.json and type(request.json["name"]) != str:
        return bad_request("Name")
    if "address" in request.json and type(request.json["address"]) != dict:
        return bad_request("Address")
    if "url" in request.json and type(request.json["url"]) is not str:
        return bad_request("URL")
    if "menu" in request.json and type(request.json["menu"]) is not str:
        return bad_request("Menu")
    if "telephone" in request.json and type(request.json["telephone"]) is not str:
        return bad_request("Telephone")
    if "priceRange" in request.json and type(request.json["priceRange"]) is not str:
        return bad_request("Price Range")

    restaurant[0]["name"] = request.json.get("name", restaurant[0]["name"])
    restaurant[0]["address"] = request.json.get("address", restaurant[0]["address"])
    restaurant[0]["url"] = request.json.get("url", restaurant[0]["url"])
    restaurant[0]["menu"] = request.json.get("menu", restaurant[0]["menu"])
    restaurant[0]["telephone"] = request.json.get("telephone", restaurant[0]["telephone"])
    restaurant[0]["priceRange"] = request.json.get("priceRange", restaurant[0]["priceRange"])
    
    return jsonify(restaurant[0])

@app.route("/todo/api/restaurants/<int:restaurants_id>", methods=["DELETE"])
def delete_restaurants(restaurants_id):
    restaurants = [restaurants for restaurants in restaurantsList if restaurants["id"] == restaurants_id]
    if len(restaurants) == 0:
        return not_found()
    restaurantsList.remove(restaurants[0])
    return jsonify({"Result Of Deletion by Id": True})

if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=True)
    app.register_error_handler(400, bad_request)
    app.register_error_handler(404, not_found)