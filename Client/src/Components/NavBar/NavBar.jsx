import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import home from '../../Assets/home.png'
import recipe from '../../Assets/recipe-book.png'
import SearchBar from '../SearchBar/SearchBar'
import { useLocation } from 'react-router-dom'

const NavBar = () => {
  const location = useLocation()

  return (
    <nav>
      <NavLink className={styles.link} to="/home">
        <img className={styles.img} src={home} alt="" /> Home
      </NavLink>
      {location.pathname === '/home' && <SearchBar />}
      <NavLink className={styles.link} to="/addrecipe">
        <img className={styles.img} src={recipe} alt="" /> New Recipe{' '}
      </NavLink>
    </nav>
  )
}
export default NavBar
