import styles from './Landing.module.css'
import {NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { getAll } from '../../Redux/actions'
import { useEffect } from 'react'

const Landing =()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAll())
    },[dispatch])
    return(
        <div className={styles.landing}>
            <h1>Bienvenido a Henry Food</h1>
            <NavLink to ='/home' >
                    Entrar 
            </NavLink>
        </div>
    )
}
export default Landing;