import { filterByDiets } from '../Redux/actions'

export const formatDiets = (diets) => {
  const options = diets.map((diet) => {
    return { name: diet.name, value: diet.name }
  })

  return { defaultOption: 'All', action: filterByDiets, options }
}
