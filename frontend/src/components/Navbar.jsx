import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOutUser } from '../../feartures/auth/authSlice';


const Navbar = () => {

  const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth) ;

    const handleLogout = () => {
      dispatch(logOutUser())
    }
  return (
    <nav className="navbar bg-body-tertiary shadow-lg">
  <div className="container-fluid">
    <Link to={"/"} className="navbar-brand mb-0 h1">Complaint-Box</Link>
    
    <span className='float-end'>
       {
        !user ? ( <>
          <Link to={"/register"} className="btn btn-sm btn-dark">Register</Link>
        <Link to={"/login"} className="btn btn-sm btn-dark mx-2">Login</Link>
        </>):(<>
            <button className="btn btn-sm btn-danger" onClick={handleLogout}>Logout</button>
        </>)
}
    </span>
  </div>
</nav>
  )
}

export default Navbar;
