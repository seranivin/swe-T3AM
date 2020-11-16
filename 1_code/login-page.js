var loginForm = document.getElementById("login-form");
var createAccount = document.getElementById('login-form-create-account');
var loginButton = document.getElementById("login-form-submit");
var loginErrorMsg = document.getElementById("login-error-msg");
var user_data = {"test":"test", "user":"password", "using":"passing","other":"others"};
var loginUser; 

createAccount.addEventListener("click", (e) => {
    e.preventDefault();
    var username = loginForm.username.value;
    const password = loginForm.password.value;
    console.log(username);
    console.log(password);


    if (username in user_data) {
        alert("This username already exists.");
        loginErrorMsg.style.opacity = 1;

    } else {
        user_data[username] = password;
        //Put username in local storage
        window.localStorage.setItem("vUserLocalStorage", JSON.stringify(loginForm.username.value)); 
        console.log("Local storage: "+JSON.parse(window.localStorage.getItem("vUserLocalStorage")));
        //Passing login information to firebase
        saveLoginToDatabase(username);
        alert("You have successfully created account.");
    }

    window.open("home-page.html");
   
})

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    var username = loginForm.username.value;
    const password = loginForm.password.value;
    console.log(username);
    console.log(password);
    

    if (username in user_data && user_data[username] == password) {
        alert("You have successfully logged in.");
        window.open("home-page.html");
    }
    else{
    var check = false;
    firebase.database().ref().child("login/").once("value", function(snapshot) {
        var tasks = snapshot.val();
        var keys = Object.keys(tasks);
        //console.log('VALS: '+Object.valueOf(tasks));
        for (var i=0; i<keys.length;i++) {
            var fireUser = snapshot.child(keys[i]+"/username").val();
            var firePass = snapshot.child(keys[i]+"/password").val();
            if (fireUser == username && firePass == password){
                //Put username in local storage
                window.localStorage.setItem("vUserLocalStorage", JSON.stringify(loginForm.username.value)); 
                console.log("Local storage: "+JSON.parse(window.localStorage.getItem("vUserLocalStorage")));
                //Passing login information to firebase
                alert("You have successfully logged in.");
                window.open("home-page.html");
                check = true;
                break;
            } 
        }
        if (!check){
        alert("Incorrect password");  
        }
    });
    }
                                                   
/*
    } else {
        alert("Incorrect password");
        loginErrorMsg.style.opacity = 1;
    }

    window.open("home-page.html");
   */
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







