const { getRecipeById, getAllRecipes, addRecipe, getAllByName } = require('../Helpers/Recipe')

class Recipes {
  static async getRecipes(req, res) {
    const { name } = req.query
    try {
      let result
      result = name
        ? await getAllByName(name)
        : await getAllRecipes()

      return res.status(200).json(result)
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
      return res.status(500).json({ error: error.message })
    }
  }

  static async saveRecipe(req, res) {
    const { name, image, summary, healthScore, steps, diets } = req.body
    try {
      const { dataValues } = await addRecipe(name, image, summary, healthScore, steps, diets)
      return res.status(200).json({
        message: `${dataValues.name}, created successfully!`,
        recipe: dataValues
      })
    } catch (error) {
      return res.json({ error: error.message })
    }
  }
}

module.exports = Recipes
