import { getAll, setCurrentRecipes } from '../../Redux/actions'
import CardContainer from '../CardContainer/CardContainer'
import { useSelector, useDispatch } from 'react-redux'
import { getPaginationInfo } from '../../lib/utils'
import Pagination from '../Pagination/Pagination'
import { formatDiets } from '../../lib/utils'
import { useState, useEffect } from 'react'
import Filters from '../Filters/Filters'
import styles from './Home.module.css'

const Home = () => {
  const dispatch = useDispatch()
  const diets = useSelector((state) => state.diets)
  const currentRecipes = useSelector((state) => state.currentRecipes)
  const recipes = useSelector((state) => state.recipes)
  const formatedDiets = formatDiets(diets)
  const [buttons, setButtons] = useState([])

  useEffect(() => {
    const { buttons, currentRecipes } = getPaginationInfo(recipes)
    setButtons(buttons)
    dispatch(setCurrentRecipes(currentRecipes))
  }, [recipes])

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  return (
    <main className={styles.home}>
      <h1>Henry Food</h1>
      <Pagination buttons={buttons} />
      <Filters diets={formatedDiets} />
      <CardContainer currentRecipes={currentRecipes} />
    </main>
  )
}

export default Home
