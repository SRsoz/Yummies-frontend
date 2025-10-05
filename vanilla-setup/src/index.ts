import "./scss/index.scss";

interface Recipe {
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  image?: string;
}

const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.querySelector(
  'input[placeholder="Search specific recipe"]'
) as HTMLInputElement;

const API_URL = import.meta.env.VITE_API_URL;

let allRecipes: Recipe[] = [];

function displayRecipes(recipes: Recipe[]) {
  if (!recipeContainer) return;

  recipeContainer.innerHTML = "";

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipes-card");

    card.innerHTML = `
      <img src="${recipe.image || "./public/placeholder.jpg"}" alt="${recipe.title
      }">
      <div class="card-content">
        <h4>${recipe.title}</h4>
        <p>${recipe.instructions
        .split(" ")
        .slice(0, 15)
        .join(" ")}...</p>
      </div>
      <div class="button-group">
        <button class="view-btn">View Recipe</button>
      </div>
    `;

    const viewBtn = card.querySelector(".view-btn") as HTMLButtonElement;
    viewBtn.addEventListener("click", () => {
      window.location.href = `recipe.html?id=${recipe._id}`;
    });

    recipeContainer.appendChild(card);
  });
}

async function fetchRecipes() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data: Recipe[] = await response.json();

    if (!response.ok) {
      throw new Error((data as any).message || "Could not get recipes");
    }

    allRecipes = data;
    displayRecipes(allRecipes);
  } catch (error) {
    console.error(error);
    window.alert("Something went wrong when trying to fetch recipes");
  }
}

searchInput?.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm)
  );
  displayRecipes(filtered);
});

fetchRecipes();
