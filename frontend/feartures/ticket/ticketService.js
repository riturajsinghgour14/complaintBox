import axios from "axios";

// const API_URL = '/api/ticket/'

const fetchTickets = async (token) => {
    const options = {
        headers: {
            Authorization: `Bearer ${token}` 
            
        }   
    };
 const response = await axios.get( 'http://localhost:8081/api/ticket/',options)
 return response.data;
};

const fetchTicket = async (ticketId, token) => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get( 'http://localhost:8081/api/ticket/' + ticketId, options);
    return response.data;
  };

  const addTicket = async (formData, token) => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post( 'http://localhost:8081/api/ticket/', formData, options);
    return response.data;
  };

const ticketService = {
   fetchTickets,
   fetchTicket,
   addTicket
}

export default ticketService;