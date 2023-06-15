import {NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { getAll } from '../../Redux/actions'

const Landing =()=>{
    const dispatch = useDispatch()
    return(
        <div>
            <h1>Bienvenido a Henry Food</h1>
            <NavLink onClick={()=>dispatch(getAll())} to ='/home'  >Entrar</NavLink> {/*Estilar esto como boton*/} 
        </div>
    )
}
export default Landing ;