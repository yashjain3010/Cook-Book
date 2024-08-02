export interface Recipe {
  name: string;
  instructions: string;
  thumbnail_image: string;
  posted_at: string;
  posted_by: string;
  ingredients: string[];
}

export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  const response = await fetch(`http://localhost:3000/api/search?q=${query}`);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const data = await response.json();

  console.log(data);

  if (!Array.isArray(data)) {
    throw new Error("API did not return an array");
  }
  return data;
};
