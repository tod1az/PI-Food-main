import styles from './Landing.module.css'
import cheff from '../../Assets/cheff.png'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <main className={styles.landing}>
      <div className={styles.header}>
        <h1>Welcome to Henry Food</h1>
        <button onClick={() => navigate('/home')}> Let's Cook </button>
      </div>
      <img src={cheff} alt="landingImage" />
    </main>
  )
}
export default Landing
