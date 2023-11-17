console.log("Admin Working");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

const appSettings = {
    databaseURL: "https://salesphere-95e48-default-rtdb.firebaseio.com/",
    apiKey: "AIzaSyBJtfXZTIxNyUuYW-4kaumwpWoqaQJw8Ko",
    authDomain: "salesphere-95e48.firebaseapp.com",
    projectId: "salesphere-95e48",
    storageBucket: "salesphere-95e48.appspot.com" // Replace with your Firebase project's storage bucket
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

const loginForm = document.getElementById("loginForm");
const adminContainer = document.getElementById("adminContainer");
const postForm = document.getElementById("postForm");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("Login successful");
            document.getElementById("loginContainer").style.display = "none";
            adminContainer.style.display = "block";
        })
        .catch((error) => {
            console.error("Login failed:", error.message);
        });
});

const post = async (e) => {
  e.preventDefault();

  const productName = document.getElementById("productName").value;
  const productDescription = document.getElementById("productDescription").value;
  const affiliateLink = document.getElementById("affiliateLink").value;
  const productImage = document.getElementById("productImage").files[0];

  // Upload image to Firebase Storage
  const imageRef = storageRef(storage, `products/${productImage.name}`);
  await uploadBytes(imageRef, productImage);

  // Get download URL for the uploaded image
  const imageUrl = await getDownloadURL(imageRef);

  // Push product data to Firebase database
  const productsRef = ref(database, 'products');
  push(productsRef, {
      name: productName,
      description: productDescription,
      affiliateLink: affiliateLink,
      imageUrl: imageUrl
  });

  // Reset the form after posting
  postForm.reset();
};

postForm.addEventListener("submit", post);
