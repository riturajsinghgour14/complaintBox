import React, { useEffect } from 'react'
import BackButton from '../components/BackButton'
import { useDispatch, useSelector } from 'react-redux';
import { getComplaints } from '../../feartures/admin/adminslice';

const Complaints = () => {

    const {complaints, isLoading, isError, message} = useSelector((state) => state.admin) ;
    const dispatch = useDispatch();

    console.log(complaints)

    useEffect(() => {
        dispatch (getComplaints());
        
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
      <h3 className='text-center text-secondary'>All complaints</h3>
    <div className='card p-3 mt-3'> 
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">User Id </th>
      <th scope="col">Product</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
   {
    complaints.map((complaint,index) => {
      return(
        <tr key={(index,complaint._id)}>
        <th scope="row">{index + 1}</th>
        <td>{complaint.user}</td>
        <td>{complaint.product}</td>
        <td>{complaint.status}</td>
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
  


export default Complaints
