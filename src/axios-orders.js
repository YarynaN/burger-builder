import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://burgerbuilderapp-7d572-default-rtdb.firebaseio.com/'
});

export default axiosInstance;