import axios from "axios";

const API_URL = '/api/admin'

const fetchUsers = async (token) => {
    const options = {
        headers: {
            Authorization: `Bearer ${token}` 
            
        }   
    };
 const response = await axios.get(API_URL + "/users",options)
 return response.data;
};

const fetchComplaints = async (token) => {
    const options = {
        headers: {
            Authorization: `Bearer ${token}` 
            
        }   
    };
 const response = await axios.get(API_URL + "/tickets",options)
 return response.data;
};

const adminService = {
    fetchUsers,
    fetchComplaints
}

export default adminService;
