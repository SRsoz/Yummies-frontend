import "../scss/style.scss"

// Grab references to form and input elements
const form = document.querySelector("form") as HTMLFormElement;
const usernameInput = document.getElementById("username") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;

// Listen for form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

    // Create a user object from the input values
  const user = {
    username: usernameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  };

  try {
     // Send registration data to backend
    const response = await fetch("https://yummies-vlth.onrender.com/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const data = await response.json();

    // If server responds with an error, show alert
    if (!response.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    alert("Registration succeeded");
    window.location.href = "signIn.html";
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong");
  }
});
