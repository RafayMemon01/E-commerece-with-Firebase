console.log("Admin Working");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

const appSettings = {
  databaseURL: "https://salesphere-95e48-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

console.log(database);

const post = (e) => {
  e.preventDefault();

  const productName = document.getElementById("productName").value;
  const productDescription = document.getElementById("productDescription").value;
  
  console.log(productDescription, productName);

  // Now you can use the Firebase database to push the data.
  const productsRef = ref(database, 'products');
  push(productsRef, {
    name: productName,
    description: productDescription
  });

  // You might want to reset the form after posting.
  postForm.reset();
};

let postForm = document.getElementById("postForm");
postForm.addEventListener("submit", post);
