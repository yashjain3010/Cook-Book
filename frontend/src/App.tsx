import React, { useState } from "react";
import { searchRecipes, Recipe } from "./api";

const App = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const results = await searchRecipes(search);
      console.log(results);
      setRecipes(results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe.name}>
            <h2>{recipe.name}</h2>
            <img src={recipe.thumbnail_image} alt={recipe.name} />
            <p>Posted by: {recipe.posted_by}</p>
            <p>Posted at: {recipe.posted_at}</p>
            <p>Ingredients:</p>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <p>Instructions: {recipe.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
