import styles from './Home.module.css'
import CardContainer from "../CardContainer/CardContainer";
import {useSelector,useDispatch} from 'react-redux'
import {filterDiets,filterBySource,orderByName,orderByHealthScore} from '../../Redux/actions'

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
        // detalle, no reenderiza los cambios insta
    }

    const orderByhealthScoreHandler=(e)=>{
        dispatch(orderByHealthScore(e.target.value))
    }

    return(
        <div className={styles.title}>
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
                <option value='All' >All</option>
                <option value='A' >Ascendente</option>
                <option value='D' >Descendente</option>
            </select>
            <select onChange={orderByhealthScoreHandler}>
                <option value='A'>Menor a mayor</option>
                <option value='D'>Mayor a menor</option>
            </select>
            <h1>Henry Food</h1>
            <CardContainer/>
        </div>
    )
}


export default Home;