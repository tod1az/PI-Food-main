const { getAllDiets, updateDiets } = require('../Helpers/Diets')
const { getAllRecipesFromApi } = require('../Helpers/Recipe')

class Diets {
  static async getDiets(_, res, next) {
    try {
      const diets = await getAllDiets()
      return res.status(200).json(diets)
    } catch (error) {
      return next(error)
    }
  }
  static async generateDiets(_, res, next) {
    try {
      const recipes = await getAllRecipesFromApi()
      const diets = await updateDiets(recipes)
      return res.status(200).json(diets)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = Diets
