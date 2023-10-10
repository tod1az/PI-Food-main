import { NavLink } from 'react-router-dom'
import styles from './Card.module.css'

const Card = ({ id, name, image, diets, healthScore }) => {
  return (
    <NavLink to={`/recipe/${id}`}>
      <div className={styles.card}>
        <img className={styles.img} src={image} alt="" />
        <h2 className={styles.title}>{name}</h2>
        <p className={healthScore < 35 ? styles.red : healthScore >= 35 && healthScore < 50 ? styles.yellow : styles.green}>
          Health Score:{healthScore}
        </p>
        <div className={styles.dietsContainer}>
          {diets.map((diet, index) => (
            <p className={styles.diet} key={index}>
              {diet.name ? diet.name : diet}
            </p>
          ))}
        </div>
      </div>
    </NavLink>
  )
}
export default Card
