import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const BASEPATH = import.meta.env.VITE_REACT_APP_BASEPATH;

export const CheckAuthLoader = () => {
  const token = localStorage.getItem("TOKEN");
  if (!token) {
    return redirect(BASEPATH + "/login");
  }
  return null;
};

export const getAuthToken = () => {
  const token = localStorage.getItem("TOKEN");
  if (!token) {
    return null;
  }
  return token;
};

export const getTokenDetails = () => {
  const token = localStorage.getItem("TOKEN");
  if (!token) {
    return null;
  }
  return jwtDecode(token);
};
