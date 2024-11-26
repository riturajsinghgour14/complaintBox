import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTicket } from '../../feartures/Ticket/TicketSlice';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Complaint = () => {
  
  const { ticket, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getTicket(id));
  }, []);

  if (isError) {
    return (
      <div className="container p-5 text-center">
        <h1 className="display-1 text-secondary">{message}</h1>
      </div>
    );
  }

  return (
    <div className="container p-5">
    <BackButton url={"/my-complaint"}/>
    <div className="card p-3 my-3">
      <h1>Product : {ticket.product}</h1>
      <p>Description : {ticket.description}</p>
      <p>Date : {new Date(ticket.createdAt).toLocaleDateString("en-IN")}</p>
      <p>
        Status : <span className="badge text-bg-dark">{ticket.status}</span>
      </p>
    </div>

      <div className='card my-2 p-3'> 
        <h3 className='text-secondary'>Comments : </h3>
         <form className='my-3'>
            <input type="text" 
            placeholder='Enter Comment' 
            className='form-control' 
            required
            />
           <button className="btn btn-sm btn-dark my-2 float-end">Add Comment</button>
         </form>
          
          <ul className='list-group my-3'>
            <li className='list-group-item'>Comment Here</li>
          </ul>
          
      </div>
  </div>
  )
}

export default Complaint;
