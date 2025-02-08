
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCs3t6drN5LmBo_3dUON4WcEFwzbX5OksA",
    authDomain: "mypost-a09aa.firebaseapp.com",
    projectId: "mypost-a09aa",
    storageBucket: "mypost-a09aa.firebasestorage.app",
    messagingSenderId: "525170862267",
    appId: "1:525170862267:web:4657b105c9b0fae179619e",
    measurementId: "G-N7SYGZ811K"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();