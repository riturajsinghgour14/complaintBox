import React from 'react'
import{BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './screens/Home'
import Register from './screens/Register'
import Login from './screens/Login'
import PageNoteFound from './screens/PageNoteFound'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from './screens/users'
import Complaints from './screens/Complaints'
import MyComplaints from './screens/MyComplaints'
import Complaint from './screens/complaint'
import NewComplaint from './screens/NewComplaint'


const App = () => {
  return (
    <Router>
     <Navbar/>
      <Routes>
        <Route path='*' element={<PageNoteFound/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/view-users' element={<Users/>}/>
        <Route path='/view-complaints' element={<Complaints/>}/>
        <Route path='/my-complaint' element={<MyComplaints/>}/>
        <Route path='/complaint/:id' element={<Complaint/>}/>
        <Route path='/complaint/new' element={<NewComplaint/>}/>
      </Routes>
      <ToastContainer/>
    </Router>
  )
}

export default App
