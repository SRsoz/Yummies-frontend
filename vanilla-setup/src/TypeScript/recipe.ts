import "../scss/recipe.scss";
const API_URL = import.meta.env.VITE_API_URL;

const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

const titleEl = document.getElementById("recipe-title") as HTMLElement;
const imageEl = document.getElementById("recipe-image") as HTMLImageElement;
const ingredientsEl = document.getElementById("recipe-ingredients") as HTMLElement;
const instructionsEl = document.getElementById("recipe-instructions") as HTMLElement;

async function fetchRecipe() {
  if (!recipeId) return;

  try {
    const response = await fetch(`${API_URL}${recipeId}`);
    if (!response.ok) throw new Error("Failed to fetch recipe");

    const recipe = await response.json();

    titleEl.textContent = recipe.title;
    imageEl.src = recipe.image || '';
    imageEl.alt = recipe.title;
    
    ingredientsEl.innerHTML = '';
    recipe.ingredients.forEach((ingredient: string) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ingredientsEl.appendChild(li);
    });

    instructionsEl.textContent = recipe.instructions;

  } catch (error) {
    console.error("Error fetching recipe:", error);
    titleEl.textContent = "Recipe not found";
  }
}

fetchRecipe();
