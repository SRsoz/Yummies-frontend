import '../scss/createRecipe.scss';

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "signIn.html";
}

const saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
const cancelBtn = document.getElementById("cancelBtn") as HTMLButtonElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const ingredientsInput = document.getElementById("ingredients") as HTMLTextAreaElement;
const instructionsInput = document.getElementById("instructions") as HTMLTextAreaElement;

saveBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const recipe = {
    title: titleInput.value.trim(),
    ingredients: ingredientsInput.value.split(",").map(i => i.trim()),
    instructions: instructionsInput.value.trim(),
  };

  try {
    const response = await fetch("https://yummies-vlth.onrender.com/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recipe),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Could not save recipe");
      return;
    }

    alert("Recipe saved!");
    window.location.href = "index.html";
  } catch (err) {
    console.error("Error saving recipe:", err);
    alert("Something went wrong");
  }
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.history.back();
});