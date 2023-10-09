import styles from './Home.module.css'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAll } from '../../Redux/actions'
import { useState, useEffect } from 'react'
import Select from '../Select/Select'
import CardContainer from '../CardContainer/CardContainer'
import { selectValues } from '../../lib/consts'
import { formatDiets } from '../../lib/utils'

const Home = () => {
  const dispatch = useDispatch()
  let diets = useSelector((state) => state.diets)
  const formatedDiets = formatDiets(diets)

  const [disablePrevious, setDisablePrevious] = useState(true)
  const [disableNext, setDisableNext] = useState(false)

  const [pag, setPag] = useState([])

  const [currentPage, setCurrentPage] = useState(0)

  const [currentRecipes, setCurrentRecipes] = useState([])

  const show = 9
  const recipes = useSelector((state) => state.recipes)
  const paginate = () => {
    // agrego la cantidad de botones necesarios de acuerdo a la cantidad de recetas
    // para que se muestren nueve por pagina
    const numeros = []
    const paginas = Math.ceil(recipes.length / show)
    for (let i = 1; i <= paginas; i++) {
      numeros.push(i)
    }
    setPag(numeros)
    setCurrentRecipes(recipes.slice(0, show))
    setCurrentPage(1)
    setDisablePrevious(true)
  }

  const buttonHandler = (num) => {
    setCurrentPage(num)
    setCurrentRecipes(recipes.slice(show * (num - 1), show * num))
    if (num === 1) {
      setDisablePrevious(true)
    } else setDisablePrevious(false)

    if (num === pag.length) {
      setDisableNext(true)
    } else setDisableNext(false)
  }

  useEffect(() => {
    paginate()
  }, [recipes])

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  //= ==========================================//
  return (
    <main className={styles.home}>
      <Select select={formatedDiets} />
      <>
        {selectValues.map((select, index) => (
          <Fragment key={index}>
            <Select select={select} />
          </Fragment>
        ))}
      </>

      <h1>Henry Food</h1>
      <CardContainer currentRecipes={currentRecipes} />
      {recipes.length >= 9 && (
        <div className={styles.buttonContainer}>
          <button className={styles.button} disabled={disablePrevious} onClick={() => buttonHandler(currentPage - 1)} name="prev">
            Previous
          </button>
          {pag.map((num, index) => (
            <button className={currentPage === num ? styles.selected : styles.button} key={index} onClick={(e) => buttonHandler(num, e)}>
              {num}
            </button>
          ))}
          <button className={styles.button} disabled={disableNext} onClick={() => buttonHandler(currentPage + 1)} name="next">
            Next
          </button>
        </div>
      )}
    </main>
  )
}

export default Home
