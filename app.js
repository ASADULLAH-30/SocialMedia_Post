// Signup User
function signupUser() {
    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            return user.updateProfile({ displayName: name });
        })
        .then(() => {
            alert("Signup Successful! Redirecting to Login...");
            window.location.href = "index.html";
        })
        .catch(error => alert(error.message));
}

// Login User
function loginUser() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("Login Successful!");
            window.location.href = "dashboard.html";
        })
        .catch(error => alert(error.message));
}

// Google Login
function loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(() => {
            alert("Google Login Successful!");
            window.location.href = "dashboard.html";
        })
        .catch(error => alert(error.message));
}

// Logout User
function logoutUser() {
    auth.signOut().then(() => {
        alert("Logged Out Successfully!");
        window.location.href = "index.html";
    });
}
