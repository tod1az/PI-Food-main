const { getAllDiets } = require('../Helpers/Diets')

class Diets {
  static async getDiets(req, res) {
    try {
      const diets = await getAllDiets()
      return res.status(200).json(diets)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = Diets
