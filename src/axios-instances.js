import axios from "axios";
import Cookies from "js-cookie";

export const axiosAuth = axios.create({
    baseURL: process.env.REACT_APP_BASEURL || "http://recipe-dev:8888/"
});

axiosAuth.interceptors.request.use(function (request) {
    const token = Cookies.get("token");
    request.headers["Authorization"] = `Bearer ${token}`;
    return request;
});

export const axiosDefault = axios.create({
    baseURL: process.env.REACT_APP_BASEURL || "http://recipe-dev:8888/"
});
