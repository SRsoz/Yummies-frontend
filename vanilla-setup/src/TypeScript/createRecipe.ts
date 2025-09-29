import '../scss/createRecipe.scss'; 

const saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const ingredientsInput = document.getElementById("ingredients") as HTMLTextAreaElement;
const instructionsInput = document.getElementById("instructions") as HTMLTextAreaElement;
const imageInput = document.getElementById("image") as HTMLInputElement;

saveBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", titleInput.value);
  formData.append("ingredients", ingredientsInput.value);
  formData.append("instructions", instructionsInput.value);

  if (imageInput.files && imageInput.files[0]) {
    formData.append("image", imageInput.files[0]);
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a recipe.");
      return;
    }

    const response = await fetch("https://yummies-vlth.onrender.com/api/recipes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
