let users = JSON.parse(localStorage.getItem("users")) || [];

function handleSubmit() {
  let name = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      "Password must contain at least one letter and one number, and be at least 8 characters long."
    );
    return;
  }

  var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailReg.test(email)) {
    alert("enter correct email");
  }

  let user = {
    name: name,
    email: email,
    password: password,
  };
  if (users.some((user) => user.email === email)) {
    alert("email already exists");
    return;
  }
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "data.html";
}

document.getElementById("btn").addEventListener("click", () => handleSubmit());
