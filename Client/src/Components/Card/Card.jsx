import { NavLink } from "react-router-dom"
import styles from './Card.module.css'


const Card=({id,name,image,diets,healthScore})=>{
    return(
        <div className={styles.card}>
            <NavLink to={`/recipe/${id}`}>
                <h2>{name}</h2>
                <p>Health Score:{healthScore}</p>
                <img className={styles.img} src={image} alt='' /> 
                <h2>Diets:</h2>
                    {diets.map((diet,index)=><p key={index}>{diet.name?diet.name:diet}</p>)}
            </NavLink>
        </div>
    )
}
export default Card
