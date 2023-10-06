const { Recipe } = require('../db')

const addRecipe = async (name, image, summary, healthScore, steps, diets) => {
  const [newRecipe, created] = await Recipe.findOrCreate({ where: { name, image, summary, healthScore, steps } })
  created && diets.map(async (diet) => await newRecipe.addDiets(diet.id))

  return { name, created }
}

module.exports = addRecipe
