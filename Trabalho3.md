# Arquitetura de Serviços - Trabalho 3

<!-- vscode-markdown-toc -->
* 1. [ Questões conceituais](#Questesconceituais)
* 2. [ Questões práticas](#Questesprticas)
	* 2.1. [Solução](#Soluo)
		* 2.1.1. [Inserir um restaurante](#Inserirumrestaurante)
		* 2.1.2. [Retornar todos os restaurantes](#Retornartodososrestaurantes)
		* 2.1.3. [Retornar um restaurante pelo `id`](#Retornarumrestaurantepeloid)
		* 2.1.4. [Consultar restaurante pelos atributos do endereço, por exemplo, consultar pela cidade retornando os restaurantes existentes na cidade](#Consultarrestaurantepelosatributosdoendereoporexemploconsultarpelacidaderetornandoosrestaurantesexistentesnacidade)
		* 2.1.5. [Atualizar restaurante, por exemplo, atualizar o endereço do restaurante](#Atualizarrestauranteporexemploatualizaroendereodorestaurante)
		* 2.1.6. [Apagar um restaurante pelo seu `id`](#Apagarumrestaurantepeloseuid)		
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
- Álvaro Jr

NOTA: O repositorio deste trabalho se encontra em `https://github.com/LuisCarlosRojasTorres/MSA/blob/main/ReadMe.md` [LINK](https://github.com/LuisCarlosRojasTorres/MSA/blob/main/ReadMe.md)

##  1. <a name='Questesconceituais'></a> Questões conceituais

**1. Defina especificação OpenAPI.**
- TODO...

**2. Qual a vantagem de se especificar o contrato de um serviço**
- TODO...

##  2. <a name='Questesprticas'></a> Questões práticas
- Elabore o contrato OpenAPI para o serviço web RESTful referente a tarefa de implementação de serviços RESTful. Considere a especificação do contrato para os endpoints do serviço e para os respectivos esquemas:
   - Inserir um restaurante
   - Retornar todos os restaurantes:
   - Retornar um restaurante pelo `id`
   - Consultar restaurante pelos atributos do endereço, por exemplo, consultar pela cidade retornando os restaurantes existentes na cidade
   - Atualizar restaurante, por exemplo, atualizar o endereço do restaurante
   - Apagar um restaurante pelo seu `id`
- Inclua os seguintes itens na sua resposta a esta tarefa:
   - Especificação OpenAPI do serviço em formato YAML e em formato JSON.
   - Explicação dos passos utilizados para elaborar o contrato.
   - Printscreen da especificação no Swagger Editor.
   - Printscreen da execução do serviço empregando o Swagger Editor.

###  2.1. <a name='Soluo'></a>Solução
- Para apresentar a solução deste trabalho se utilizara a seguinte data (também utilizada no trabalho anterior):
  
![](/images/Restaurants.png)

- Esta data convertida no formato json ficaria da seguinte forma:
``` python 
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
"telephone": "11 11111-1111",
"priceRange": "$$"
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
"telephone": "22 22222-2222",
"priceRange": "$$$"
},
{
"id": 3,
"name": "Restaurant3",
"address": {
    "postalCode":"111",
    "streetAddress":"Rua Um número 3333",
    "addressLocality":"Cidade1",
    "addressRegion":"Region3",
    "addressCountry":"Country3",
},
"url": "www.rest3.com.br",
"menu": "www.rest3.com.br/menu",
"telephone": "33 33333-3333",
"priceRange": "$$$$"
}
]
```

Por outro lado, precisa-se definir os `schemas` para facilitar a definição das interfaces.
``` yaml
components:
  schemas:
    Restaurants:
      type: object
      properties:
        id:
          type: integer
          example: 1
        name:
          type: string
          example: "Restaurant DummyName"
        address:
            $ref: '#/components/schemas/Address'  
        url:
          type: string
          example: "www.dummy-restaurant1.com.br"
        menu:
          type: string
          example: "Region1"
        telephone:
          type: string
          example: "XX XXXXX-XXXX"
        priceRange:
          type: string
          example: "$$"
      xml:
        name: restaurants
    Address:
      type: object
      properties:
        postalCode:
          type: string
          example: "111"
        streetAddress:
          type: string
          example: "Rua Um número 1111"
        addressLocality:
          type: string
          example: "Cidade1"
        addressRegion:
          type: string
          example: "Region1"
        addressCountry:
          type: string
          example: "Country1"
      xml:
        name: address
```

####  2.1.1. <a name='Inserirumrestaurante'></a>Inserir um restaurante

##### Especificação OpenAPI do serviço em formato YAML e em formato JSON
- TODO ...
##### Explicação dos passos utilizados para elaborar o contrato
- TODO...

##### Printscreen da especificação no Swagger Editor
- TODO...

##### Printscreen da execução do serviço empregando o Swagger Editor
- TODO...

####  2.1.2. <a name='Retornartodososrestaurantes'></a>Retornar todos os restaurantes

##### Especificação OpenAPI do serviço em formato YAML e em formato JSON
- YAML:
``` yaml
  /restaurants:
    get:
      tags:
        - restaurants
      description: Get a list of all the restaurants
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Restaurants'   
        '400':
          description: Invalid ID supplied
```
- JSON:
``` json
"/restaurants": {
      "get": {
        "tags": [
          "restaurants"
        ],
        "description": "Get a list of all the restaurants",
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Restaurants"
                }
              }
            }
          },
          "400": {
            "description": "Invalid ID supplied"
          }
        }
      }
    },
```

##### Explicação dos passos utilizados para elaborar o contrato
- TODO...

##### Printscreen da especificação no Swagger Editor
- TODO...
![](/images/T3-Implementation.png)

##### Printscreen da execução do serviço empregando o Swagger Editor
- TODO...
![](/images/T3-Pergunta.png)
- TODO...
![](/images/T3-Resposta.png)

####  2.1.3. <a name='Retornarumrestaurantepeloid'></a>Retornar um restaurante pelo `id`

##### Especificação OpenAPI do serviço em formato YAML e em formato JSON
- TODO...

##### Explicação dos passos utilizados para elaborar o contrato
- TODO...

##### Printscreen da especificação no Swagger Editor
- TODO...

##### Printscreen da execução do serviço empregando o Swagger Editor
- TODO...

####  2.1.4. <a name='Consultarrestaurantepelosatributosdoendereoporexemploconsultarpelacidaderetornandoosrestaurantesexistentesnacidade'></a>Consultar restaurante pelos atributos do endereço, por exemplo, consultar pela cidade retornando os restaurantes existentes na cidade

##### Especificação OpenAPI do serviço em formato YAML e em formato JSON
- TODO...

##### Explicação dos passos utilizados para elaborar o contrato
- TODO...

##### Printscreen da especificação no Swagger Editor
- TODO...

##### Printscreen da execução do serviço empregando o Swagger Editor
- TODO...

####  2.1.5. <a name='Atualizarrestauranteporexemploatualizaroendereodorestaurante'></a>Atualizar restaurante, por exemplo, atualizar o endereço do restaurante

##### Especificação OpenAPI do serviço em formato YAML e em formato JSON
- TODO...

##### Explicação dos passos utilizados para elaborar o contrato
- TODO...

##### Printscreen da especificação no Swagger Editor
- TODO...

##### Printscreen da execução do serviço empregando o Swagger Editor
- TODO...

####  2.1.6. <a name='Apagarumrestaurantepeloseuid'></a>Apagar um restaurante pelo seu `id`

##### Especificação OpenAPI do serviço em formato YAML e em formato JSON
- TODO...

##### Explicação dos passos utilizados para elaborar o contrato
- TODO...

##### Printscreen da especificação no Swagger Editor
- TODO...

##### Printscreen da execução do serviço empregando o Swagger Editor
- TODO...

##  3. <a name='Anexo'></a> Anexo

- Codigo completo do Server-side:

``` python
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, origins=['http://localhost:8000'], always_send=False)
HOST = "localhost"
PORT = 5000

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
"telephone": "11 11111-1111",
"priceRange": "$$"
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
"telephone": "22 22222-2222",
"priceRange": "$$$"
},
{
"id": 3,
"name": "Restaurant3",
"address": {
    "postalCode":"111",
    "streetAddress":"Rua Um número 3333",
    "addressLocality":"Cidade1",
    "addressRegion":"Region3",
    "addressCountry":"Country3",
},
"url": "www.rest3.com.br",
"menu": "www.rest3.com.br/menu",
"telephone": "33 33333-3333",
"priceRange": "$$$$"
}
]

@app.route('/')
def index():
    return "Trabalho N2! Arquitetura de Microserviços"

@app.route("/api/restaurants", methods=["GET"])
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

@app.route("/api/restaurants/<int:restaurant_id>", methods=["GET"])
def get_restaurant_by_index(restaurant_id):
    print("get_restaurant_by_index")
    try:
        id = int(restaurant_id)
        for restaurant in restaurantsList:
            if restaurant["id"] == id:
                if len(restaurant) == 0:
                    return not_found()
                return jsonify(restaurant)
        return not_found()
    except (ValueError, TypeError):
        return not_found()

@app.route("/api/restaurants/<restaurant_addr>", methods=["GET"])
def get_restaurant_by_City(restaurant_addr):
    print("get_restaurant_by_City")
    ans = list()
    for restaurant in restaurantsList:
        if restaurant["address"]["addressLocality"] == restaurant_addr:
            ans.append(restaurant)
            
    if len(restaurant) == 0 or len(ans) == 0:
        return not_found()
    return jsonify(ans)

@app.route("/api/restaurants/cities", methods=["GET"])
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
    return make_response(jsonify({"error": "Restaurante não encontrado!"}), 404)

@app.errorhandler(400)
def bad_request(field):
    return make_response(jsonify({"error": "O {} é mandatório!".format(field)}), 400)

@app.route("/api/restaurants", methods=["POST"])
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

@app.route("/api/restaurants/<int:restaurant_id>", methods=["PUT", "OPTIONS"])
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

@app.route("/api/restaurants/<int:restaurant_id>", methods=["DELETE"])
def delete_restaurants(restaurant_id):
    try:
        id = int(restaurant_id)
        for restaurant in restaurantsList:
            if restaurant["id"] == id:
                if len(restaurant) == 0:
                    return not_found()
                restaurantsList.remove(restaurant)
                return jsonify({"resultMessage": "Restaurante {}, com o ID: {} foi deletado com sucesso".format(restaurant["name"], restaurant["id"])})
        return not_found()
    except (ValueError, TypeError):
        return not_found()
  
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=True)
    app.register_error_handler(400, bad_request)
    app.register_error_handler(404, not_found)
```
