//Import axios
import axios from "axios";

//set URL variable
const url = "http://localhost:3030";

/** AUTH CALLS */

//LOGIN FUNCTION
async function login(username, password) {
  var u = username.username_ref.current.value;
  var p = password.password_ref.current.value;

  console.log("Attempting to login....");

  return await axios({
    method: "post",
    url: url + "/auth/login",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      username: u,
      password: p,
    },
  })
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
}

export { login };
