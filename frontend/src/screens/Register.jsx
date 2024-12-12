import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { registerUser } from '../../feartures/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  
const dispatch = useDispatch();
const navigate = useNavigate();

const {user, isLoading, isError, isSuccess,message} = useSelector((state) => state.auth) 


    const [formData , setFormData] = useState({
        name : "",
        email : "",
        password : "",
        password2 : "",
    });

    const {name,email, password,password2} = formData

    const handleChange =(e) => {
        setFormData({
          ...formData,
          [e.target.name] : e.target.value
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault()
       if(password !== password2){
        toast.error("Password Not Match")
       }

       dispatch(registerUser(formData))
    }

    useEffect(() => {

        if(isError){
            toast.error(message)
        }

        if(user && isSuccess){
            navigate("/")
        }
    
    }, [isError,message,user,isSuccess])

    if(isLoading){
       return (
        <div className='container p-5'>
            <h1 className='display-1 text-center text-secondary'>Loading...</h1>
        </div>
       )
    }

  return (
    <div className='container-fluid p-5'>
        <h2 className='text-center'>Register Here</h2>
       <div className="card my-3 p-3">
         <form className='my-3' onSubmit={handleSubmit}>
           <input 
           required 
           className='form-control my-2'
           type="text" 
           placeholder='Enter Your Name'
           name='name'
           value= {name}
           onChange={handleChange}
           />
          <input 
           required 
           className='form-control my-2'
           type="text" 
           placeholder='Enter Your Email'
           name='email'
           value= {email}
           onChange={handleChange}
           />
            <input 
           required 
           className='form-control my-2'
           type="password" 
           placeholder='Enter Password'
           name='password'
           value= {password}
           onChange={handleChange}
           />
            <input 
            required 
           className='form-control my-2'
           type="password" 
           placeholder='Confirm Password'
           name='password2'
           value= {password2}
           onChange={handleChange}
           />
           <button type='submit' className="btn btn-dark w-100 my-2">Register</button>
         </form>
       </div>
    </div>
  )
}

export default Register
