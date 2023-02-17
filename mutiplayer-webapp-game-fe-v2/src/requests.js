//Import axios
import axios from "axios";

//set URL variable
const BASE_URL = "http://localhost:3030";

/** AUTH CALLS */

//LOGIN FUNCTION
async function login(username, password) {
  console.log("Attempting to login....");
  const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    })

  return response;
}

// //ADD NEW USER (REGISTER)
// async function addUser(user) {
//   console.log("Attempting to add seller....");
  

//   return await axios({
//     method: "post",
//     url: url + "/auth/register",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     data: {
//       email: user.email,
//       username: user.username,
//       password: user.password
//     },
//   })
//     .then((response) => {
//       return response;
//     })
//     .catch(function (error) {
//       console.log(error);
//       return false;
//     });
// }

export { login };
