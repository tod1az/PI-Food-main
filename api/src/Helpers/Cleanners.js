
const stepsCleaner = (analyzedInstructions) => {
  if (analyzedInstructions.length === 0) return []
  const { steps } = analyzedInstructions[0]
  const cleanedSteps = []
  steps.forEach((step) => {
    cleanedSteps.push(step.step)
  })
  return cleanedSteps
}

const recipeCleaner = (recipe) => {
  let { id, title, image, summary, healthScore, analyzedInstructions, diets, vegetarian } = recipe
  const steps = stepsCleaner(analyzedInstructions)
  summary = summary.replace(/<[^>]+>/g, '')
  if (vegetarian) {
    diets.push('vegetarian')
  }
  return { id, name: title, image, summary, healthScore, steps, diets }
}

const dietCleaner = (diets) => {
  return diets.map((diet) => diet.name)
}

const dbRecipeCleaner = (recipe) => {
  const { dataValues } = recipe
  return { ...dataValues, diets: dietCleaner(dataValues.diets) }

}

module.exports = {
  stepsCleaner,
  recipeCleaner,
  dbRecipeCleaner
}
