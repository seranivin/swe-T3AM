const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

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
    
    /*
    //Passing login information to firebase
    firebase.database().ref('login/test').set({
        username: username,
        password: password
    });
    */
   
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