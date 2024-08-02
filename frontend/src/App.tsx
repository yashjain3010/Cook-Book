import React, { useState } from "react";
import { searchRecipes, Recipe } from "./api";
import RecipeCard from "./components/RecipeCard";

const App = () => {
  const [search, setSearch] = useState<string>("");
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
          <RecipeCard recipe={recipe}/>
        ))}
      </div>
    </div>
  );
};

export default App;
