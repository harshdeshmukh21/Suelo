// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import exp from "constants";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWJaUe3ANB5wjoHMfUuQKyT7dDKYWGVFU",
  authDomain: "suelo-f5bac.firebaseapp.com",
  projectId: "suelo-f5bac",
  storageBucket: "suelo-f5bac.appspot.com",
  messagingSenderId: "809167126273",
  appId: "1:809167126273:web:e9848ba2fb8e26d3106500",
  measurementId: "G-KFEMD6DZGX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

// getDocs(colRef)
//   .then((snapshot) => {
//     let Signup = [];
//     snapshot.docs.forEach((doc) => {
//       Signup.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(Signup);
//   })

//   .catch((err) => {
//     console.log(err.message);
//   });

console.log(localStorage.getItem("username"));

// window.onload = function login() {
//   const loginForm = document.getElementById("login-form");

//   loginForm?.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const username = loginForm.querySelector('input[name="username"]').value;
//     const password = loginForm.querySelector('input[name="password"]').value;

//     const querySnapshot = await getDocs(collection(db, "Signup"));
//     const user = querySnapshot.docs.find(
//       (doc) => doc.data().username === username
//     );

//     // user? console.log(user.data()) : alert('Incorrect Username')

//     // console.log(user.data());

//     if (user && user.data().password === password) {
//       // window.location.href='Signup2.html';
//       localStorage.setItem("username", username);
//       window.location.href = "/src/HTML/home.html";
//       // alert('SYSTUM')
//     } else {
//       alert("Invalid username or password. Please try again.");
//     }
//   });
// };

// cument.addEventListener("DOMContentLoaded", function () {
//   const addSignupForm = document.getElementById("signup-form");
//   const password = document.getElementById("password");
//   const conpassword = document.getElementById("conpassword");

//   addSignupForm.addEventListener("submit", async (e) => {
//     e.preventDefault(); // Prevent the default form submission

//     if (password.value === "" || conpassword.value === "") {
//       alert("Please fill in both password fields");
//       return;
//     }

//     if (password.value !== conpassword.value) {
//       alert("Passwords do not match");
//       return;
//     }

//     const colRef = collection(db, "Signup");

//     addDoc(colRef, {
//       username: addSignupForm.elements.username.value,
//       email: addSignupForm.elements.email.value,
//       password: addSignupForm.elements.password.value,
//       conpass: addSignupForm.elements.conpass.value,
//     })
//       .then(() => {
//         console.log("Signup successful");
//         // Redirect to the home page after successful signup
//         window.location.href = "/src/HTML/home.html";
//       })
//       .catch((error) => {
//         console.error("Error adding document: ", error);
//       });
//   });
// });

async function addActivity(name, description, location) {
  try {
    // Reference to the 'Activities' collection
    const activitiesRef = collection(db, 'Activities');

    // Add a new document with a generated id.
    const docRef = await addDoc(activitiesRef, {
      name: name,
      description: description,
      location: location
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

onSnapshot(activitiesRef, (querySnapshot) => {
  const activitiesContainer = document.getElementById('activities-container');
  activitiesContainer.innerHTML = ''; // Clear previous activities

  querySnapshot.forEach((doc) => {
      const activity = doc.data();
      const activityDiv = document.createElement('div');
      activityDiv.innerHTML = `
          <h2>${activity.name}</h2>
          <p>Location: ${activity.location}</p>
      `;
      activitiesContainer.appendChild(activityDiv);
  });
});
export { db };