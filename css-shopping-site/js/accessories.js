const products = [
    {
        category: "Power Bank",
        name: "Mi 4i 20000mAh 33W Super Fast Charging PD Power Bank",
        price: 1899,
        buyLink: "https://amzn.to/4kiVJV9",
        images: ["../src/product-img/powerbank/image.png", "../src/product-img/powerbank/image2.png"]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    generateShop(products, "accessories-container");
});
