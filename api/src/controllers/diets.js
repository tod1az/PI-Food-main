const { getAllDiets, updateDiets } = require('../Helpers/Diets')
const { getAllRecipesFromApi } = require('../Helpers/Recipe')

class Diets {
  static async getDiets(_, res) {
    try {
      const diets = await getAllDiets()
      return res.status(200).json(diets)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
  static async generateDiets(_, res) {
    try {
      const recipes = await getAllRecipesFromApi()
      const diets = await updateDiets(recipes)
      return res.status(200).json(diets)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

module.exports = Diets
