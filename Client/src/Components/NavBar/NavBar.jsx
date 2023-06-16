import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css'
import home from '../../../public/home.png'
import recipe from '../../../public/recipe-book.png'
import SearchBar from "../SearchBar/SearchBar";
import { useLocation } from "react-router-dom";
const NavBar = ()=>{
const location = useLocation()
    return(
        <div className={styles.nav}>
            <NavLink to ='/home'><img className={styles.img} src={home} alt='' /> Home</NavLink>
            {location.pathname==='/home'&&<SearchBar/>}
            <NavLink to ='/addrecipe'><img className={styles.img} src={recipe} alt='' /> New Recipe </NavLink>
        </div>
    )
}
export default NavBar;