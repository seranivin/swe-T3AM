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
    
    //Passing login information to firebase
    var storageRef = firebase.storage().ref();
    var loginRef = firebase.storageRef.child('login_info.txt');
    var loginTxtRef = firebase.storageRef.child('login_info/login_info.txt');

    var string = username + ', '+ password;
    storageRef.putString(string).then(function(snapshot) {
      console.log('Uploaded a login string!');
    });
    
    function saveDataToFile(username, password) {
        var blob = new Blob([username, password],
                    { type: "text/plain;charset=utf-8" });
        saveAs(blob, "static.txt");
    }
})