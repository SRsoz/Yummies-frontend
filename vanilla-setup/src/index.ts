// Import the main SCSS styling file
import './scss/index.scss';

// Import functions for creating recipes and logging in
import { skapaRecept } from './TypeScript/createRecipe';
import { loggaIn } from './TypeScript/signIn';

// Call the imported functions to set up recipe creation and user login
skapaRecept();
loggaIn();

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

        <p>${recipe.title}</p>
      `;

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
