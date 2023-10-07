import styles from './Landing.module.css'
import { NavLink } from 'react-router-dom'

const Landing = () => {
  return (
    <div className={styles.landing}>
      <h1>Welcome to Henry Food</h1>
      <NavLink to="/home">Enter</NavLink>
    </div>
  )
}
export default Landing
