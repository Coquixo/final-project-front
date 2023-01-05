import axios from "axios";

const database = "http://localhost:5000";

export const login = async (user) => {
  let res = await axios.post(database + "/auth/login", user);
  return res.data;
};

export const register = async (user) => {
  let res = await axios.post(database + "/auth/signin", user);
  return res.token;
};
