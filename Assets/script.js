import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

const appSettings = {
  databaseURL: "https://salesphere-95e48-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

const cardContainer = document.querySelector(".cardContainer");

const renderProducts = (products) => {
  // Clear existing content
  cardContainer.innerHTML = "";

  // Loop through products and create HTML elements
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <button class="fa-solid fa-eye" onclick="window.location.href='${product.affiliateLink}'"> View</button>
    `;
    cardContainer.appendChild(card);
  });
};

// Retrieve products from Firebase database
const productsRef = ref(database, 'products');
onValue(productsRef, (snapshot) => {
  const productsData = snapshot.val();
  
  // Check if there are products in the database
  if (productsData) {
    const productsArray = Object.values(productsData);
    renderProducts(productsArray);
  } else {
    cardContainer.innerHTML = "<p>No products available.</p>";
  }
});
