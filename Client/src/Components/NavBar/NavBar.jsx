import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css'
import home from '../../../public/home.png'
import recipe from '../../../public/recipe-book.png'
import SearchBar from "../SearchBar/SearchBar";
const NavBar = ()=>{

    return(
        <div className={styles.nav}>
            <NavLink to ='/home'><img className={styles.img} src={home} alt='' /> Home</NavLink>
            <SearchBar/>
            <NavLink to ='/addrecipe'><img className={styles.img} src={recipe} alt='' /> New Recipe </NavLink>
        </div>
    )
}
export default NavBar;