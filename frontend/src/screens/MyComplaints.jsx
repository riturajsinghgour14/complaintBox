import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTickets } from '../../feartures/Ticket/TicketSlice';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';

const Mytickets = () => {
   
    const {tickets, isLoading, isError, isSuccess} = useSelector((state) => state.ticket) 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTickets())
    },[])

  return (
    <div className='container p-5'>
        <BackButton url={"/"}/>
       <h1 className='text-center text-secondary'>My Complaints</h1>
       <div className='card p-3 mt-3'> 
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">product </th>
      <th scope="col">Date</th>
      <th scope="col">Status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
   {
    tickets.map((ticket,index) => {
      return(
        <tr key={ticket._id}>
        <th scope="row">{index + 1}</th>
        <td>{ticket.product}</td>
        <td>{new Date(ticket.createdAt).toDateString("en-IN")}</td>
        <td>{ticket.status}</td>
        <td><Link to={`/complaint/${ticket._id}`} className='btn btn-sm btn-dark'>View</Link></td>
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

export default Mytickets
