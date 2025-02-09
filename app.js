import { auth } from "./firebase.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider 
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

// ✅ Signup Function
function signupUser() {
    console.log("✅ Signup button clicked!"); // Debugging ke liye

    let name = document.getElementById("signup-name").value.trim();
    let email = document.getElementById("signup-email").value.trim();
    let password = document.getElementById("signup-password").value.trim();

    if (!name || !email || !password) {
        alert("❌ Please enter name, email, and password.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("✅ Signup Successful! 🎉");
            console.log("User Created:", user);
            window.location.href = "dashboard.html"; // Redirect after signup
        })
        .catch((error) => {
            alert("❌ Signup Failed: " + error.message);
            console.error("Signup Error:", error);
        });
}

// ✅ Login Function
function loginUser() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
        alert("❌ Please enter both email and password.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("✅ Login Successful! 🎉");
            console.log("Logged in User:", user);
            window.location.href = "dashboard.html"; // Redirect after login
        })
        .catch((error) => {
            alert("❌ Login Failed: " + error.message);
            console.error("Login Error:", error);
        });
}

// ✅ Google Login Function
function loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            alert("✅ Google Login Successful! 🎉");
            console.log("Google User:", user);
            window.location.href = "dashboard.html"; // Redirect after login
        })
        .catch((error) => {
            alert("❌ Google Login Failed: " + error.message);
            console.error("Google Login Error:", error);
        });
}

// ✅ Add Event Listeners AFTER DOM is Loaded
document.addEventListener("DOMContentLoaded", () => {
    const signupBtn = document.getElementById("signup-btn");
    const loginBtn = document.getElementById("login-btn");
    const googleLoginBtn = document.getElementById("google-login-btn");

    if (signupBtn) signupBtn.addEventListener("click", signupUser);
    if (loginBtn) loginBtn.addEventListener("click", loginUser);
    if (googleLoginBtn) googleLoginBtn.addEventListener("click", loginWithGoogle);
});
