const HOST = "http://127.0.0.1:5000";
const commonPath = "/todo/api/restaurants";

document.getElementById("submitButton").addEventListener("click", function () {
    // Define the data to be sent in the request
    address = {
        "addressLocality": document.getElementById("addressInput").value
    };

    data = {
    "name": document.getElementById("nameInput").value,
    "address": address,
    "url": document.getElementById("urlInput").value,
    "menu": document.getElementById("menuInput").value,
    "telephone": document.getElementById("telephoneInput").value,
    "priceRange": document.getElementById("priceRangeInput").value
    };
    
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