import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { raiseTicket } from '../../feartures/Ticket/TicketSlice';
import BackButton from '../components/BackButton';
import { toast } from 'react-toastify';

const NewComplaint = () => {
 const {user} = useSelector((state) => state.auth);
 const{isLoading,isError,isSuccess,message} = useSelector((state) => state.ticket)
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const[product, setProduct] = useState("");
 const[description, setDescription] = useState("");
  
 const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(raiseTicket({product,description}))
    if(isSuccess){
      navigate("/my-complaint");
    }
  };

  useEffect(() => {
     if(isError){
      toast.error(message);
     }
  },[isError,message])


  return (
    <div className='container p-5'>
      <BackButton url={"/"}/>
       <h1 className='text-center text-secondary'>
        Raise Your Complaint
       </h1>
        <div className='card p-3 m-3'>
        <form className='my-3'onSubmit={handleSubmit}>
          <input 
           required 
           className='form-control my-2'
           type="text"
           value={user.name} 
           disabled
           />
             <input 
           required 
           className='form-control my-2'
           type="text"
           value={user.email}
           disabled
           />
          
           <select className='form-select my-2' onChange={(e) => setProduct(e.target.value)}>
                <option value="#" defaultValue>Please Select Product</option>
                <option value="iPhone">iPhone</option>
                <option value="iPad">iPad</option>
                <option value="iMac">iMac</option>
                <option value="iWatch">iWatch</option>
                <option value="Macbook">Macbook</option>
            </select>  
            
            <textarea onChange={(e) => setDescription(e.target.value)} required className='form-control' placeholder='Describe Your Issue'></textarea>

          <button type='submit' className="btn btn-dark w-100 my-2">Raise Complaint</button>
         </form>
        </div>
    </div>
  )
}

export default NewComplaint
