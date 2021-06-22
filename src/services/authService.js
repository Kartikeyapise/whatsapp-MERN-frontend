import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/api/signin";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiUrl + "/api/signin", {
    email,
    password,
  });
  if (!jwt.token) window.location = "/login";
  localStorage.setItem(tokenKey, jwt.token);
}
export async function register(name, email, password) {
  const { data: jwt } = await http.post(apiUrl + "/api/signup", {
    name,
    email,
    password,
  });
  console.log(jwt);
  if (!jwt.token) window.location = "/register";
  localStorage.setItem(tokenKey, jwt.token);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  register,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
