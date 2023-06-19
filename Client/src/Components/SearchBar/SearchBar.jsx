import styles from './SearchBar.module.css'
import {useDispatch} from 'react-redux'
import { getByName,restore} from '../../Redux/actions';
import {useState} from 'react'
import { useLocation } from "react-router-dom";





const SearchBar =()=>{
    const location = useLocation();
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState('');
    
    
    const changeHandler =(e)=>{
        setNombre(e.target.value)
    }

    const clickHandler =()=>{
        dispatch(getByName(nombre))
        setNombre('')
    }
    
    const resetHandler =()=>{
        dispatch(restore())
        setNombre('')
    }

 
    return(
        <div>
            <button className={styles.button} disabled={location.pathname!=='/home'&&true} onClick={resetHandler} >Reset</button>
            <input className={styles.input} disabled={location.pathname!=='/home'&&true} onChange={changeHandler} value={nombre} placeholder='Example Recipe'></input>
            <button className={styles.button} disabled={location.pathname!=='/home'&&true} onClick={clickHandler}>Search</button>
        </div>
    )
}
export default SearchBar;