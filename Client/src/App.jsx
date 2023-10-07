import './App.css'
import Detail from './Components/Detail/Detail'
import Home from './Components/Home/Home'
import Landing from './Components/Landing/Landing'
import { Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'
import NewRecipe from './Components/NewRecipe/NewRecipe'

function App() {
  const location = useLocation()

  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipe/:id" element={<Detail />} />
        <Route path="/addrecipe" element={<NewRecipe />} />
      </Routes>
    </div>
  )
}
export default App
