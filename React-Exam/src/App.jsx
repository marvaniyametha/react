
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router'
import Header from './Componet/ Header/Header'
import HOME from './Componet/Home/Home'
import AddBLOG from './Componet/Add/addblog.JSX'
import SignIn from './sigin/sigin'
import SignUp from './sigiup/sigiup'
import EditBlog from './EDIT/Edit'

function App() {

  return (
   
    <>

       <Header></Header>
        <Routes>
       <Route path='/' element={<HOME></HOME>} />
        <Route path='/AddBLOG' element={<AddBLOG></AddBLOG>} />
        <Route path="/signIn" element={<SignIn></SignIn>} />
        <Route path="/signUp" element={<SignUp></SignUp>} />
         <Route path="//editblog/:id" element={<EditBlog></EditBlog>} />
        </Routes>
    </>
  )
}

export default App
