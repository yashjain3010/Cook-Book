import axios from "axios";
import { Router,Request,Response } from "express";

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
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.get('/get',async (req : Request,res : Response) => {
    const recipeId = req.query.rId as string;
    if(!recipeId){
        return res.status(400).json({
            error : "Recipe ID is required"
        })
    }

    try{
        const response = await axios.get(`${process.env.FORKIFY_API_BASE_URL}/get?rId=${recipeId}`)
        res.json(response.data);
    }
    catch(error){
        res.status(500).json({
            error : "Something went Wrong"
        })
    }
})

export default router;