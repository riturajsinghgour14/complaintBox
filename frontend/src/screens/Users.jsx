import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../../feartures/admin/adminslice';
import BackButton from '../components/BackButton';

const Users = () => {
 
const {users, isLoading, isError, message} = useSelector((state) => state.admin) ;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch (getUsers());

        
    }, []);

    if(isError){
        return (
         <div className='container p-5'>
             <h1 className='display-1 text-center text-secondary'>{message}</h1>
         </div>
        )
    }

  return (
    <div className='container p-5'>
      <BackButton url={"/"}/>
      <h3 className='text-center text-secondary'>All Users</h3>
    <div className='card p-3 mt-3'> 
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name </th>
      <th scope="col">Email</th>
      <th scope="col">Complaints</th>
    </tr>
  </thead>
  <tbody>
    {
       users.map((user,index) => {
        return (
   <tr>
      <th scope="row">{index + 1}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>2</td>
    </tr>

        )
       })
    }
  </tbody>
</table>
    </div>
    </div>
  )
}

export default Users;
