import { filterBySource, orderByHealthScore, orderByName } from '../Redux/actions'

export const selectValues = [
  {
    options: [
      { name: 'Data base', value: 'DB' },
      { name: 'Api', value: 'API' }
    ],
    defaultOption: 'All',
    action: filterBySource
  },
  {
    options: [
      { name: 'A-Z', value: 'A' },
      { name: 'Z-A', value: 'D' }
    ],
    defaultOption: 'Def',
    action: orderByName
  },
  {
    options: [
      { name: 'Lower Health Score To Higher', value: 'A' },
      { name: 'Higher Health Score To lower', value: 'D' }
    ],
    defaultOption: 'All',
    action: orderByHealthScore
  }
]
