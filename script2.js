const steps = document.querySelectorAll(".form-step");
const stepIndicators = document.querySelectorAll(".step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
let currentStep = 0;

function showCurrentStep() {
    steps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
        stepIndicators[index].classList.toggle("active", index === currentStep);
    });

    prevBtn.style.display = currentStep === 0 ? "none" : "inline-block";
    nextBtn.style.display = currentStep === steps.length - 1 ? "none" : "inline-block";
}

nextBtn.addEventListener("click", function () {
    if (validateStep(currentStep)) {
        currentStep++;
        if (currentStep < steps.length) {
            showCurrentStep();
        }
    }
});

prevBtn.addEventListener("click", function () {
    if (currentStep > 0) {
        currentStep--;
        showCurrentStep();
    }
});

function validateStep(step) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const mainMenu = document.getElementById('mainMenu').value;
    const quantityValue = document.getElementById("quantity").value.trim();
    const quantity = parseInt(quantityValue);

    let errors = [];

    if (step === 0) {
        if (name.length < 3 || !hasOnlyLetters(name)) {
            errors.push("Name must be at least 3 characters and only contain letters.");
        }
    } else if (step === 1) {
        const validDomain = email.endsWith("gmail.com") || email.endsWith("binus.ac.id") || email.endsWith("yahoo.com");
        if (email.length < 5 || !email.includes("@") || !email.includes(".") || !validDomain) {
            errors.push("Email must be valid and use domain gmail.com / binus.ac.id / yahoo.com.");
        }
    } else if (step === 2) {
        if (address.length < 5) {
            errors.push("Address must be at least 5 characters long.");
        }
    } else if (step === 3) {
        if (mainMenu === "") {
            errors.push("Please select at least one menu item.");
        }
        if (quantityValue === "" || isNaN(quantity) || quantity < 1) {
            errors.push("Enter a valid quantity (minimum 1).");
        }
    }

    if (errors.length > 0) {
        alert("" + errors.join("\n- "));
        return false;
    }

    return true;
}

function validateAllFields() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const mainMenu = document.getElementById('mainMenu').value;
    const quantityValue = document.getElementById("quantity").value.trim();
    const quantity = parseInt(quantityValue);

    let errors = [];

    if (name.length < 3 || !hasOnlyLetters(name)) {
        errors.push("Name must be at least 3 characters and only contain letters.");
    }

    const validDomain = email.endsWith("@gmail.com") || email.endsWith("@binus.ac.id") || email.endsWith("@yahoo.com");
    if (email.length < 5 || !email.includes("@") || !email.includes(".") || !validDomain) {
        errors.push("Email must be valid and use domain gmail.com / binus.ac.id / yahoo.com.");
    }

    if (address.length < 5) {
        errors.push("Address must be at least 5 characters long.");
    }

    if (mainMenu === "") {
        errors.push("Please select at least one menu item.");
    }

    if (quantityValue === "" || isNaN(quantity) || quantity < 1) {
        errors.push("Enter a valid quantity (minimum 1).");
    }

    return errors;
}

const menuPrices = {
    "Espresso": 30000,
    "Americano": 25000,
    "Cappucino": 30000,
    "Latte Macchiato": 30000,
    "Caramel Macchiato": 15000,
    "Mocha Espresso": 28000,
    "Mocha Frappe": 30000,
    "Caramel Frappe": 25000,
    "Vanilla Frappe": 30000,
    "Chocolate Frappe": 30000,
    "Coffee Jelly Frappe": 28000,
    "Matcha Frappe": 28000,
    "House Blend": 25000,
    "Cold Brew": 25000,
    "French Press": 30000,
    "Pour Over": 30000,
    "Nitro Brew": 28000,
    "Vanilla Cold Brew": 28000,
    "Croissant": 15000,
    "Danish Pastry": 15000,
    "Banana Press": 20000,
    "Chocolate Muffin": 20000,
    "Cinnamon Roll": 25000,
    "Almond Biscotti": 20000
};

const addonPrices = {
    "Vanilla syrup": 3000,
    "Caramel syrup": 3000,
    "Oat milk": 5000,
    "Almond milk": 5000,
    "Extra shot expresso": 5000,
    "Brown sugar": 3000,
    "Stevia sugar": 5000
};

function calculateTotalPrice() {
    let total = 0;

    const menuSelect = document.getElementById("mainMenu");
    const selectedMenu = menuSelect.value;

    const quantityInput = document.getElementById("quantity");
    const quantity = parseInt(quantityInput.value) || 1;

    if (selectedMenu && menuPrices[selectedMenu]) {
        total += menuPrices[selectedMenu] * quantity;
    }

    const selectedAddons = document.querySelectorAll('input[name="addons"]:checked');
    selectedAddons.forEach(addon => {
        const addonName = addon.value;
        if (addonPrices[addonName]) {
            total += addonPrices[addonName];
        }
    });

    document.getElementById("price").value = total > 0 ? `Rp ${total.toLocaleString('id-ID')}` : "";
}

function hasOnlyLetters(str) {
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (!(char >= 'A' && char <= 'Z') && !(char >= 'a' && char <= 'z') && char !== ' ') {
            return false;
        }
    }
    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mainMenu").addEventListener("change", calculateTotalPrice);
    document.getElementById("quantity").addEventListener("input", calculateTotalPrice);

    document.querySelectorAll('input[name="addons"]').forEach(cb => {
        cb.addEventListener("change", calculateTotalPrice);
    });

    const priceContainer = document.querySelector('#price').parentNode;
    const orderBtn = document.createElement('button');
    orderBtn.textContent = "Order Now";
    orderBtn.type = "button";
    orderBtn.classList.add("order-button", "custom-order-btn");

    priceContainer.appendChild(orderBtn);

    orderBtn.addEventListener("click", function () {
        const errors = validateAllFields();

        if (errors.length > 0) {
            alert("" + errors.join("\n- "));
        } else {
            alert("Order placed successfully!");

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("address").value = "";
            document.getElementById("mainMenu").value = "";
            document.getElementById("quantity").value = "1";
            document.getElementById("price").value = "";

            document.querySelectorAll('input[name="addons"]').forEach(cb => {
                cb.checked = false;
            });

            currentStep = 0;
            showCurrentStep();
        }
    });

    calculateTotalPrice();
    showCurrentStep(); 
});
