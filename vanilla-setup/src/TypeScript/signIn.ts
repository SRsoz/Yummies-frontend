// Function to simulate user login (used for logging/debugging)
export function loggaIn() {
  console.log("Användare loggar in...");
}
// Grabbing references to the form and input fields
const form = document.querySelector("form") as HTMLFormElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;

// Listen for form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the page from refreshing

    // Create a user object from the form inputs
  const user = {
    email: emailInput.value,
    password: passwordInput.value
  };

  try {
    // Send login request to the server
    const response = await fetch("https://yummies-vlth.onrender.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const data = await response.json();

    // Handle error response
    if (!response.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // Save token to local storage and redirect user
    localStorage.setItem("token", data.token);
    alert("Sign in succeeded");
    window.location.href = "index.html"; 
  } catch (err) {
    console.error("Error:", err);
    alert("Couldn't log in");
  }
});
