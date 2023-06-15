import styles from './newRecipe.module.css'
import { useState } from 'react'
import {validateRecipe} from '../Validate'
import{useDispatch,useSelector} from 'react-redux'
import { postRecipe } from '../../Redux/actions'



const NewRecipe =()=>{
    
    const dispatch = useDispatch()
    const diets    = useSelector(state=>state.diets)
    
    const [recipe, setRecipe] = useState({
        name:'',
        image:'',
        steps:[],
        diets:[],
        summary:'',
        healthScore:0
    })

    const [errors, setErrors] = useState({
        name:'',
        image:'',
        steps:'',
        diets:'',
        summary:'',
        healthScore:''
    })
    //Guarda las o elimina las dietas seleccionadas
    const dietHandler =(e)=>{
        if(e.target.checked){
            setRecipe({...recipe,diets:[...recipe.diets,{id:e.target.value,name:e.target.name}]})
        }else {
            setRecipe({...recipe,diets:recipe.diets.filter(diet=>diet.id!==e.target.value)})
        }
    }
    //valida la info de los inputs
    const changeHandler =(e)=>{
        setRecipe({...recipe,[e.target.name]:e.target.value})
        setErrors(validateRecipe(recipe))
    }

    //Determina el index de cada step
    
    const [steps,setSteps] = useState([''])

    const stepsHandler=(searchedIndex,e)=>{
        setSteps(steps.map((step,index)=>{
            if(index===searchedIndex){
               
                return e.target.value
            }
            return step
        }))
        setRecipe({...recipe,steps:steps})
    }
    //Se agrega un input extra por si el usuario lo requiere
    const addInput =()=>{
        setSteps([...steps,''])
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(postRecipe(recipe))
    }


    return(
        <div className={styles.formContainer}>
        <form onSubmit={submitHandler} className={styles.form}>
            <h1>New Recipe</h1>
            {/* Nombre, imagen, paso a paso, dietas,resumen */}
            <label htmlFor='name'>Name: </label>
            <input placeholder="Here goes your recipe's name" name='name' onChange={changeHandler}/>
            {errors.name&&<p>{errors.name}</p>}

            <label htmlFor='Image'>Image(url): </label>
            <input type="text" placeholder='httsp://yourimage.com' name='image' onChange={changeHandler} />
            {errors.image&&<p>{errors.image}</p>}

            <label htmlFor='steps'>Step by step proccess:<button type='button' onClick={()=>addInput()} >+</button> </label> 
            {steps.map((step,index)=>{
                 return <input key={index}  onChange={(e)=>stepsHandler(index,e)}/>
            })}
            {errors.steps&&<p>{errors.steps}</p>}

            <label htmlFor='summary'>Summary: </label>
            <input type="text" name='summary' onChange={changeHandler}/>
            {errors.summary&&<p>{errors.summary}</p>}

            <label htmlFor='healtScore'>Health Score: </label>
            <input type="text" name='healthScore' onChange={changeHandler}/>
            {errors.healthScore&&<p>{errors.healthScore}</p>}

             {/* dietas */}
          
                {diets.map((diet,index)=>{
                    return <div  key={index+200} className={styles.diets}>
                                <label htmlFor={diet.name} key={index+100}>{diet.name}</label>
                                <input type="checkbox" key={index} onChange={dietHandler}name={diet.name} value={diet.id} />
                                {console.log(diet.id)}
                           </div>
                })}
             
            <button  className={styles.submit} type='submit' onClick={()=>console.log('submiteado')}>Submit: </button>
        </form>
        </div>
    )

}

export default NewRecipe;