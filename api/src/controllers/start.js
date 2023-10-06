const { Recipe, Diet } = require('../db')
const axios = require('axios')
const { API_KEY } = process.env
const { recipeCleaner } = require('../Helpers/Cleanners')
// const apiRecipes = require('../allApiRecipes')
// este endpoint trae 100 recetas con una serie de informacion.
const endpoint = 'https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true'

const start = async () => {
  const { data } = await axios.get(`${endpoint}&apiKey=${API_KEY}`)
  let diets = []
  let results = []
  // guarda las dietas que vienen en el array diets, ademas agrega la propiedad vegetarian si es que alguna lo trae en true.
  results = data.results.map((recipe) => {
    if (recipe.vegetarian && !diets.includes('vegetarian')) diets = [...diets, 'vegetarian']
    recipe.diets.forEach((diet) => {
      if (!diets.includes(diet)) {
        diets = [...diets, diet]
      }
    })
    return recipeCleaner(recipe)
  })

  // sin api
  // results = apiRecipes.map((recipe)=>{
  //     if(recipe.vegetarian&&!diets.includes('vegetarian')) diets =[...diets,'vegetarian']
  //     recipe.diets.map((diet)=>{
  //         if(!diets.includes(diet)){
  //             diets = [...diets,diet]
  //         }
  //     })
  //     return recipeCleaner(recipe)
  // })

  const dbFound = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
  results = [...results, ...dbFound]

  diets.map(async (diet) => {
    await Diet.findOrCreate({ where: { name: diet } })
  })

  const dbDiets = await Diet.findAll()

  return { recipes: results, diets: dbDiets }
}

module.exports = start
