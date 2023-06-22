import styles from './Home.module.css'
import {useSelector,useDispatch} from 'react-redux'
import {filterDiets,filterBySource,orderByName,orderByHealthScore, getAll} from '../../Redux/actions'
import { useState,useEffect} from 'react';
import CardContainer from '../CardContainer/CardContainer';

const Home =()=>{
    const dispatch = useDispatch();
    const dietas = useSelector(state=>state.diets)
   

    const dietFilterHandler =(e)=>{
        dispatch(filterDiets(e.target.value))
    }

    const sourceFilterHandler =(e)=>{
        dispatch(filterBySource(e.target.value))
    }

    const nameOrderHandler =(e)=>{
        dispatch(orderByName(e.target.value))  
    }

    const orderByhealthScoreHandler=(e)=>{
        dispatch(orderByHealthScore(e.target.value))
    }


    //=========================================//
    const[disablePrevious,setDisablePrevious] = useState(true)
    const[disableNext,setDisableNext] = useState(false)

    const [pag,setPag]   = useState([]);

    const [currentPage,setCurrentPage] = useState(0);

    const [currentRecipes,setCurrentRecipes] = useState([]);

    const show =9
    const recipes = useSelector(state=>state.recipes)
    const paginate =()=>{
      //agrego la cantidad de botones necesarios de acuerdo a la cantidad de recetas 
      //para que se muestren nueve por pagina
      let numeros = []
      const paginas = Math.ceil(recipes.length/show)
      for (let i = 1; i <= paginas; i++) {
        numeros.push(i)
      }
      setPag(numeros)
      setCurrentRecipes(recipes.slice(0,show))
      setCurrentPage(1)
      setDisablePrevious(true)
    }

    const buttonHandler =(num)=>{
        setCurrentPage(num)
        setCurrentRecipes(recipes.slice(show*(num-1),show*num))
        if(num===1){
          setDisablePrevious(true)
        }else setDisablePrevious(false)
     
        if(num===pag.length){
          setDisableNext(true)
        }else setDisableNext(false)
    }

    useEffect(()=>{
        paginate()
    },[recipes])


    useEffect(()=>{
        dispatch(getAll())
    },[dispatch])

    //===========================================//
    return(
        <div className={styles.home}>
            <select  onChange={dietFilterHandler}>
                <option value='All' >All</option>
                {dietas.map((diet,index)=>{
                    return <option key={index} value={diet.name} >{diet.name}</option>
                })}
            </select>
            <select onChange={sourceFilterHandler}>
                <option value='All' >All</option>
                <option value='API' >Api</option>
                <option value='DB' >Data Base</option>
            </select>
            <select onChange={nameOrderHandler}>
                <option value='Def'>Default</option>
                <option value='A' >A-Z</option>
                <option value='D' >Z-A</option>
            </select>
            <select onChange={orderByhealthScoreHandler}>
                <option value='Def'>Default</option>
                <option value='A'>Lower Health Score To Higher</option>
                <option value='D'>Higher Health Score To lower</option>
            </select>
            <h1>Henry Food</h1>
            <CardContainer currentRecipes ={currentRecipes}/>
            {recipes.length>=9&&<div className={styles.buttonContainer}>
                <button  className={styles.button} disabled={disablePrevious} onClick={()=>buttonHandler(currentPage-1)} name='prev'>Previous</button>
                    {pag.map((num,index)=>(<button className={currentPage===num?styles.selected:styles.button} key={index} onClick={(e)=>buttonHandler(num,e)}>{num}</button>))}
                <button  className={styles.button} disabled={disableNext} onClick={()=>buttonHandler(currentPage+1)} name='next'>Next</button>  
            </div>}
        </div>
    )
}

export default Home;