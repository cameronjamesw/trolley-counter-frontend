import axios from 'axios';

axios.defaults.baseURL = "https://trolley-counter-91842d1b0f5e.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;