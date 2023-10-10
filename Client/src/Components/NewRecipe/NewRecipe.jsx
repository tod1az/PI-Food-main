import styles from './newRecipe.module.css'
import { useEffect, useState } from 'react'
import { validateRecipe } from '../Validate'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getDiets } from '../../Redux/actions'
import axios from 'axios'

const NewRecipe = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch])

  const diets = useSelector((state) => state.diets)
  const navigate = useNavigate()

  const [recipe, setRecipe] = useState({
    name: '',
    image: '',
    steps: [''],
    diets: [],
    summary: '',
    healthScore: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    image: '',
    steps: '',
    diets: '',
    summary: '',
    healthScore: ''
  })
  const [disableSubmit, setDisableSubmit] = useState(true)

  const disableHandler = (errors) => {
    if (errors.name || errors.image || errors.steps || errors.diets || errors.summary || errors.healthScore) {
      setDisableSubmit(true)
    } else setDisableSubmit(false)
  }

  const dietHandler = (e) => {
    if (e.target.checked) {
      const newDiets = [...recipe.diets, { id: e.target.value, name: e.target.name }]
      const modifiedRecipe = { ...recipe, diets: newDiets }
      setRecipe(modifiedRecipe)
      setErrors(validateRecipe(modifiedRecipe))
      disableHandler(validateRecipe(modifiedRecipe))
    } else {
      const newDiets = recipe.diets.filter((diet) => diet.id !== e.target.value)
      const modifiedRecipe = { ...recipe, diets: newDiets }
      setRecipe(modifiedRecipe)
      setErrors(validateRecipe(modifiedRecipe))
      disableHandler(validateRecipe(modifiedRecipe))
    }
  }

  const changeHandler = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value })
    setErrors(validateRecipe({ ...recipe, [e.target.name]: e.target.value }))
    disableHandler(validateRecipe({ ...recipe, [e.target.name]: e.target.value }))
  }

  const stepsHandler = (searchedIndex, e) => {
    const newSteps = recipe.steps.map((step, index) => {
      if (index === searchedIndex) {
        return e.target.value
      }
      return step
    })
    setRecipe({ ...recipe, steps: newSteps })
    setErrors(validateRecipe({ ...recipe, steps: newSteps }))
    disableHandler(validateRecipe({ ...recipe, steps: newSteps }))
  }

  const addInput = () => {
    setRecipe({ ...recipe, steps: [...recipe.steps, ''] })
  }

  const postHandler = async () => {
    const endpoint = 'http://localhost:3001/recipes'
    const res = await axios.post(endpoint, recipe)
    if (res.data.created) {
      alert(`The recipe ${res.data.name} has been successfully added`)
      navigate('/home')
    } else alert(`The recipe ${recipe.name} already exists`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    postHandler()
  }

  const deleteStep = (index) => {
    if (recipe.steps.length === 1) {
      setRecipe({ ...recipe, steps: [''] })
    } else {
      const newSteps = recipe.steps.filter((step, currentIndex) => index !== currentIndex)
      setRecipe({ ...recipe, steps: newSteps })
    }
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={submitHandler} className={styles.form}>
        <h1>New Recipe</h1>
        {/* Nombre, imagen, paso a paso, dietas,resumen */}
        <label htmlFor="name">Name: </label>
        <input placeholder="Here goes your recipe's name" name="name" value={recipe.name} onChange={changeHandler} />
        {errors.name && <p className={styles.errors}>{errors.name}</p>}

        <label htmlFor="Image">Image(url): </label>
        <input type="text" placeholder="httsp://yourimage.com" name="image" value={recipe.image} onChange={changeHandler} />
        {errors.image && <p className={styles.errors}>{errors.image}</p>}

        <label htmlFor="steps">
          Step by step process
          <button type="button" className={styles.button} onClick={() => addInput()}>
            +
          </button>{' '}
        </label>
        {recipe.steps.map((step, index) => {
          return (
            <div key={index} className={styles.steps}>
              <input placeholder="Step:example" value={step} onChange={(e) => stepsHandler(index, e)} />
              <p onClick={() => deleteStep(index)}>X</p>
            </div>
          )
        })}
        {errors.steps && <p className={styles.errors}>{errors.steps}</p>}

        <label htmlFor="summary">Summary: </label>
        <textarea type="text" name="summary" value={recipe.summary} onChange={changeHandler} />
        {errors.summary && <p className={styles.errors}>{errors.summary}</p>}

        <label htmlFor="healtScore">Health Score: </label>
        <input type="text" name="healthScore" value={recipe.healthScore} onChange={changeHandler} />
        {errors.healthScore && <p className={styles.errors}>{errors.healthScore}</p>}

        {/* dietas */}
        <label>Diets</label>
        {diets.map((diet, index) => {
          return (
            <div key={index} className={styles.diets}>
              <label htmlFor={diet.name}>{diet.name}</label>
              <input type="checkbox" onChange={dietHandler} name={diet.name} value={diet.id} />
            </div>
          )
        })}
        {errors.diets !== '' && <p className={styles.errors}>{errors.diets}</p>}
        <button disabled={disableSubmit} className={styles.submit} type="submit">
          Submit:{' '}
        </button>
      </form>
    </div>
  )
}

export default NewRecipe
