  // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDNc-leNBc16NmYBtwX29v3UlxR8Gu62Ls",
    authDomain: "test-a22a9.firebaseapp.com",
    databaseURL: "https://test-a22a9.firebaseio.com",
    projectId: "test-a22a9",
    storageBucket: "test-a22a9.appspot.com",
    messagingSenderId: "373824019405",
    appId: "1:373824019405:web:3458e3f0b8884167b04284"
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized.')
}