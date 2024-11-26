import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {user, isLoading, isError, isSuccess,message} = useSelector((state) => state.auth) 

    const isAdmin = user?.isAdmin;;

    useEffect(() => {

      if(isError){
      toast.error(message)
      }
      if(!user){
          navigate("/login")
      }
  
  }, [isError,message,user,])

  if(isLoading){
     return (
      <div className='container p-5'>
          <h1 className='display-1 text-center text-secondary'>Loading...</h1>
      </div>
     )
  }

  return (
    <div className='container p-5'>
        <h1 className='my-3 text-center'>Welcome User</h1>
        <div className='card p-3'> 
           {
            isAdmin ? (<>
              <Link to={"/view-complaints"} className="btn btn-outline-dark w-100 my-2">View Complaint</Link>
              <Link to={"/view-users"} className="btn btn-outline-dark w-100 my-2">View Users</Link>
            </>) : <>
            <Link to={"/complaint/new"} className="btn btn-outline-dark w-100 my-2">New Complaint</Link>
            <Link to={"/my-complaint"} className="btn btn-outline-dark w-100 my-2">View Complaint</Link> 
            </>
           }
        </div>
     
    </div>
  )
}

export default Home;
