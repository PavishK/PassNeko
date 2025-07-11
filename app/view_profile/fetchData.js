import axios from "axios";


export async function fetchUserData(token) {
    const res= await axios.post("/api/session_verify",{token});
    return res.data.data;
}