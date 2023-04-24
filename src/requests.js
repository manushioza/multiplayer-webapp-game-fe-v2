//Import axios
import axios from "axios";

//set URL variable
const BASE_URL = "https://capstone-backendv1.herokuapp.com";
/** AUTH CALLS */

//LOGIN FUNCTION
async function login(email, password) {
  console.log(">> Attempting to login....");
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });

  console.log(response);
  return response;
}

//REGISTER FUNCTION
async function register(email, username, password) {
  console.log("Attempting to register....");
  const response = await axios.post(`${BASE_URL}/auth/register`, {
    username,
    password,
    email,
  });

  return response;
}

//REGISTER FUNCTION
async function addSession(username) {
  console.log("Attempting to register....");
  const response = await axios.post(`${BASE_URL}/session/add`, {
    username,
  });
  return response
}

export { login, register, addSession };
