import express from 'express';
import dotenv from 'dotenv';
import recipeRouter from './routes/recipeRouter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api',recipeRouter);

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
});

export default app;