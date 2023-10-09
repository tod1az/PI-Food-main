import axios from 'axios'
import {
  GET_DIETS,
  GET_ALL,
  FILTER_DIETS,
  FILTER_BY_SOURCE,
  ORDER_BY_NAME,
  ORDER_BY_HEALTHSCORE,
  GET_BY_NAME,
  GET_BY_ID,
  CLEAN_DETAIL,
  RESTORE,
  SET_CURRENT_RECIPES
} from './actionsType'

export const getAll = () => {
  const endpoint = 'http://localhost:3001/start'
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint)
      dispatch({
        type: GET_ALL,
        payload: data
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export const getByName = (name) => {
  const endpoint = 'http://localhost:3001/recipes?name='
  return async (dispatch) => {
    try {
      const response = await axios.get(`${endpoint}${name}`)
      dispatch({
        type: GET_BY_NAME,
        payload: response.data
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export const restore = () => {
  return { type: RESTORE, payload: null }
}

export const getById = (id) => {
  const endpoint = 'http://localhost:3001/recipes/'
  return async (dispatch) => {
    try {
      const response = await axios.get(`${endpoint}${id}`)
      dispatch({
        type: GET_BY_ID,
        payload: response.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const clenDetail = () => {
  return { type: CLEAN_DETAIL, payload: null }
}

export const getDiets = () => {
  const endpoint = 'http://localhost:3001/diets'
  return async (dispatch) => {
    try {
      const response = await axios.get(endpoint)
      dispatch({
        type: GET_DIETS,
        payload: response.data
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export const filterByDiets = (dieta) => {
  return { type: FILTER_DIETS, payload: dieta }
}

export const filterBySource = (source) => {
  return { type: FILTER_BY_SOURCE, payload: source }
}

export const orderByName = (orden) => {
  return { type: ORDER_BY_NAME, payload: orden }
}

export const orderByHealthScore = (orden) => {
  return { type: ORDER_BY_HEALTHSCORE, payload: orden }
}

export const setCurrentRecipes = (currentRecipes) => {
  return { type: SET_CURRENT_RECIPES, payload: currentRecipes }
}
