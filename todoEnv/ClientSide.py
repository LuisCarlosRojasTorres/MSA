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
get_restaurants_by_Id(3)
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