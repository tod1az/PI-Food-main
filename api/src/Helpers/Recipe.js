const { Recipe, Diet } = require('../db')
const axios = require('axios')
require('dotenv').config()
const { API_KEY } = process.env
const { recipeCleaner } = require('../Helpers/Cleanners')
const results = require('../allApiRecipes')
require('dotenv').config()

const addRecipe = async (name, image, summary, healthScore, steps, diets) => {
  const [newRecipe, created] = await Recipe.findOrCreate({ where: { name, image, summary, healthScore, steps } })
  if (created) {
    diets.forEach(async (diet) => await newRecipe.addDiets(diet.id))
  }
  return {
    name,
    created
  }
}

const getRecipeFromDb = async (id) => {
  return await Recipe.findOne({
    where: { id },
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
}

const getRecipeFromApi = async (id) => {
  // const URL = 'https://api.spoonacular.com/recipes/'
  // const { data } = await axios.get(`${URL}${id}/information?apiKey=${API_KEY}`)
  // return data
  const recipe = results.filter((recipe) => recipe.id === id)
  return recipe
}

const getAllRecipesFromDb = async () => {
  return await Recipe.findAll()
}

const getAllRecipesFromApi = async () => {
  // const URL = 'https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true'
  // const { data } = await axios.get(`${URL}&apiKey=${API_KEY}`)
  // return data.results
  return results
}

const getRecipeById = async (id) => {
  let recipe
  if (id.includes('-')) {
    recipe = await getRecipeFromDb(id)
  } else {
    recipe = await getRecipeFromApi(id)
  }
  return recipeCleaner(recipe)
}

const filterByName = ({ recipes, name }) => {
  const lowerCasedName = name.toLowerCase()
  return recipes.filter((recipe) => recipe.name.toLowerCase().includes(lowerCasedName))
}

const getAllRecipes = async (name) => {
  const dbRecipes = await getAllRecipesFromDb()
  const apiRecipes = await getAllRecipesFromApi()
  let recipes = [...apiRecipes, ...dbRecipes]
  recipes = recipes.map((recipe) => recipeCleaner(recipe))
  if (name) {
    return filterByName({ recipes, name })
  } else return recipes
}

module.exports = {
  addRecipe,
  getRecipeById,
  getAllRecipes,
  getAllRecipesFromDb,
  getAllRecipesFromApi
}
