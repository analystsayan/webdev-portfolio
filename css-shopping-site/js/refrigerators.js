const products = [
    {
        category: "Amazon Summer Sale",
        name: "IFB 241L 3 Star Tru Convertible 10-in-1 Advanced Inverter Frost Free Double Door Refrigerator",
        price: 19999,
        buyLink: "https://amzn.to/3RN14aT",
        images: ["../src/product-img/refrigerator/image.png", "../src/product-img/refrigerator/image1.png"],
    }
];

document.addEventListener("DOMContentLoaded", () => {
    generateShop(products, "refrigerator-container");
});
