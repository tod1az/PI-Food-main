const { Recipe, Diet } = require('../db')
const axios = require('axios')
require('dotenv').config()
const { API_KEY } = process.env
const { recipeCleaner, dbRecipeCleaner } = require('../Helpers/Cleanners')
const results = require('../allApiRecipes')
const { Op } = require('sequelize')
require('dotenv').config()

const addRecipe = async (name, image, summary, healthScore, steps, diets) => {
  const [newRecipe, created] = await Recipe.findOrCreate({
    where: {
      name,
      image,
      summary,
      healthScore,
      steps
    }
  })
  if (created) {
    for (let i = 0; i < diets.length; i++) {
      await newRecipe.addDiets(diets[i].id)
    }
  }
  return newRecipe

}

const getRecipeFromDb = async (id) => {
  const result = await Recipe.findOne({
    where: { id },
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
  return dbRecipeCleaner(result)
}

const getRecipeFromApi = async (id) => {
  // const URL = 'https://api.spoonacular.com/recipes/'
  // const { data } = await axios.get(`${URL}${id}/information?apiKey=${API_KEY}`)
  // return data

  const recipe = results.find((recipe) => recipe.id === id)
  if (!recipe) {
    throw Error("not found")
  }
  return recipeCleaner(recipe)
}

const getAllRecipesFromDb = async () => {
  let results = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
  return results
    ? results.map((recipe) => dbRecipeCleaner(recipe))
    : []
}

const getAllRecipesFromApi = async () => {
  // const URL = 'https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true'
  // const { data } = await axios.get(`${URL}&apiKey=${API_KEY}`)
  // return data.results
  return results.map((recipe) => recipeCleaner(recipe))
}

const getRecipeById = async (id) => {
  let recipe
  if (isNaN(Number(id))) {
    recipe = await getRecipeFromDb(id)
  } else {
    recipe = await getRecipeFromApi(Number(id))
  }
  return recipe
}

const filterByName = (name) => {
  const lowerCasedName = name.toLowerCase()
  let result = results.filter((recipe) => recipe.title.toLowerCase().includes(lowerCasedName))
  result = result.length !== 0
    ? result.map((recipe) => recipeCleaner(recipe))
    : []
  return result
}

const dbGetByName = async (name) => {
  let results = await Recipe.findAll({
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
  return results
    ? results.map((recipe) => dbRecipeCleaner(recipe))
    : []
}

const getAllByName = async (name) => {
  let dbResult = await dbGetByName(name)
  let apiResult = filterByName(name)

  const totalResult = [...dbResult, ...apiResult]

  if (totalResult.length === 0) {
    throw Error("not found")
  }

  return totalResult
}

const getAllRecipes = async () => {

  const dbRecipes = await getAllRecipesFromDb()
  let apiRecipes = await getAllRecipesFromApi()

  return [...apiRecipes, ...dbRecipes]
}

module.exports = {
  addRecipe,
  getRecipeById,
  getAllRecipes,
  getAllRecipesFromDb,
  getAllRecipesFromApi,
  getAllByName
}
