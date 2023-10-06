const { getRecipeById, getAllRecipes, addRecipe } = require('../Helpers/Recipe')

class Recipes {
  static async getRecipes(req, res) {
    const { name } = req.query
    try {
      const recipes = await getAllRecipes(name)
      return res.status(200).json(recipes)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async getRecipe(req, res) {
    const { idRecipe } = req.params
    try {
      const recipe = await getRecipeById(idRecipe)
      return res.status(200).json(recipe)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async saveRecipe(req, res) {
    const { name, image, summary, healthScore, steps, diets } = req.body
    try {
      const creada = await addRecipe(name, image, summary, healthScore, steps, diets)
      return res.status(200).json(creada)
    } catch (error) {
      return res.json({ error: error.message })
    }
  }
}

module.exports = Recipes
