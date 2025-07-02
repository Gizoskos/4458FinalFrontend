import axios from "axios";

const axiosConfig = axios.create({
    baseURL: "https://four458apigateway.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default axiosConfig;
