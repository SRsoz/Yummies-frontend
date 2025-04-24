// Get references to HTML elements
const saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const ingredientsInput = document.getElementById("ingredients") as HTMLTextAreaElement;
const instructionsInput = document.getElementById("instructions") as HTMLTextAreaElement;

// Add event listener to the Save button
saveBtn.addEventListener("click", async (e) => {
  e.preventDefault();

   // Collect data from input fields
  const recipe = {
    title: titleInput.value,
    ingredients: ingredientsInput.value,
    instructions: instructionsInput.value,
  };

  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    // If no token is found, block the action
    if (!token) {
      alert("You must be logged in to create a recipe.");
      return;
    }

    // Send POST request to backend API to create a new recipe
    const response = await fetch("https://yummies-vlth.onrender.com/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recipe),
    });

    const data = await response.json();

     // Handle error from API
    if (!response.ok) {
      alert(data.message || "Could not save recipe");
      return;
    }

    // On success, notify the user and redirect to homepage
    alert("Recipe saved!");
    window.location.href = "index.html"; 
  } catch (err) {
    // Handle fetch/network errors
    console.error("Error saving recipe:", err);
    alert("Something went wrong");
  }
});
