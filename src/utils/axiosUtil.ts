import axios,{} from 'axios'
const authClient = axios.create({
    baseURL: 'http://localhost:8080/auth',
    headers: {
        "Content-Type": "application/json",
        "Accepts" : "application/json",
    },
    withCredentials: true
});



export {authClient};