// Screen elements
const registerScreen = document.getElementById("registerScreen");
const loginScreen = document.getElementById("loginScreen");
const dashboardScreen = document.getElementById("dashboardScreen");

// Register User
function registerUser() {
    event.preventDefault();

    let name = document.getElementById("regName").value;
    let mobile = document.getElementById("regMobile").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;
    let error = document.getElementById("regError");

    if (name === "" || mobile === "" || password === "") {
        error.innerText = "Please fill all required fields!";
        return;
    }

    let userData = {
        name: name,
        mobile: mobile,
        email: email,
        password: password
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    error.innerText = "";

    alert("Registration Successful 👍");
    switchToLogin();
}

function loginUser() {
    let mobile = document.getElementById("loginMobile").value;
    let password = document.getElementById("loginPassword").value;
    let error = document.getElementById("loginError");

    let savedData = localStorage.getItem("userData");

    if (!savedData) {
        error.innerText = "No account found. Please register!";
        return;
    }

    let user = JSON.parse(savedData);

    if (mobile === user.mobile && password === user.password) {
        error.innerText = "";
        showDashboard(user.name);
    } else {
        error.innerText = "Invalid mobile number or password!";
    }
}

function showDashboard(name) {
    loginScreen.classList.add("hidden");
    registerScreen.classList.add("hidden");
    dashboardScreen.classList.remove("hidden");

    document.getElementById("welcomeMessage").innerText =
        "Welcome, " + name + " 👋";
}

function switchToLogin() {
    registerScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");
}

function switchToRegister() {
    loginScreen.classList.add("hidden");
    registerScreen.classList.remove("hidden");
}


function logoutUser() {
  localStorage.removeItem("loggedInUser");
  document.getElementById("regMobile").value = "";
  document.getElementById("regPassword").value = "";
  document.getElementById("regName").value = "";
  document.getElementById("regEmail").value = "";
  
  if(document.getElementById("loginMobile")) {
      document.getElementById("loginMobile").value = "";
  }
  if(document.getElementById("loginPassword")) {
      document.getElementById("loginPassword").value = "";
  }

  document.getElementById("regError").textContent = "";
  if(document.getElementById("loginError")) {
      document.getElementById("loginError").textContent = "";
  }

  document.getElementById("dashboardScreen").classList.add("hidden");
  document.getElementById("registerScreen").classList.remove("hidden");
    switchToRegister();
}


