import styles from './newRecipe.module.css'
import {  useEffect, useState } from 'react'
import {validateRecipe} from '../Validate'
import{useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'



const NewRecipe =()=>{
    
   
    const diets    = useSelector(state=>state.diets);
    const navigate = useNavigate();
    
    const [recipe, setRecipe] = useState({
        name:'',
        image:'',
        steps:[''],
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
    const [disableSubmit,setDisableSubmit] = useState(true);

    const disableHandler =(errors)=>{
        if(errors.name||errors.image||errors.steps||errors.diets||errors.summary||errors.healthScore){
            setDisableSubmit(true)
        }else setDisableSubmit(false)
    }
    //Guarda las o elimina las dietas seleccionadas
    const dietHandler =(e)=>{
        if(e.target.checked){
            setRecipe({...recipe,diets:[...recipe.diets,{id:e.target.value,name:e.target.name}]})
            setErrors(validateRecipe({...recipe,diets:[...recipe.diets,{id:e.target.value,name:e.target.name}]}))
            disableHandler(validateRecipe({...recipe,diets:[...recipe.diets,{id:e.target.value,name:e.target.name}]}))
        }else {
            setRecipe({...recipe,diets:recipe.diets.filter(diet=>diet.id!==e.target.value)})
            setErrors(validateRecipe({...recipe,diets:recipe.diets.filter(diet=>diet.id!==e.target.value)}))
            disableHandler(validateRecipe({...recipe,diets:recipe.diets.filter(diet=>diet.id!==e.target.value)}))
        }
       
    }
    //valida la info de los inputs
    const changeHandler =(e)=>{
        setRecipe({...recipe,[e.target.name]:e.target.value})
        setErrors(validateRecipe({...recipe,[e.target.name]:e.target.value}))
        disableHandler(validateRecipe({...recipe,[e.target.name]:e.target.value}))
    }

    const stepsHandler=(searchedIndex,e)=>{
        const newSteps =recipe.steps.map((step,index)=>{
            if(index===searchedIndex){
                return e.target.value
            }
            return step
        })
        setRecipe( {...recipe,steps:newSteps})
        setErrors(validateRecipe({...recipe,steps:newSteps}))
        disableHandler(validateRecipe({...recipe,steps:newSteps}))
    }
    //Se agrega un input extra por si el usuario lo requiere
    const addInput =()=>{
        setRecipe({...recipe,steps:[...recipe.steps,'']})
    }
    
    
    
    const postHandler =async()=>{ 
        const endpoint = 'http://localhost:3001/recipes'
            const res = await axios.post(endpoint,recipe)
            if(res.data.created){
                alert(`The recipe ${res.data.name} has been successfully added`)
                navigate('/home')
            }else alert(`The recipe ${recipe.name} already exists`)
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        postHandler();
    }


   

    return(
        <div className={styles.formContainer}>
        <form onSubmit={submitHandler} className={styles.form}>
            <h1>New Recipe</h1>
            {/* Nombre, imagen, paso a paso, dietas,resumen */}
            <label htmlFor='name'>Name: </label>
            <input placeholder="Here goes your recipe's name" name='name' value={recipe.name} onChange={changeHandler}/>
            {errors.name&&<p className={styles.errors}>{errors.name}</p>}

            <label htmlFor='Image'>Image(url): </label>
            <input type="text" placeholder='httsp://yourimage.com' name='image' value={recipe.image} onChange={changeHandler} />
            {errors.image&&<p className={styles.errors} >{errors.image}</p>}

            <label htmlFor='steps'>Step by step process<button type='button' className={styles.button}  onClick={()=>addInput()} >+</button> </label> 
            {recipe.steps.map((step,index)=>{
                 return <input placeholder='Step:example' key={index} value={step} onChange={(e)=>stepsHandler(index,e)}/>
            })}
            {errors.steps&&<p className={styles.errors} >{errors.steps}</p>}

            <label htmlFor='summary'>Summary: </label>
            <textarea type="text" name='summary' value={recipe.summary} onChange={changeHandler}/>
            {errors.summary&&<p className={styles.errors} >{errors.summary}</p>}

            <label htmlFor='healtScore'>Health Score: </label>
            <input type="text" name='healthScore' value={recipe.healthScore} onChange={changeHandler}/>
            {errors.healthScore&&<p className={styles.errors} >{errors.healthScore}</p>}

             {/* dietas */}
            <label>Diets</label>
                {diets.map((diet,index)=>{
                    return <div  key={index+200} className={styles.diets}>
                                <label htmlFor={diet.name} key={index+100}>{diet.name}</label>
                                <input type="checkbox" key={index} onChange={dietHandler}name={diet.name} value={diet.id} />
                           </div>
                })}
             {errors.diets!==''&&<p className={styles.errors} >{errors.diets}</p>}
            <button disabled={disableSubmit} className={styles.submit} type='submit' onClick={()=>console.log('submiteado')}>Submit: </button>
        </form>
        </div>
    )
}

export default NewRecipe;