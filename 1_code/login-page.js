var loginForm = document.getElementById("login-form");
var loginButton = document.getElementById("login-form-submit");
var loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    //Ready();
    e.preventDefault();
    window.username = loginForm.username.value;
    window.password = loginForm.password.value;
    console.log(username);
    console.log(password);
    
    var user_data = {"test":"test", "user":"password", "using":"passing","other":"others"};

    if (username in user_data && user_data[username] == password) {
          //Passing login information to firebase
        saveLoginToDatabase(username, password);
        alert("You have successfully logged in.");
        console.log(username);
        console.log(password);
    } else {
        //alert("Incorrect password")
        loginErrorMsg.style.opacity = 1;
    }

    window.open("home-page.html");
    
    function saveLoginToDatabase(user, pass) {
         //Passing login information to firebase
        firebase.database().ref('login/'+username).set({
            username: loginForm.username.value,
            password: loginForm.password.value
        }).then(function() {
            console.log("Saved login info.");
        }).catch(function(error) {
            console.error("Error adding login info: ", error);
        });
    }
    
    /*
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
    */    
   
})
