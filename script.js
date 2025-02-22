document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;

    if (document.getElementById("book-list")) {
        loadBooks();
    } else if (document.getElementById("cart-items")) {
        loadCart();
    }
});

async function loadBooks() {
    const res = await fetch("books.json");
    const books = await res.json();
    const bookList = document.getElementById("book-list");

    books.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
            <img src="${book.image}" width="150">
            <h3>${book.title}</h3>
            <p><i>by ${book.author}</i></p>
            <p>$${book.price.toFixed(2)}</p>
            <button onclick="addToCart(${book.id}, '${book.title}', ${book.price})">Add to Cart</button>
        `;
        bookList.appendChild(bookDiv);
    });
}

function addToCart(id, title, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ id, title, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cart-count").innerText = cart.length;
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");
    
    let total = 0;
    cartList.innerHTML = "";
    
    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement("li");
        li.innerHTML = `${item.title} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">❌</button>`;
        cartList.appendChild(li);
    });

    totalElement.innerText = total.toFixed(2);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

document.getElementById("checkout")?.addEventListener("click", () => {
    alert("Redirecting to payment gateway...");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
});
