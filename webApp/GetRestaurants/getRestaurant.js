const HOST = "http://127.0.0.1:5000";
const commonPath = "/api/restaurants";

document.getElementById("getAllRestautantsButton").addEventListener("click", function () {
    getAllRestaurant();
});

document.getElementById("getRetaurantByCity").addEventListener("click", function () {
    city = document.getElementById("citiesAvailable").value
    getRestaurantByProperty(city);
});

document.getElementById("getRetaurantByID").addEventListener("click", function () {
    id = document.getElementById("idInput").value
    
    if (id === "") {
        alert("ID precisa estar preenchido");
        return;
    }

    getRestaurantByProperty(id);
});

function getAllRestaurant() {
    try {
        fetch(HOST + commonPath, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).then(response => {
                if (response.status === 200) {
                    document.getElementById("responseField").innerText = "";
                    response.text().then(responseData => {
                        restaurantList = JSON.parse(responseData);
                        restaurantList.forEach(element => {
                            buildRestaurantList(element, "responseField");
                        });
                    }); 
                } else {
                    response.json().then(responseData => {
                        document.getElementById("responseField").innerText = "Erro ao buscar: " + responseData.error;
                    });
                }
        })
        
    } catch (error) {
        document.getElementById("responseField").innerText = "Erro: " + error;
    }
}

function getAllCities() {
    try {
        fetch(HOST + commonPath + "/cities", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).then(response => {
                if (response.status === 200) {
                    response.text().then(responseData => {
                        cityList = JSON.parse(responseData);
                        cityList.cities.forEach(element => {
                            buildCityList(element)
                        });
                    }); 
                } else {
                    response.json().then(responseData => {
                        document.getElementById("responseField").innerText = "Erro ao buscar: " + responseData.error;
                    });
                }
        })
        
    } catch (error) {
        document.getElementById("responseField").innerText = "Erro: " + error;
    }
}

function buildCityList(city) {
    var selectObject = document.getElementById("citiesAvailable");
    var canCreateCity = true;

    Array.prototype.forEach.call(selectObject.options, function (option, index) {
        if (option.innerHTML === city) {
            canCreateCity = false;
            return;
        }
    });

    if (canCreateCity) {
        selectOption = document.createElement("option");
        selectOption.innerHTML = city
        selectObject.appendChild(selectOption);
    }
}

function getRestaurantByProperty(property) {
    try {
        fetch(HOST + commonPath + "/" + property, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).then(response => {
                if (response.status === 200) {
                    document.getElementById("responseField").innerText = "";
                    response.text().then(responseData => {
                        restaurants = JSON.parse(responseData);
                        if (Array.isArray(restaurants)) {
                            restaurants.forEach(element => {
                                buildRestaurantList(element, "responseField");
                            });
                        } else {
                            buildRestaurantList(restaurants, "responseField");
                        }
                    }); 
                } else {
                    response.json().then(responseData => {
                        document.getElementById("responseField").innerText = "Erro ao buscar: " + responseData.error;
                    });
                }
        })
        
    } catch (error) {
        document.getElementById("responseField").innerText = "Erro: " + error;
    }
}

function buildRestaurantList(restaurant, responseFieldName) {
    card = document.createElement("div");
    card.className = "card";
    card.id = "restaurantDataCard";
    htmlList = document.createElement("ul");
    htmlList.innerHTML = restaurant.name;
    Object.keys(restaurant).forEach(key => {
        if (key === "name") { return }
        if (key === "address") { return }
        item = document.createElement("li");
        node = document.createTextNode(localizedKeys[key] + ": " + restaurant[key]);
        item.appendChild(node);
        htmlList.appendChild(item);
    }); 
    card.append(htmlList);
    document.getElementById(responseFieldName).append(card);
    buildAddressList(restaurant.address, card);
}

function buildAddressList(address, cardElement) {
    addressList = document.createElement("ul");
    addressList.innerHTML = "Dados de endereço";
    Object.keys(address).forEach(key => {
        item = document.createElement("li");
        node = document.createTextNode(localizedKeys[key] + " : " + address[key]);
        item.appendChild(node);
        addressList.appendChild(item);
    }); 
    cardElement.append(addressList);
}

var localizedKeys = {
    "id": "Identificador",
    "name": "Nome",
    "address": "Endereço",
    "postalCode":"CEP",
    "streetAddress":"Logradouro",
    "addressLocality":"Cidade",
    "addressRegion":"Estado",
    "addressCountry":"País",
    "url": "Site",
    "menu": "Menu",
    "telephone": "Telefone",
    "priceRange": "Preço Médio"
}