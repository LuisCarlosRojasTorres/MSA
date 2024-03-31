const HOST = "http://127.0.0.1:5000";
const commonPath = "/todo/api/restaurants";

document.getElementById("submitButton").addEventListener("click", function () {
    // Define the data to be sent in the request
    address = {
        "postalCode": document.getElementById("cepInput").value,
        "streetAddress": document.getElementById("streetAddressInput").value,
        "addressLocality": document.getElementById("cityInput").value,
        "addressRegion": document.getElementById("stateInput").value,
        "addressCountry": document.getElementById("countryInput").value,
    };

    id = document.getElementById("idInput").value;

    data = {
    "name": document.getElementById("nameInput").value,
    "address": address,
    "url": document.getElementById("urlInput").value,
    "menu": document.getElementById("menuInput").value,
    "telephone": document.getElementById("telephoneInput").value,
    "priceRange": document.getElementById("priceRangeInput").value
    };

    if (Object.values(data).filter( v => v === "" ).length > 0) {
        alert("Preencha todos os campos");
        return;
    }
    
    updateRestaurant(id, data);
});

document.getElementById("getIDButton").addEventListener("click", function () {
    id = document.getElementById("idInput").value;

    if (id === "") {
        alert("ID precisa estar preenchido");
        return;
    }

    getRestaurantByID(id);
});

document.getElementById("deleteButton").addEventListener("click", function () {
    restaurantID = document.getElementById("idInput").value;
    restaurantName = document.getElementById("nameInput").value;

    if (id === "") {
        alert("ID precisa estar preenchido");
        return;
    }

    if (deleteAlert(restaurantName, restaurantID)) {
        deleteRestaurantByID(id);
    }
});

function updateRestaurant(id, data) {
    resultField = document.getElementById("resultMessage");
    try {
        fetch(HOST + commonPath + "/" + id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
            }).then(response => {
                if (response.status === 200) {
                    response.text().then(responseData => {
                        restaurant = JSON.parse(responseData);
                        resultField.innerText = "Restaurante Atualizado";
                        buildRestaurantList(restaurant, resultField)
                    }); 
                } else {
                    response.json().then(responseData => {
                        alert("erro");
                        resultField.innerText = "Erro ao atualizar o Restaurante: " + responseData.error;
                    });
                }
        })
        
    } catch (error) {
        alert("erro2");
        resultField.innerText = "Erro: " + error;
    }
}

function getRestaurantByID(id) {
    try {
        fetch(HOST + commonPath + "/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).then(response => {
                if (response.status === 200) {
                    document.getElementById("resultMessage").innerText = "Restaurante Encontrado";
                    response.text().then(responseData => {
                        restaurants = JSON.parse(responseData);
                        fillRestaurantFields(restaurants);
                    }); 
                } else {
                    response.json().then(responseData => {
                        document.getElementById("resultMessage").innerText = "Erro ao buscar: " + responseData.error;
                        clearRestaurantFields();
                    });
                }
        })
        
    } catch (error) {
        document.getElementById("resultMessage").innerText = "Erro: " + error;
        clearRestaurantFields();
    }
}

function deleteRestaurantByID(id) {
    try {
        fetch(HOST + commonPath + "/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(responseData => {
                        document.getElementById("resultMessage").innerText = responseData.resultMessage;
                        clearRestaurantFields();
                    }); 
                } else {
                    response.json().then(responseData => {
                        document.getElementById("resultMessage").innerText = "Erro ao buscar: " + responseData.error;
                        clearRestaurantFields();
                    });
                }
        })
        
    } catch (error) {
        document.getElementById("resultMessage").innerText = "Erro: " + error;
        clearRestaurantFields();
    }
}

function fillRestaurantFields(data) {
    document.getElementById("nameInput").value = data.name;
    document.getElementById("urlInput").value = data.url;
    document.getElementById("menuInput").value = data.menu;
    document.getElementById("telephoneInput").value = data.telephone;
    document.getElementById("priceRangeInput").value = data.priceRange;
    document.getElementById("cepInput").value = data.address.postalCode;
    document.getElementById("streetAddressInput").value = data.address.streetAddress;
    document.getElementById("cityInput").value = data.address.addressLocality;
    document.getElementById("stateInput").value = data.address.addressRegion;
    document.getElementById("countryInput").value = data.address.addressCountry;
}

function clearRestaurantFields() {
    document.getElementById("nameInput").value = "";
    document.getElementById("urlInput").value = "";
    document.getElementById("menuInput").value = "";
    document.getElementById("telephoneInput").value = "";
    document.getElementById("priceRangeInput").value = "";
    document.getElementById("cepInput").value = "";
    document.getElementById("streetAddressInput").value = "";
    document.getElementById("cityInput").value = "";
    document.getElementById("stateInput").value = "";
    document.getElementById("countryInput").value = "";
}

function buildRestaurantList(restaurant, responseField) {
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
    responseField.append(card);
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

function deleteAlert(restaurantName, restaurantId){
    if (confirm("Tem certeza que deseja apagar o restaurante " + restaurantName + " com o ID " + restaurantId + " ?")) {
      return true;
    }
    return false;
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