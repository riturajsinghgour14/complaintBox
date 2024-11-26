import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../feartures/auth/authSlice';
import { toast } from 'react-toastify';

const Login = () => {

  const dispatch = useDispatch();
const navigate = useNavigate();

const {user, isLoading, isError, message} = useSelector((state) => state.auth) 

    const [formData , setFormData] = useState({
        email : "",
        password : "",
    });

    const {email, password} = formData

    const handleChange =(e) => {
        setFormData({
          ...formData,
          [e.target.name] : e.target.value
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(formData))
    }

  useEffect(() => {

      if(isError){
          toast.error(message)
      }
      if(user){
          navigate("/")
      }
  
  }, [isError,message,user])

  if(isLoading){
     return (
      <div className='container p-5'>
          <h1 className='display-1 text-center text-secondary'>Loading...</h1>
      </div>
     )
  }

  return (
    <div className='container-fluid p-5'>
         <h2 className='text-center'>Login Here</h2>
       <div className="card my-3 p-3" onSubmit={handleSubmit}>
         <form className='my-3'>
          <input 
           required 
           className='form-control my-2'
           type="text" 
           placeholder='Enter Your Email'
           name='email'
           value={email}
           onChange={handleChange}
           />
            <input 
           required 
           className='form-control my-2'
           type="text" 
           placeholder='Enter Password'
           name='password'
           value={password}
           onChange={handleChange}
           />
          <button type='submit' className="btn btn-dark w-100 my-2">Login</button>
         </form>
       </div>
    </div>
  )
}

export default Login
