const HOST = "http://127.0.0.1:5000";
const commonPath = "/todo/api/restaurants";

document.getElementById("updateForm").addEventListener("input", function () {
    var values = [];
    var inputs = document.querySelectorAll("input");
    var canEnableButton = true;
    inputs.forEach(function () {
        if (input.id != "idInput" && input.value === "") {
            canEnableButton = false;
        }
    });

    document.getElementById("submitButton").disabled = !canEnableButton;
}); 

document.getElementById("submitButton").addEventListener("click", function () {
    // Define the data to be sent in the request
    address = {
        "addressLocality": document.getElementById("addressInput").value
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
    
    updateRestaurant(id, data);
});

document.getElementById("getIDButton").addEventListener("click", function () {
    id = document.getElementById("idInput").value;
    getRestaurantByID(id);
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
                        resultField.innerText = "Restaurante Atualizado com sucesso com ID: " + restaurant.id;
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

function fillRestaurantFields(data) {
    document.getElementById("addressInput").value = data.address;
    document.getElementById("nameInput").value = data.name;
    document.getElementById("urlInput").value = data.url;
    document.getElementById("menuInput").value = data.menu;
    document.getElementById("telephoneInput").value = data.telephone;
    document.getElementById("priceRangeInput").value = data.priceRange;
}

function clearRestaurantFields() {
    document.getElementById("addressInput").value = "";
    document.getElementById("nameInput").value = "";
    document.getElementById("urlInput").value = "";
    document.getElementById("menuInput").value = "";
    document.getElementById("telephoneInput").value = "";
    document.getElementById("priceRangeInput").value = "";
}

function buildRestaurantList(restaurant, responseField) {
    htmlList = document.createElement("ul");
    htmlList.innerHTML = restaurant.name;
    Object.keys(restaurant).forEach(key => {
        if (key === "name") { return }
        item = document.createElement("li");
        node = document.createTextNode(key + " : " + restaurant[key]);
        item.appendChild(node);
        htmlList.appendChild(item);
    }); 
    responseField.append(htmlList);
}