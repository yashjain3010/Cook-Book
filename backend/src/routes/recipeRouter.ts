import axios from "axios";
import { Router,Request,Response } from "express";

const router = Router();

const FORKIFY_API_BASE_URL = process.env.FORKIFY_API_BASE_URL as string;

router.get('/search',async(req : Request,res : Response) => {
    const query = req.query.q as string;
    if(!query){
        return res.status(400).json({
            error : 'Query Parameter is Required'
        })
    }

    try{
        const response = await axios.get(`${FORKIFY_API_BASE_URL}/seach?q=${query}`)
        res.json(response.data);
    }
    catch(err){
        res.status(500).json({
            err : "Something went wrong"
        })
    }
})

router.get('/get',async (req : Request,res : Response) => {
    const recipeId = req.query.id as string;
    if(!recipeId){
        return res.status(400).json({
            error : "Recipe ID is required"
        })
    }

    try{
        const response = await axios.get(`${FORKIFY_API_BASE_URL}/get?rId=${recipeId}`)
        res.json(response.data);
    }
    catch(error){
        res.status(500).json({
            error : "Something went Wrong"
        })
    }
})

export default router;