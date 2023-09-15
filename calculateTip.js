// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Obtenemos elementos del DOM por sus IDs
    const billInput = document.getElementById("bill-in");
    const tipButtons = document.querySelectorAll(".buttons-container button");
    const customTipInput = document.getElementById("tip-in");
    const numberOfPeopleInput = document.getElementById("n-people");
    const tipAmountElement = document.getElementById("tip-amount");
    const tipTotalElement = document.getElementById("tip-total");
    const resetButton = document.getElementById("reset-btn");

    // Agregamos eventos para los botones de porcentaje de propina
    tipButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Obtenemos el porcentaje de propina del texto del botón
            const tipPercentage = parseInt(button.textContent.replace("%", ""));
            // Calculamos la propina usando el porcentaje
            calculateTip(tipPercentage);
        });
    });

    // Agregamos evento para el campo de entrada de propina personalizada
    customTipInput.addEventListener("input", function () {
        // Convertimos el valor del campo a un número decimal
        const customTipPercentage = parseFloat(customTipInput.value) || 0;
        // Calculamos la propina usando el porcentaje personalizado
        calculateTip(customTipPercentage);
    });

    // Agregamos evento para el campo de entrada de número de personas
    numberOfPeopleInput.addEventListener("input", function () {
        // Calculamos la propina nuevamente cuando el número de personas cambia
        calculateTip();
    });

    // Agregamos evento para el botón de reinicio
    resetButton.addEventListener("click", function () {
        // Reiniciamos los valores del calculador
        resetCalculator();
    });

    // Función para calcular la propina y actualizar los resultados en el DOM
    function calculateTip(tipPercentage = 0) {
        const billAmount = parseFloat(billInput.value) || 0;
        const numberOfPeople = parseInt(numberOfPeopleInput.value) || 1;


        if (billAmount < 0 || numberOfPeople < 1) {
            displayError("Please enter valid values.");
            return;
        }

        const tipAmount = (billAmount * tipPercentage) / 100;
        const totalAmount = billAmount + tipAmount;
        const tipPerPerson = tipAmount / numberOfPeople;
        const totalPerPerson = totalAmount / numberOfPeople;

        // Actualizamos los elementos en el DOM con los resultados calculados
        tipAmountElement.textContent = "$" + tipPerPerson.toFixed(2);
        tipTotalElement.textContent = "$" + totalPerPerson.toFixed(2);

        clearError();
    }

    function displayError(message) {
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = message;
        errorMessageElement.style.display = "block";
    }

    function clearError() {
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.style.display = "none";
    }


    // Función para reiniciar los valores del calculador
    function resetCalculator() {
        billInput.value = "";
        tipButtons.forEach(button => button.classList.remove("active"));
        customTipInput.value = "";
        numberOfPeopleInput.value = "";
        tipAmountElement.textContent = "$0.00";
        tipTotalElement.textContent = "$0.00";
        clearError();
        
    }
});
