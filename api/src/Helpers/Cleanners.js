// Limpia los datos del paso a paso de una receta
const stepsCleaner = (analyzedInstructions) => {
  if (analyzedInstructions.length === 0) return []
  const { steps } = analyzedInstructions[0]
  const cleanedSteps = []
  steps.forEach((step) => {
    cleanedSteps.push(step.step)
  })
  return cleanedSteps
}
// Limpia los datos de una receta
const recipeCleaner = (recipe) => {
  let { id, title, image, summary, healthScore, analyzedInstructions, diets, vegetarian } = recipe
  const steps = stepsCleaner(analyzedInstructions)
  const allDiets = diets.map((diet) => diet)
  summary = summary.replace(/<[^>]+>/g, '')
  if (vegetarian) {
    allDiets.push('vegetarian')
  }
  return { id, name: title, image, summary, healthScore, steps, diets: allDiets }
}

module.exports = {
  stepsCleaner,
  recipeCleaner
}
