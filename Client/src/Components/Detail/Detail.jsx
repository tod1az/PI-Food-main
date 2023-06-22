import styles from './Detail.module.css'
import {useSelector,useDispatch} from 'react-redux'
import { getById,clenDetail } from '../../Redux/actions'
import { useEffect } from 'react'
import {useParams} from 'react-router-dom'
const Detail =()=>{
    const dispatch = useDispatch();
    
    const {id} = useParams();
    useEffect(()=>{
         dispatch(getById(id));
         return ()=>{
             dispatch(clenDetail())
        }        
    },[id])
    const detail = useSelector(state=>state.detail)
    const{name,summary, healthScore, image,diets,steps} = detail
    return (
        <div>
           <div className={styles.head}>
                {detail&&<h1>{name}</h1>}
                {detail&&<p className={healthScore<35?styles.red:healthScore>=35&&healthScore<50?styles.yellow:styles.green} >Health Score:{healthScore}</p>}
           </div> 
        <div className={styles.detail}>
            <div className={styles.imageDiv} >
                {detail&&<img className={styles.image} src={image} alt='' /> }
            </div>
          <div className={styles.diets} >
                {diets&&<h2>Diets</h2>}
                {detail&&diets?.map((diet,index)=><p key={index}>{diet.name?diet.name:diet}</p>)}
           </div>
           
            <div className={styles.title} ><h2>Summary</h2></div>
           <div className={styles.summary}>
                {detail&&<p>{summary}</p>}
           </div>
          
                {steps?.length!==0&&<div className={styles.title}><h2>Step by Step Proccess</h2></div>}
          
           {steps?.length!==0&&<div className={styles.steps} >
                                    <ul>
                                        {detail&&steps?.map((step,index)=>{
                                            if(step.length!==0)return <li className={styles.li} key={index}>{step}</li>
                                            })}
                                    </ul>
                             </div>}
           
        </div>
        </div>
    )
}

export default Detail;