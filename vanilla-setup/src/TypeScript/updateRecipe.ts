import "../scss/updateRecipe.scss";

// Get the recipe ID from localStorage
const recipeId = localStorage.getItem("editRecipeId");

// If a recipe ID exists, fetch the recipe details
if (recipeId) {
    fetch(`https://yummies-vlth.onrender.com/api/recipes/${recipeId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then(res => res.json())
        .then(recipe => {
             // Populate the form with the existing recipe details
            (document.querySelector(".title-input") as HTMLInputElement).value = recipe.title;
            (document.querySelector("#ingredients") as HTMLTextAreaElement).value = recipe.ingredients;
            (document.querySelector("#instructions") as HTMLTextAreaElement).value = recipe.instructions;
        })
        .catch(error => {
            console.error("Error fetching recipe:", error);
        });
}

// Save button functionality
const saveBtn = document.getElementById("save-btn") as HTMLButtonElement;
saveBtn?.addEventListener("click", async () => {
    const updatedRecipe = {
        title: (document.querySelector(".title-input") as HTMLInputElement).value,
        ingredients: (document.querySelector("#ingredients") as HTMLTextAreaElement).value,
        instructions: (document.querySelector("#instructions") as HTMLTextAreaElement).value,
    };

    const response = await fetch(`https://yummies-vlth.onrender.com/api/recipes/${recipeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedRecipe),
    });

    if (response.ok) {
        alert("Recipe updated!");
        window.location.href = "index.html";
    } else {
        alert("You can only edit your own recipes!");
    }
});
