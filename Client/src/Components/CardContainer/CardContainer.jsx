import styles from './CardContainer.module.css'
import Card from '../Card/Card'

const  CardContainer =({currentRecipes})=>{ 
    return(
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

    )
}
export default CardContainer