//Import axios
import axios from "axios";

//set URL variable
const BASE_URL = "http://localhost:3030";

/** AUTH CALLS */

//LOGIN FUNCTION
async function login(email, password) {
  console.log("Attempting to login....");
  const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    })

  return response;
}

//REGISTER FUNCTION
async function register(email, password, username) {
  console.log("Attempting to register....");
  const response = await axios.post(`${BASE_URL}/auth/register`, {
      username,
      password,
      email
    })

  return response;
}

export { login, register };
