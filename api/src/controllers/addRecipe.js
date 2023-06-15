const {Recipe} =require('../db')

const addRecipe =async(name,image,summary,healthScore,steps,diets)=>{
    const newRecipe = await Recipe.create({name,image,summary,healthScore,steps})
    diets.map(async(diet)=>await newRecipe.addDiets(diet.id))
    return {name,created:true}
}

module.exports = addRecipe;