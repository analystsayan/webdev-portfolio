const products = [
    {
        category: "Under 25,000",
        name: "Samsung Galaxy Tab S9 FE with S Pen, RAM 6 GB, ROM 128 GB",
        price: 24999,
        buyLink: "https://amzn.to/4iK9WZI",
        images: ["../src/product-img/tablet/image.png", "../src/product-img/tablet/image1.png"]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    generateShop(products, "tablet-container");
});
