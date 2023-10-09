import axios from "axios";

//const url = "https://controllerapis.azurewebsites.net/api/authentication"
const url = "https://localhost:7118/api/authentication"
//const url = "https://webapiharjoituscontroller202205.azurewebsites.net/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(url, userForAuth)
    
    return request.then(response => response);
}
export default { authenticate }