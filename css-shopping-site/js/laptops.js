const products = [
    {
        category: "Comig Soon",
        name: "Comig Soon",
        price: 1,
        buyLink: "#",
        images: ["../src/favicon/favicon.png"]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    generateShop(products, "laptop-container");
});
