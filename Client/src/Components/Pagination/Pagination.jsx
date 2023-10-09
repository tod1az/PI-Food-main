import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentRecipes } from '../../Redux/actions'
import styles from './Pagination.module.css'

const Pagination = ({ buttons }) => {
  const [disablePrevious, setDisablePrevious] = useState(true)
  const [disableNext, setDisableNext] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const recipes = useSelector((state) => state.recipes)
  const show = 9
  const dispatch = useDispatch()

  const buttonHandler = (num) => {
    setCurrentPage(num)
    dispatch(setCurrentRecipes(recipes.slice(show * (num - 1), show * num)))
    if (num === 1) {
      setDisablePrevious(true)
    } else setDisablePrevious(false)

    if (num === buttons.length) {
      setDisableNext(true)
    } else setDisableNext(false)
  }

  return (
    <main className={styles.buttonContainer}>
      <button className={styles.button} disabled={disablePrevious} onClick={() => buttonHandler(currentPage - 1)} name="prev">
        Previous
      </button>
      {buttons.map((num, index) => (
        <button className={currentPage === num ? styles.selected : styles.button} key={index} onClick={(e) => buttonHandler(num, e)}>
          {num}
        </button>
      ))}
      <button className={styles.button} disabled={disableNext} onClick={() => buttonHandler(currentPage + 1)} name="next">
        Next
      </button>
    </main>
  )
}

export default Pagination
