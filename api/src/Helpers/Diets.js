const { Diet } = require('../db')

const getAllDiets = async () => {
  const diets = await Diet.findAll()
  if (diets.length === 0) throw Error('No diets registered')
  return diets
}

const saveDiets = async (diets) => {
  diets.forEach(async (diet) => {
    await Diet.findOrCreate({ where: { name: diet } })
  })
}
module.exports = {
  getAllDiets,
  saveDiets
}
