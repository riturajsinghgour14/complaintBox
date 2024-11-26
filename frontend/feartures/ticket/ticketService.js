import axios from "axios";

const API_URL = '/api/ticket/'

const fetchTickets = async (token) => {
    const options = {
        headers: {
            Authorization: `Bearer ${token}` 
            
        }   
    };
 const response = await axios.get(API_URL,options)
 return response.data;
};

const fetchTicket = async (ticketId, token) => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get(API_URL + "/" + ticketId, options);
    return response.data;
  };

  const addTicket = async (formData, token) => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL, formData, options);
    return response.data;
  };

const ticketService = {
   fetchTickets,
   fetchTicket,
   addTicket
}

export default ticketService;