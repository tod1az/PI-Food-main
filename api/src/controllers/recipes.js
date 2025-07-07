const ERRORS = require('../errors/errors')
const {
  getRecipeById,
  getAllRecipes,
  addRecipe,
  getAllByName
} = require('../Helpers/Recipe')
const { validateFields } = require('../Helpers/Validation')

class Recipes {
  static async getRecipes(req, res, next) {
    const { name } = req.query
    try {
      const result = name
        ? await getAllByName(name)
        : await getAllRecipes()

      return res.status(200).json(result)
    } catch (error) {
      return next(error)
    }
  }

  static async getRecipe(req, res, next) {
    const { idRecipe } = req.params
    try {
      const recipe = await getRecipeById(idRecipe)
      return res.status(200).json(recipe)
    } catch (error) {
      return next(error)
    }
  }

  static async saveRecipe(req, res, next) {
    const { name, image, summary, healthScore, steps, diets } = req.body
    try {
      validateFields(req.body)
      const { dataValues } = await addRecipe(name, image, summary, healthScore, steps, diets)
      return res.status(200).json({
        message: `${dataValues.name}, created successfully!`,
        recipe: dataValues
      })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = Recipes
