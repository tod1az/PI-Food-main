const axios = require('axios')
require('dotenv').config()
const { API_KEY } = process.env
const { Recipe, Diet } = require('../db')
const { recipeCleaner } = require('../Helpers/Cleanners')
// const apiRecipes = require('../allApiRecipes')

const URL = 'https://api.spoonacular.com/recipes/'

const getRecipeById = async (id) => {
  // divido el id por caracter
  const splitID = id.split('')

  if (splitID.includes('-')) {
    const recipe = await Recipe.findOne({
      where: { id },
      include: {
        model: Diet,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    })
    return recipe
  } else {
    // si no funciona la api
    // let cleanData = apiRecipes.map((recipe)=>recipeCleaner(recipe))
    // cleanData = cleanData.find(recipe=>recipe.id===Number(id))

    // si funciona la api estas dos lineas
    const { data } = await axios.get(`${URL}${id}/information?apiKey=${API_KEY}`)
    const cleanData = recipeCleaner(data)

    return cleanData
  }
}
module.exports = getRecipeById
