const { Diet } = require('../db')
const ERRORS = require('../errors/errors')

const getAllDiets = async () => {
  const diets = await Diet.findAll()
  if (diets.length === 0) throw ERRORS.notFound('No diets registered')
  return diets
}

const extractDiets = (recipes) => {
  const diets = new Set()
  recipes.forEach((recipe) => {
    recipe.diets.forEach((diet) => {
      diets.add(diet)
    })
  })
  return diets
}

const saveDiets = async (diets) => {
  for (const diet of diets) {
    await Diet.findOrCreate({ where: { name: diet } })
  }
}

const updateDiets = async (recipes) => {
  const diets = extractDiets(recipes)
  await saveDiets(diets)
  return await getAllDiets()
}

module.exports = {
  getAllDiets,
  saveDiets,
  extractDiets,
  updateDiets
}
