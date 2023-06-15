import styles from './CardContainer.module.css'
import Card from '../Card/Card'
import { useState,useEffect } from 'react'
import {useSelector} from 'react-redux'

const  CardContainer =()=>{
    

    const [pag,setPag]   = useState([]);

    const [currentPage,setCurrentPage] = useState(0);

    const show = 9;
    
    const [currentRecipes,setCurrentRecipes] = useState([]);

    const[disablePrevious,setDisablePrevious] = useState(false)
    const[disableNext,setDisableNext] = useState(false)

    const recipes = useSelector(state=>state.recipes)
    const llenar =()=>{
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
        llenar();
    },[recipes])
    
    return(
            <div >
              <div className={styles.container}>
              
                {currentRecipes.map((card,index)=>{
                    return <div key={index}>
                                <Card
                                    image={card.image}
                                    id={card.id}
                                    name={card.name}
                                    diets={card.diets}
                                    number={card.number}
                                    healthScore={card.healthScore}
                                />
                           </div>
                })}
              </div>
               <div className={styles.buttons}>
                <button  disabled={disablePrevious} onClick={()=>buttonHandler(currentPage-1)} name='prev'>Previous</button>
                 {pag.map((num,index)=>(<button  key={index} onClick={(e)=>buttonHandler(num,e)}>{num}</button>))}
               <button  disabled={disableNext} onClick={()=>buttonHandler(currentPage+1)} name='next'>Next</button>  
               </div>
            </div>
    )
}
export default CardContainer