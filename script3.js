document.addEventListener("DOMContentLoaded", function () {
    const orderButtons = document.querySelectorAll(".order-button");
    const popup = document.getElementById("popup-modal");
    const closeBtn = document.querySelector(".close-btn");

    orderButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault(); 
            popup.style.display = "flex";
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            popup.style.display = "none";
        });
    }

    window.addEventListener("click", function (e) {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });
});
