import { filterByDiets } from '../Redux/actions'

export const formatDiets = (diets) => {
  const options = diets.map((diet) => {
    return { name: diet.name, value: diet.name }
  })

  return { defaultOption: 'All', action: filterByDiets, options }
}

export const getPaginationInfo = (recipes) => {
  const show = 9
  const numeros = []
  const paginas = Math.ceil(recipes.length / show)
  for (let i = 1; i <= paginas; i++) {
    numeros.push(i)
  }

  return {
    buttons: numeros,
    currentRecipes: recipes.slice(0, show)
  }
}
