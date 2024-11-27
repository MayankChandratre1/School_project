import axios from "axios";


const API_URL= import.meta.env.VITE_API_URL
console.log(API_URL);

export const signUp = async (data:{
    email: string,
    password: string,
    role: string,
    name: string
}) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, data);
        return response.data;
    } catch (error) {
        return {error};
    }
}

export const signIn = async (data:{
    email: string,
    password: string,
}) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, data);
        return response.data;
    } catch (error) {
        return {error};
    }
}