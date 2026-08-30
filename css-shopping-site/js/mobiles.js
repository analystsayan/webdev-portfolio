const products = [
    {
        category: "Best mobiles around ₹10000",
        name: "Motorola G45 5g (4GB/ 128GB)",
        price: 10999,
        buyLink: "https://fktr.in/voevreP",
        images: ["/product-imgs/g45.png", "/product-imgs/g45-back.png", "/product-imgs/g45-var.png"]
    },
    {
        category: "Best mobiles around ₹15000",
        name: "Motorola G85 5G (8GB/ 128GB)",
        price: 16999,
        buyLink: "https://fktr.in/bWrzeMx",
        images: ["/product-imgs/g85-blue.png", "/product-imgs/g85-green.png", "/product-imgs/g85-pink.png"]
    },
    {
        category: "Best mobiles around ₹20000",
        name: "Motorola Edge 50 Fusion (8GB/ 128GB)",
        price: 21999,
        buyLink: "https://fktr.in/6tdx9La",
        images: ["/product-imgs/edge50-fusion.png", "/product-imgs/edge-50-fusion.png", "/product-imgs/edge-50-fusion-gray.png"]
    },
    {
        category: "Best mobiles around ₹20000",
        name: "Nothing Phone (2a) 5G (8GB/ 128GB)",
        price: 21999,
        buyLink: "https://fktr.in/zbVNN4F",
        images: ["/product-imgs/phone-2a.png", "/product-imgs/phone-2a-front.png", "/product-imgs/phone-2a-blue.png", "/product-imgs/phone-2a-black.png"]
    },
    {
        category: "Best mobiles around ₹25000",
        name: "Nothing Phone (3a) 5G (8GB/ 128GB)",
        price: 24999,
        buyLink: "https://fktr.in/6ZkiyHs",
        images: ["/product-imgs/phone-3a.png", "/product-imgs/phone-3a-black.png", "/product-imgs/phone-3a-front.png"]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    generateShop(products, "mobile-container");
});
