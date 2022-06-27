import axios from "axios";

const register = (form) => axios({
    url: 'http://133.186.151.164:8080/imageBoard/api/members/signup',
    method: 'post',
    data: {
        email: form.email,
        password: form.password,
        username: form.username
    }
});

const login = (form) => axios({
    url: '/api/members/login',
    method: 'post',
    data: {
        email: form.email,
        password: form.password
    }
});

const getUser = (token) => axios({
    url: '/api/members/',
    method: 'get',
    headers: {
        "Authorization":token
    }
});

export default  {
    register,
    login,
    getUser,
}