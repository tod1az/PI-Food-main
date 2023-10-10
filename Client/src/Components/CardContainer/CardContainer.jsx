import styles from './CardContainer.module.css'
import Card from '../Card/Card'
import image from '../../Assets/404.avif'
import { Fragment } from 'react'

const CardContainer = ({ currentRecipes }) => {
  return (
    <div className={styles.container}>
      {currentRecipes.length > 0 ? (
        currentRecipes.map((card, index) => {
          return (
            <Fragment key={index}>
              <Card
                image={card.image}
                id={card.id}
                name={card.name}
                diets={card.diets}
                number={card.number}
                healthScore={card.healthScore}
              />
            </Fragment>
          )
        })
      ) : (
        <div className={styles.card}>
          <h1>Recipe not found</h1>
          <img className={styles.img} src={image} alt="" />
        </div>
      )}
    </div>
  )
}
export default CardContainer
