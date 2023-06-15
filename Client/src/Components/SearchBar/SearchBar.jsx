import styles from './SearchBar.module.css'
import {useDispatch} from 'react-redux'
import { getByName } from '../../Redux/actions';
import {useState} from 'react'





const SearchBar =()=>{

    const [nombre, setNombre] = useState('');
    
    const changeHandler =(e)=>{
        setNombre(e.target.value)
    }

    const clickHandler =()=>{
        dispatch(getByName(nombre))
    }

    const dispatch = useDispatch();
    return(
        <div>
            <input className={styles.input} onChange={changeHandler} value={nombre} placeholder='Example Recipe'></input><button onClick={clickHandler}>Search</button>
        </div>
    )
}
export default SearchBar;