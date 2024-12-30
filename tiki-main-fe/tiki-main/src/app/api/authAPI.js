import axios from "axios";

const BACKEND_URL = "http://localhost:8080" ;
//kigub
export async function login(user_name, password) {
    let data = await axios.post(`${BACKEND_URL}/users/login`, {user_name,password});
    return data;
}
  
export async function sign(body){
    console.log(BACKEND_URL,"BACKEND_URL");
    let data = await axios.post(`${BACKEND_URL}/users/sign-up`,{...body});
    return data;
}  