import Select from '../Select/Select'
import { selectValues } from '../../lib/consts'
import { Fragment } from 'react'

const Filters = ({ diets }) => {
  return (
    <main>
      <Select select={diets} />
      <>
        {selectValues.map((select, index) => (
          <Fragment key={index}>
            <Select select={select} />
          </Fragment>
        ))}
      </>
    </main>
  )
}

export default Filters
