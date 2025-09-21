import "../scss/recipe.scss";

const API_URL = import.meta.env.VITE_API_URL;

const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");
console.log("Recipe ID:", recipeId);

const titleEl = document.getElementById("recipe-title") as HTMLElement | null;
const imageEl = document.getElementById("recipe-image") as HTMLImageElement | null;
const ingredientsEl = document.getElementById("recipe-ingredients") as HTMLElement | null;
const instructionsEl = document.getElementById("recipe-instructions") as HTMLElement | null;

type Recipe = {
  title: string;
  image?: string;
  ingredients: string[];
  instructions: string;
};

if (!recipeId || !titleEl || !imageEl || !ingredientsEl || !instructionsEl) {
  console.error("Missing elements or recipeId");
} else {
  async function fetchRecipe() {
    try {
      const response = await fetch(`${API_URL}/${recipeId}`);
      if (!response.ok) throw new Error("Failed to fetch recipe");

      const recipe: Recipe = await response.json();

      if (titleEl) {
        titleEl.textContent = recipe.title ?? "Untitled";
      }
      if (imageEl) {
        imageEl.src = recipe.image || "/placeholder.jpg";
        imageEl.alt = recipe.title ?? "Recipe image";
      }

      if (ingredientsEl) {
        ingredientsEl.innerHTML = "";
        if (Array.isArray(recipe.ingredients)) {
          recipe.ingredients.forEach((ingredient: string) => {
            const li = document.createElement("li");
            li.textContent = ingredient;
            ingredientsEl.appendChild(li);
          });
        }
      }

      if (instructionsEl) {
        instructionsEl.textContent = recipe.instructions ?? "";
      }

    } catch (error) {
      console.error("Error fetching recipe:", error);
      if (titleEl) {
        titleEl.textContent = "Recipe not found";
      }
      if (imageEl) {
        imageEl.src = "/placeholder.jpg";
      }
      if (ingredientsEl) {
        ingredientsEl.innerHTML = "";
      }
      if (instructionsEl) {
        instructionsEl.textContent = "";
      }
    }
  }

  fetchRecipe();
}