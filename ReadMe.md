# Arquitetura de Serviços - Trabalho 2

<!-- vscode-markdown-toc -->
* 1. [ Questões conceituais](#Questesconceituais)
* 2. [ Questões práticas](#Questesprticas)
* 3. [ Anexo](#Anexo)

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

##  1. <a name='Questesconceituais'></a> Questões conceituais
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

##  2. <a name='Questesprticas'></a> Questões práticas

1. (TODO) Modele a estrutura dos dados providos pelo serviço, por exemplo, um modelo Entidade-Relacionamento ou um modelo de classes UML.
- Class Diagram
![UML Diagram](/images/UMLClassDiagram.png)
  
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

   - [x] Consultar restaurante pelos atributos do endereço, por exemplo, consultar pela cidade retornando os restaurantes existentes na cidade:
	``` py
    @app.route("/todo/api/restaurants/<restaurant_addr>", methods=["GET"])
    def get_restaurant_by_City(restaurant_addr):
        ans = list()
        for restaurant in restaurantsList:
            if restaurant["address"]["addressLocality"] == restaurant_addr:
                ans.append(restaurant)
            
        if len(restaurant) == 0:
            abort(404)
        return jsonify({"Restaurant selected by addressLocality": ans})
	```
     - Output no navegador:  
    ![Restaurant By City](/images/GetByCity.png)      

   - [x] Atualizar restaurante, por exemplo, atualizar o endereço do restaurante:
	``` py
    @app.route("/todo/api/restaurants/<int:restaurant_id>", methods=["PUT"])
    def update_restaurant(restaurant_id):
        restaurant = [restaurant for restaurant in restaurantsList if restaurant["id"] == restaurant_id]
        if len(restaurant) == 0:
            abort(404)
        if not request.json or not "name" in request.json:
            abort(400)
        if "name" in request.json and type(request.json["name"]) != str:
            abort(400)
        if "address" in request.json and type(request.json["address"]) != dict:
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
     - Lista de Restaurantes antes del PUT:  
     ![Lista de Restaurantes](/images/PUT01.png)
     - PUT em Postman:  
     ![PUT in Postman](/images/PUT02.png)
     - Lista de Restaurantes después del PUT:  
     ![Lista de Restaurantes](/images/PUT03.png)

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
    
3. Opcional Utilize um banco de dados para armazenar os dados.

``` py
def HandleDatabase(id):
	#Insert Code HERE	
	return
```
4. Implemente um cliente (por exemplo, um script em Python usando a biblioteca requests) que invoque este serviço simulando operações para inserção, consulta, atualização e remoção.
    - Métodos `GET` :
    ``` python
    import requests

    SERVICE_HOST = 'localhost'
    SERVICE_HOST_PORT='4999'
    SERVICE_STUDENT_PATH = '/todo/api/restaurants'

    def get_endpoint():
        return 'http://'+ SERVICE_HOST+':'+SERVICE_HOST_PORT

    def get_restaurants():
        response = requests.get(get_endpoint()+SERVICE_STUDENT_PATH)
        if response.json:
            print(response.json())

    def get_restaurants_by_Id(restaurant_id):
        response = requests.get(get_endpoint()+SERVICE_STUDENT_PATH+'/'+str(restaurant_id))
        if response.json:
            print(response.json())

    def get_restaurants_by_City(restaurant_addr):
        response = requests.get(get_endpoint()+SERVICE_STUDENT_PATH+'/'+str(restaurant_addr))
        if response.json:
            print(response.json())

    print("------------------------------------")
    get_restaurants()
    print("------------------------------------")
    get_restaurants_by_Id(3)
    print("------------------------------------")
    get_restaurants_by_City("Cidade1")
    ```
    - Métodos `DELETE`:
    ``` python
    def delete_restaurants(restaurant_id):
        response = requests.delete(get_endpoint()+SERVICE_STUDENT_PATH+'/'+str(restaurant_id))
        if response.json:
            print(response.json())
    
    print("------------------------------------")
    delete_restaurants(3)
    ```
    - Métodos `POST`:
    ``` python
    def post_restaurants(dummy_json):
        response = requests.post(get_endpoint()+SERVICE_STUDENT_PATH, json=dummy_json)
        if response.json:
            print(response.json())

    post_dummy_json = {
    "name": "Restaurant3",
    "address": {
    "postalCode":"111",
    "streetAddress":"Rua Tres número 3333",
    "addressLocality":"Cidade1",
    "addressRegion":"Region1",
    "addressCountry":"Country1"
    },
    "url": "www.rest3.com.br",
    "menu": "www.rest3.com.br/menu",
    "telephone": "333-3333",
    "priceRange": "$$33-333"
    }
    print("------------------------------------")
    post_restaurants(post_dummy_json)   
    ```
    - Métodos `PUT`:
    ``` python
    def put_restaurants(dummy_json, restaurant_id):
        response = requests.put(get_endpoint()+SERVICE_STUDENT_PATH+'/'+str(restaurant_id), json=dummy_json)
        if response.json:
            print(response.json())

    put_dummy_json = {
    "name": "Restaurant3",
    "address": {
        "postalCode":"111",
        "streetAddress":"Rua Tres número 3333",
        "addressLocality":"Cidade1",
        "addressRegion":"Region1",
        "addressCountry":"Country1"
    },
    "url": "www.new-rest3.com.br",
    "menu": "www.new-rest3.com.br/menu",
    "telephone": "333-0000",
    "priceRange": "$$44-4444"
    }
    print("------------------------------------")
    put_restaurants(put_dummy_json,5)  
    ``` 
##  3. <a name='Anexo'></a> Anexo

- Codigo completo do Server-side:

``` python
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
    return jsonify({"Lista de Restaurants": restaurantsList})

@app.route("/todo/api/restaurants/<int:restaurant_id>", methods=["GET"])
def get_restaurant_by_index(restaurant_id):
    restaurant = [restaurant for restaurant in restaurantsList if restaurant["id"] == restaurant_id]
    if len(restaurant) == 0:
        abort(404)
    return jsonify({"Restaurant selected by Id": restaurant[0]})

@app.route("/todo/api/restaurants/<restaurant_addr>", methods=["GET"])
def get_restaurant_by_City(restaurant_addr):
    ans = list()
    for restaurant in restaurantsList:
        if restaurant["address"]["addressLocality"] == restaurant_addr:
            ans.append(restaurant)
            
    if len(restaurant) == 0:
        abort(404)
    return jsonify({"Restaurant selected by addressLocality": ans})

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({"error": "Restaurant Not found!"}), 404)

@app.route("/todo/api/restaurants", methods=["POST"])
def create_restaurant():
    if not request.json or not "name" in request.json:
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
def update_restaurant(restaurant_id):
    restaurant = [restaurant for restaurant in restaurantsList if restaurant["id"] == restaurant_id]
    if len(restaurant) == 0:
        abort(404)
    if not request.json or not "name" in request.json:
        abort(400)
    if "name" in request.json and type(request.json["name"]) != str:
        abort(400)
    if "address" in request.json and type(request.json["address"]) != dict:
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
```

- Codigo Completo do Client-side:
``` python
import requests

SERVICE_HOST = 'localhost'
SERVICE_HOST_PORT='4999'
SERVICE_STUDENT_PATH = '/todo/api/restaurants'

def get_endpoint():
    return 'http://'+ SERVICE_HOST+':'+SERVICE_HOST_PORT

def get_restaurants():
    response = requests.get(get_endpoint()+SERVICE_STUDENT_PATH)
    if response.json:
        print(response.json())

def get_restaurants_by_Id(restaurant_id):
    response = requests.get(get_endpoint()+SERVICE_STUDENT_PATH+'/'+str(restaurant_id))
    if response.json:
        print(response.json())

def get_restaurants_by_City(restaurant_addr):
    response = requests.get(get_endpoint()+SERVICE_STUDENT_PATH+'/'+str(restaurant_addr))
    if response.json:
        print(response.json())

def delete_restaurants(restaurant_id):
    response = requests.delete(get_endpoint()+SERVICE_STUDENT_PATH+'/'+str(restaurant_id))
    if response.json:
        print(response.json())

def post_restaurants(dummy_json):
    response = requests.post(get_endpoint()+SERVICE_STUDENT_PATH, json=dummy_json)
    if response.json:
        print(response.json())        

def put_restaurants(dummy_json, restaurant_id):
    response = requests.put(get_endpoint()+SERVICE_STUDENT_PATH+'/'+str(restaurant_id), json=dummy_json)
    if response.json:
        print(response.json())        

print("------------------------------------")
get_restaurants()
print("------------------------------------")
get_restaurants(3)
print("------------------------------------")
get_restaurants_by_City("Cidade1")
print("------------------------------------")
delete_restaurants(3)
print("------------------------------------")
get_restaurants()
print("------------------------------------")
post_dummy_json = {
"name": "Restaurant3",
"address": {
    "postalCode":"111",
    "streetAddress":"Rua Tres número 3333",
    "addressLocality":"Cidade1",
    "addressRegion":"Region1",
    "addressCountry":"Country1"
},
"url": "www.rest3.com.br",
"menu": "www.rest3.com.br/menu",
"telephone": "333-3333",
"priceRange": "$$33-333"
}
post_restaurants(post_dummy_json)
print("------------------------------------")
put_dummy_json = {
"name": "Restaurant3",
"address": {
    "postalCode":"111",
    "streetAddress":"Rua Tres número 3333",
    "addressLocality":"Cidade1",
    "addressRegion":"Region1",
    "addressCountry":"Country1"
},
"url": "www.new-rest3.com.br",
"menu": "www.new-rest3.com.br/menu",
"telephone": "333-0000",
"priceRange": "$$44-4444"
}
put_restaurants(put_dummy_json,5)
```