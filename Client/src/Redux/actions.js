import axios from 'axios'

import { GET_DIETS,POST_RECIPE,GET_ALL,FILTER_DIETS,FILTER_BY_SOURCE,ORDER_BY_NAME,ORDER_BY_HEALTHSCORE, GET_BY_NAME,GET_BY_ID,CLEAN_DETAIL} from './actionsType'

// Trae todas las recetas, y las dietas
const getAll =()=>{
  const endpoint ='http://localhost:3001/start'
  return async(dispatch)=>{
    try {
      const {data} = await axios.get(endpoint)
      dispatch({
        type:GET_ALL,
        payload:data
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

//Trae las recetas que coinciden con cierto nombre

const getByName =(name)=>{
  const endpoint ='http://localhost:3001/recipes?name='
  return async (dispatch)=>{
    try {
      const response = await axios.get(`${endpoint}${name}`)
      dispatch({
        type:GET_BY_NAME,
        payload:response.data
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

//Trae una receta correspondiente a cierto id  

const getById =(id)=>{
  const endpoint = 'http://localhost:3001/recipes/'
  return async (dispatch)=>{
    try {
      const response = await axios.get(`${endpoint}${id}`)
      dispatch({
        type:GET_BY_ID,payload:response.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}
//Clean Detail

const clenDetail =()=>{
  return { type:CLEAN_DETAIL,payload:null}
}

//Trae todas las dietas que contiene la db
const getDiets = ()=>{
  const endpoint ='http://localhost:3001/diets'
  return async (dispatch)=>{
    try {
        const response = await axios.get(endpoint)

        dispatch({
            type:GET_DIETS,
            payload:response.data,
        })
    } catch (error) {
        console.log(error.message)
    }
        
  }  
}


//Guarda una  receta en la db 
const postRecipe =(recipe)=>{
  const endpoint = 'http://localhost:3001/recipes'
  return async(dispatch)=>{

    try {
      await axios.post(endpoint,recipe)
      dispatch({
        type:POST_RECIPE,
        payload:recipe
      })

    } catch (error) {
      console.log(error.message)
    }
  }
}


//Filtra las recetas por dieta
const filterDiets =(dieta)=>{
  return {type:FILTER_DIETS,payload:dieta}
}
//Filtra las recetas dependiendo de su origen (db/api)

const filterBySource =(source)=>{
  return {type:FILTER_BY_SOURCE,payload:source}
}

//Orden por orden alfabeico ascendente o descendente de pendiendo del orden entregado 

const orderByName =(orden)=>{
  return {type:ORDER_BY_NAME,payload:orden}
}

//Orden por healthScore

const orderByHealthScore =(orden)=>{
      return {type:ORDER_BY_HEALTHSCORE,payload:orden}
}




export {getDiets,postRecipe,getAll,filterDiets,filterBySource,orderByName,orderByHealthScore,getByName,getById,clenDetail} ;