// Import the main SCSS styling file
import './scss/index.scss'; 

// Define the API endpoint for fetching recipes
const API_URL = "https://yummies-vlth.onrender.com/api/recipes/";

// Get DOM elements: the container where recipes will be displayed and the search input
const recipeGrid = document.querySelector(".recipes-grid");
const searchInput = document.querySelector('input[placeholder="Search specific recipe"]') as HTMLInputElement;

// Array to store all fetched recipes
let allRecipes: any[] = []; 

// Function to render recipes to the page
function displayRecipes(recipes: any[]) {
  if (recipeGrid) {
       // Clear existing content
    recipeGrid.innerHTML = '';

    // Create and append a card for each recipe
    recipes.forEach((recipe) => {
      const card = document.createElement('div');
      card.classList.add('recipes-card');

      // Basic HTML content for each recipe card
      card.innerHTML = `

        <h4>${recipe.title}</h4>
         <p>${recipe.instructions}</p>
        <div class="button-group">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;

      // EDIT BUTTON FUNCTIONALITY
      const editBtn = card.querySelector(".edit-btn") as HTMLButtonElement;
      editBtn.addEventListener("click", () => {
        const recipeId = recipe._id;
      localStorage.setItem("editRecipeId", recipeId);
        window.location.href = `updateRecipe.html?id=${recipe._id}`;
      });

      // DELETE BUTTON FUNCTIONALITY
      const deleteBtn = card.querySelector(".delete-btn") as HTMLButtonElement;
      deleteBtn.addEventListener("click", async () => {
        const confirmDelete = confirm("Are you sure you want to delete this recipe?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");
        try {
          const response = await fetch(`${API_URL}${recipe._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const data = await response.json();
            alert(data.message || "Failed to delete recipe");
            return;
          }

          // Remove from UI
          card.remove();
          allRecipes = allRecipes.filter((data) =>
            data._id !== recipe._id
          );

        } catch (error) {
          console.error("Error deleting recipe:", error);
        }
      });

      recipeGrid.appendChild(card);
    });
  }
}

// Function to fetch recipes from the API
async function fetchRecipes() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
        // Throw an error if the response is not successful
      throw new Error("something went wrong while loading recipe");
    }

    // Parse the JSON response
    const recipes = await response.json();
    allRecipes = recipes;
  
    // Display all recipes
    displayRecipes(allRecipes);
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error:', error);
  }
}

// Add an event listener to filter recipes as the user types in the search input
searchInput?.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  // Filter recipes that match the search term
  const filtered = allRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm)
  );
  // Display only the filtered recipes
  displayRecipes(filtered);
});

// Fetch and display recipes when the page loads
fetchRecipes();
