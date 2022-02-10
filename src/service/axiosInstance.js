import axios from "axios";

const axiosInstace = axios.create({
  baseURL: "https://user-forms.herokuapp.com/api/v1",
  // baseURL: "http://localhost:9090/api/v1",
});

export default axiosInstace;
