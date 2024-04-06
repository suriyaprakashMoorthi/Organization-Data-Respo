import axios from "axios";
const baseurl = import.meta.env.VITE_REACT_BACKEND;
const homepage = import.meta.env.VITE_REACT_APP_BASEPATH;
var login_page = homepage + "/login";
class Service {
  baseurl = baseurl;

  token = localStorage.getItem("TOKEN");

  setToken = (token) => {
    this.token = token;
    localStorage.setItem("TOKEN", token);
  };

  logoutUser = () => {
    window.location.href = login_page;
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("id");
  };

  getAll = async (endpoint) => {
    try {
      var UserData = await axios.get(this.baseurl + endpoint, {
        headers: {
          Authz: `${this.token}`,
        },
      });
      return UserData.data;
    } catch (err) {
      console.log("GETALL :: ", err);
      throw err;
    }
  };

  get = async (endpoint, id) => {
    try {
      var UserData = await axios.get(this.baseurl + endpoint + "/" + id, {
        headers: {
          Authz: `${this.token}`,
        },
      });
      return UserData.data;
    } catch (err) {
      console.log("GETID :: ", err);
      throw err;
    }
  };

  loginpost = async (endpoint, data) => {
    try {
      var PostUserData = await axios.post(this.baseurl + endpoint, data);
      return PostUserData.data;
    } catch (err) {
      console.log("POST :: ", err);
      throw err;
    }
  };
  post = async (endpoint, data) => {
    try {
      var PostUserData = await axios.post(this.baseurl + endpoint, data, {
        headers: {
          Authz: this.token,
        },
      });
      return PostUserData.data;
    } catch (err) {
      console.log("POST :: ", err);
      throw err;
    }
  };

  put = async (endpoint, id, data) => {
    try {
      const response = await axios.put(
        this.baseurl + endpoint + "/" + id,
        data,
        {
          headers: {
            Authz: this.token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating:", error);
      throw error;
    }
  };

  delete = async (endpoint, id) => {
    try {
      var DeleteRes = await axios.delete(this.baseurl + endpoint + "/" + id, {
        headers: {
          Authz: `${this.token}`,
        },
      });
      return DeleteRes.data;
    } catch (err) {
      console.log("DELETE :: ", err);
      throw err;
    }
  };

  betweenRandomNumber = () => {
    let min = 1000;
    let max = 9999;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
}

var ServiceObj = new Service();
export default ServiceObj;
