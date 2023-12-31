const axios = require('axios')
require('dotenv').config()
const { API_KEY } = process.env
const { Recipe, Diet } = require('../db')
const { Op } = require('sequelize')

const { recipeCleaner } = require('../Helpers/Cleanners')
// const resultsApi = require('../allApiRecipes')

const getRecipeByName = async (name) => {
  // Trayendo las recetas desde un archivo
  // const apiRecipes = resultsApi.map((recipe)=>recipeCleaner(recipe))
  const URL = 'https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true'

  // Peticion a la api de las 100 recetas con las que estamos trabajando
  const { data } = await axios.get(`${URL}&apiKey=${API_KEY}`)
  // Seleccion de datos
  const apiRecipes = data.results.map((recipe) => recipeCleaner(recipe))
  const lowerCasedName = name.toLowerCase()
  const apiRecipesFiltered = apiRecipes.filter((recipe) => recipe.name.toLowerCase().includes(lowerCasedName))
  // Traer desde la base de datos
  const dbFound = await Recipe.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`
      }
    },
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
  return [...apiRecipesFiltered, ...dbFound]
}

module.exports = getRecipeByName
