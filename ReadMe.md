# Arquitetura de Serviços - Trabalho 2

<!-- vscode-markdown-toc -->
* 1. [Questões conceituais](#Questesconceituais)
* 2. [Questões práticas](#Questesprticas)
* 3. [Anexo](#Anexo)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->
Professor: Leonardo Guerreiro Azevedo
Integrantes: 
- Breno Rage Aboud
- Wesley Santos da Silva
- Luis Carlos Rojas Torres

##  1. <a name='Questesconceituais'></a>Questões conceituais
1. Defina serviço RESTful.
	- Rpta...
2. Liste e explique os quatro principais princípios de serviços RESTful
	- Usar os métodos HTTP explicitamente
		- Rpta...
	- Ser sem estado (stateless)
		- Rpta...
	- Expor URIs como estrutura de diretórios
		- Rpta...
	- Transferir XML, JSON (JavaScript Object Notation) ou ambos
		- Rpta...
3. Apresente as diferenças entre serviços Web SOAP (ou serviço Web WS) e serviços Web RESTful
	- Rpta...
4. Na opinião do grupo, qual tipo de serviço é mais fácil e rápido de implementar? Justifique.
	- Rpta...

##  2. <a name='Questesprticas'></a>Questões práticas

1. Modele a estrutura dos dados providos pelo serviço, por exemplo, um modelo Entidade-Relacionamento ou um modelo de classes UML.
2. Implemente um serviço Web RESTful com operações para:
   - [x] Inserir um restaurante:
    ``` py
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
	```
     - Post in Postman:  
     ![Post in Postman](/images/PostRestaurant2.png)
     - Output no navegador:  
     ![Output](/images/PostRestaurant.png)

   - [x] Retornar todos os restaurantes:
	``` py
	@app.route("/todo/api/restaurants", methods=["GET"])
    def get_restaurants():
        return jsonify({"List of Restaurants": restaurantsList})
	```
     - Output no navegador:  
     ![Lista de Restaurantes](/images/ListOfRestaurants.png)

   - [x] Retornar um restaurante pelo `id`:
	``` py
    @app.route("/todo/api/restaurants/<int:restaurant_id>", methods=["GET"])
    def get_restaurant_by_index(restaurant_id):
        restaurant = [restaurant for restaurant in restaurantsList if restaurant["id"] == restaurant_id]
        if len(restaurant) == 0:
            abort(404)
        return jsonify({"restaurant selected by Id": restaurant[0]})
	```
     - Output no navegador:  
    ![Restaurant By Index](/images/RestaurantByIndex.png)

   - [ ] Consultar restaurante pelos atributos do endereço, por exemplo, consultar pela cidade retornando os restaurantes existentes na cidade:
	``` py
	def GetRestaurant(cidade):
		#Insert Code HERE
		return
	```
   - [ ] Atualizar restaurante, por exemplo, atualizar o endereço do restaurante:
	``` py
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
	```
   - [x] Apagar um restaurante pelo seu `id`
	``` py
    @app.route("/todo/api/restaurants/<int:restaurants_id>", methods=["DELETE"])
    def delete_restaurants(restaurants_id):
        restaurants = [restaurants for restaurants in restaurantsList if restaurants["id"] == restaurants_id]
        if len(restaurants) == 0:
            abort(404)
        restaurantsList.remove(restaurants[0])
        return jsonify({"Result Of Deletion by Id": True})
	```
     - Post in Postman:  
     ![Deleted in Postman](/images/Delete1.png)
     - Output in Postman:  
     ![Output](/images/Delete2.png)
     - Output no navegador:  
     ![Output](/images/Delete3.png)
    
3. Opcional - Utilize um banco de dados para armazenar os dados.
``` py
def HandleDatabase(id):
	#Insert Code HERE	
	return
```
1. Implemente um cliente (por exemplo, um script em Python usando a biblioteca requests) que invoque este serviço simulando operações para inserção, consulta, atualização e remoção.

``` py
import requests

SERVICE_HOST = 'localhost'
SERVICE_HOST_PORT='5000'
SERVICE_RESTAURANT_PATH = '/todo/api/restaurants'

def get_endpoint():
    return 'http://'+ SERVICE_HOST+':'+SERVICE_HOST_PORT

def get_restaurants():
    response = requests.get(get_endpoint()+SERVICE_RESTAURANT_PATH)
    if response.json:
        print(response.json())

def get_restaurants(task_id):
    response = requests.get(get_endpoint()+SERVICE_RESTAURANT_PATH+'/'+str(task_id))
    if response.json:
        print(response.json())

#Insert Code HERE...
```

##  3. <a name='Anexo'></a>Anexo
Codigo do backend:

``` python
from flask import Flask, jsonify, abort, make_response, request
#Codigo utilizado na aula


app = Flask(__name__)
HOST = "0.0.0.0"
PORT = 4999
tasks = [
{
"id": 1,
"title": "Buy groceries",
"description": "Milk, Cheese, Pizza, Fruit, Tyleno",
"done": False
},
{
"id": 2,
"title": "Learn Python",
"description": "Need to find a good Python tutorial on the Web",
"done": False
}
]

@app.route('/')
def index():
    return "Hello, World!"

@app.route("/todo/api/tasks", methods=["GET"])
def get_tasks():
    return jsonify({"tasks": tasks})

@app.route("/todo/api/tasks/<int:task_id>", methods=["GET"])
def get_task(task_id):
    task = [task for task in tasks if task["id"] == task_id]
    if len(task) == 0:
        abort(404)
    return jsonify({"task": task[0]})

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({"error": "Not found"}), 404)

@app.route("/todo/api/tasks", methods=["POST"])
def create_task():
    if not request.json or not "title" in request.json:
        abort(400)
    task = {
            "id": tasks[-1]["id"] + 1,
            "title": request.json["title"],
            "description": request.json.get("description", ""),
            "done": False
        }
    tasks.append(task)
    return jsonify({"task": task}), 201

@app.route("/todo/api/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    task = [task for task in tasks if task["id"] == task_id]
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

if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=True)
```
