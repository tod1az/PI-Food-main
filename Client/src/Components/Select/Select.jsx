import { useDispatch } from 'react-redux'

const Select = ({ select }) => {
  const dispatch = useDispatch()

  const selectChangeHandler = (e) => {
    dispatch(select.action(e.target.value))
  }

  return (
    <select onChange={selectChangeHandler}>
      <option value={select.defaultOption}>{select.defaultOption}</option>
      {select.options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

export default Select
