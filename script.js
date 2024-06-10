
const productAll = document.querySelector(".productAll");
const productBody = document.querySelector(".productBody");
const productBodyBox = document.querySelector(".productBodyBox");
const cancelButton = document.querySelector(".cancelButton");

function myProductFetcher() {
    return new Promise((resolve, reject) => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => resolve(data.products))
            .catch(error => reject("Your network has a problem", error));
    });
}

function display(data) {
    let allProductMarkup = '';

    data.forEach((item, index) => {
        allProductMarkup += `
        <div class="productItem" data-index="${index}">
            <picture><img src="${item.thumbnail}" alt="${item.title}"></picture>
            <h2>${item.title}</h2>
            <div class="productPrice">
                <span class="actualPrice">$${item.price}</span>
                <span class="discountPrice">$${item.discountPercentage}</span>
            </div>
            <div class="rating">
                <h3><i class="fa-solid fa-star align-middle"></i> <span>${item.rating}</span></h3>
                <h4>Stock <span>${item.stock}</span></h4>
            </div>
            <button class="productButton">View Details</button>
        </div>`;
    });

    productAll.innerHTML = allProductMarkup;

    const productButtons = document.querySelectorAll(".productButton");
    productButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productIndex = event.target.closest('.productItem').dataset.index;
            displayProductDetails(data[productIndex]);
        });
    });
}

function displayProductDetails(product) {
    const productDetails = `
    <div class="productBox">
        <div class="productItem">
            <picture><img src="${product.thumbnail}" alt="${product.title}"></picture>
            <h2>${product.title}</h2>
            <div class="productPrice">
                <span class="actualPrice">$${product.price}</span>
                <span class="discountPrice">$${product.discountPercentage}</span>
            </div>
            <div class="rating">
                <h3><i class="fa-solid fa-star align-middle"></i> <span>${product.rating}</span></h3>
                <h4>Stock <span>${product.stock}</span></h4>
            </div>
        </div>
        <div class="productDetails">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <h3>Category: <span>${product.category}</span></h3>
            <div class="brand">
                <h2>Brand <span>${product.brand}</span></h2>
            </div>
            <div class="productPrice">
                <span class="actualPrice">$${product.price}</span>
                <span class="discountPrice">$${product.discountPercentage}</span>
            </div>
            <h4><span class="checkIcon"><i class="fa-solid fa-circle-check align-middle"></i></span> In Stock <span>(${product.stock} items available)</span></h4>
            <p><span class="star"><i class="fa-solid fa-star align-middle"></i></span>
                <span class="star"><i class="fa-solid fa-star align-middle"></i></span>
                <span class="star"><i class="fa-solid fa-star align-middle"></i></span>
                <span class="star"><i class="fa-solid fa-star align-middle"></i></span>
                <span class="star"><i class="fa-solid fa-star align-middle"></i></span> <span class="starRating">${product.rating}</span></p>
            <h5><i class="fa-solid fa-check-double"></i> <span>${product.warrantyInformation}</span></h5>
            <h6><i class="fa-solid fa-arrows-rotate"></i> <span>${product.returnPolicy}</span></h6>
        </div>
    </div>`;
    
    productBodyBox.innerHTML = productDetails;
    productBody.style.display = "block";
}

myProductFetcher().then(data => {
    display(data);
}).catch(error => {
    console.log("You have a network problem", error);
});

cancelButton.addEventListener("click", () => {
    productBody.style.display = "none";
});