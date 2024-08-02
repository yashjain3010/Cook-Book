import { Recipe } from "../api"

interface Props {
    recipe : Recipe
}

const RecipeCard = ({recipe} : Props) => {
    return (
      <div className="recipe-card" key={recipe.name}>
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
    );
}

export default RecipeCard;