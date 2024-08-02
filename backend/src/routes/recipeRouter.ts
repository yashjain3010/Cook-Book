import axios from "axios";
import { Router, Request, Response } from "express";

interface Recipe {
  name: string;
  instructions: string;
  thumbnail_image: string;
  posted_at: string;
  posted_by: string;
  ingredients: string[];
}

const getRandomDate = () => {
  const start = new Date();
  start.setFullYear(start.getFullYear() - 1); 
  const end = new Date();
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomDate.toISOString().split('T')[0]; 
};

const router = Router();

router.get("/search", async (req: Request, res: Response) => {
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get(
      `${process.env.FORKIFY_API_BASE_URL}/search?q=${query}`
    );

    const recipes = response.data.recipes.map((recipe: any) => ({
      name: recipe.title,
      instructions: `${recipe.source_url}`, 
      thumbnail_image: recipe.image_url,
      posted_at: getRandomDate(), 
      posted_by: recipe.publisher,
      ingredients: [`${recipe.publisher_url}`],
    }));

    console.log(recipes);

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/get", async (req: Request, res: Response) => {
  const recipeId = req.query.rId as string;

  if (!recipeId) {
    return res.status(400).json({ error: "Recipe ID is required" });
  }

  try {
    const response = await axios.get(
      `${process.env.FORKIFY_API_BASE_URL}/get?rId=${recipeId}`
    );

    const recipe: Recipe = {
      name: response.data.recipe.title,
      instructions: `${response.data.recipe.source_url}`, 
      thumbnail_image: response.data.recipe.image_url,
      posted_at: getRandomDate(), 
      posted_by: response.data.recipe.publisher,
      ingredients: [`${response.data.recipe.publisher_url}`], 
    };

    console.log(recipe); 

    res.json(recipe);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
