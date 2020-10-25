const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    console.log(username);
    console.log(password);

    var username_list = ["user","test"];
    var password_list = ["web_dev","test"];
    if (username_list.includes(username) && password_list.includes(password)) {
        alert("You have successfully logged in.");
        window.location.replace("home-page.html");
    } else {
        alert("Incorrect password")
        loginErrorMsg.style.opacity = 1;
    }
})