import { Route, Routes } from 'react-router'
import Addmovie from './Movieadd/Addmovie'
import Header from './Header/Header'
import Home from './Home/Home'
import './App.css'
import Editmovie from './Editmovie/Editmovie'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Add-movies' element={<Addmovie />} />
        <Route path='/Edit-movies/:id' element={<Editmovie />} />
        <Route path='/*' element={<h2 align="center">Page Not Found</h2>} />
      </Routes>
    </>
  )
}

export default App
