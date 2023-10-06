const { getAllRecipes } = require('../Helpers/Recipe')
const { saveDiets } = require('../Helpers/Diets')

const extractDiets = (recipes) => {
  const diets = []
  recipes.forEach((recipe) => {
    recipe.diets.forEach((diet) => {
      if (!diets.includes(diet)) {
        diets.push(diet)
      }
    })
  })
  return diets
}

const getRecipesAndDiets = async () => {
  const recipes = await getAllRecipes()
  const diets = extractDiets(recipes)

  saveDiets(diets)

  return { recipes, diets }
}

module.exports = {
  extractDiets,
  getRecipesAndDiets
}
