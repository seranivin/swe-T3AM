const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
var db = firebase.firestore();

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    console.log(username);
    console.log(password);

    var user_data = {"test":"test", "user":"password"};

    if (username in user_data && user_data[username] == password) {
        alert("You have successfully logged in.");
        window.location.replace("home-page.html");
    } else {
        alert("Incorrect password")
        loginErrorMsg.style.opacity = 1;
    }
    firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        const docRef = firestore.doc("login/test_data");
        docRef.set({
            username: username,
            password: password
        }).then(function() {
            console.log("Saved login info.");
        })
        .catch(function(error) {
            console.error("Error adding login info: ", error);
        });
        
    });
    
   
})
/*
document.getElementById("login-form-submit").onclick = function(){
        alert("Database.");
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        //Passing login information to firebase
        firebase.database().ref('login/'+username).set({
            usern: username,
            pass: password
        });
    }
    */