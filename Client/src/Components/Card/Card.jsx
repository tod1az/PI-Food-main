import { NavLink } from "react-router-dom"
import styles from './Card.module.css'


const Card=({id,name,image,diets,healthScore})=>{
    return(
        <NavLink to={`/recipe/${id}`}>
            <div className={styles.card}>
                    <h2 className={styles.title}>{name}</h2>
                    <img className={styles.img} src={image} alt='' />
                    <p>Health Score:{healthScore}%</p> 
                    <div className={styles.diets}>
                            {diets.map((diet,index)=><p key={index}>{diet.name?diet.name:diet}</p>)}
                    </div>
                    
            </div>
        </NavLink>
    )
}
export default Card
