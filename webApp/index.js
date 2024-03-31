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

    createRestaurant(data);
});

function createRestaurant(data) {
    resultField = document.getElementById("resultMessage");
    try {
        fetch(HOST + commonPath, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
            }).then(response => {
                if (response.status === 201) {
                    response.json().then(responseData => {
                        resultField.innerText = "Restaurante Criado com sucesso com ID: " + responseData.id;
                    }); 
                } else {
                    response.json().then(responseData => {
                        resultField.innerText = "Erro ao criar o Restaurante: " + responseData.error;
                    });
                }
        })
        
    } catch (error) {
        resultField.innerText = "Erro: " + error;
    }
}