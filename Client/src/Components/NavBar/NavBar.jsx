import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css'
import home from '../../Assets/home.png'
import recipe from '../../Assets/recipe-book.png'
import SearchBar from "../SearchBar/SearchBar";

const NavBar = ()=>{

    return(
        <div className={styles.nav}>
            <NavLink className={styles.link} to ='/home'><img className={styles.img} src={home} alt='' /> Home</NavLink>
            <SearchBar/>
            <NavLink className={styles.link} to ='/addrecipe'><img className={styles.img} src={recipe} alt='' /> New Recipe </NavLink>
        </div>
    )
}
export default NavBar;