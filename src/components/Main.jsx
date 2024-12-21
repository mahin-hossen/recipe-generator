import React from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import { getRecipeFromMistral } from "./../ai.js"

export default function Main(){
    const [ingredients,setIngredients] = React.useState([]);
    
    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    function handleSubmit(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients =>{
            return [...prevIngredients,newIngredient]
        })
    }

    return(
        
        <main>
            <form action={handleSubmit} className="add-ingredient-form"
            >
                <input 
                    aria-label="Add ingredient"
                    type="text"
                    placeholder="e.g. onion"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {
                ingredients.length>0 && 
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }
            {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}