const { getRecipesAndDiets } = require('../Helpers/Start')

class Start {
  static async getRecipesAndDiets(req, res) {
    try {
      const recipesAndDiets = await getRecipesAndDiets()
      return res.status(200).json(recipesAndDiets)
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }
}

module.exports = Start
