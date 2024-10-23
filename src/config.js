import axios from "axios"
export const axiosInstance = axios.create({
    // change baseUrl if you want run in localhosr
    baseURL :  "https://ruleenginebackend1.onrender.com/api/"
    
})