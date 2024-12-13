import axios from "axios";

const API_URL = '/api/admin'

const fetchUsers = async (token) => {
    const options = {
        headers: {
            Authorization: `Bearer ${token}` 
            
        }   
    };
 const response = await axios.get('http://localhost:8081/api/admin/users',options)
 return response.data;
};

const fetchComplaints = async (token) => {
    const options = {
        headers: {
            Authorization: `Bearer ${token}` 
            
        }   
    };
 const response = await axios.get('http://localhost:8081/api/admin/tickets',options)
 return response.data;
};

const adminService = {
    fetchUsers,
    fetchComplaints
}

export default adminService;
