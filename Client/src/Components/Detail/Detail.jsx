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
           {detail&&<h1>{name}</h1>}
           {detail&&<p>Health Score:{healthScore}</p>}
           {detail&&<img src={image} alt='' /> }
           {detail&&<h2>Diets:</h2>}
           {detail&&diets?.map((diet,index)=><p key={index}>{diet.name?diet.name:diet}</p>)}
           <h2>Summary</h2>
           {detail&&<p>{summary}</p>}
           <h2>Step by Step Proccess</h2>
           <ul>
               {detail&&steps?.map((step,index)=><li key={index}>{step}</li>)}
           </ul>
        </div>
    )
}

export default Detail;