var loginForm = document.getElementById("login-form");
var loginButton = document.getElementById("login-form-submit");
var loginErrorMsg = document.getElementById("login-error-msg");
var loginUser; 

loginButton.addEventListener("click", (e) => {
    //Ready();
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    loginUser = username;
    console.log(username);
    console.log(password);
    
    var user_data = {"test":"test", "user":"password", "using":"passing","other":"others"};

    if (username in user_data && user_data[username] == password) {
          //Passing login information to firebase
        saveLoginToDatabase(password);
        //saveUsername(username);
        alert("You have successfully logged in.");

    } else {
        //alert("Incorrect password")
        loginErrorMsg.style.opacity = 1;
    }

    window.open("home-page.html");
    
    return username, password; 
   
})

function saveLoginToDatabase(user) {
     //Passing login information to firebase
    firebase.database().ref('login/'+user).set({
        username: loginForm.username.value,
        password: loginForm.password.value
    }).then(function() {
        console.log("Saved login info.");
    }).catch(function(error) {
        console.error("Error adding login info: ", error);
    });
}

const saveUser = function saveUsername(username) {
    return username;
}

