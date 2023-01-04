import axios from "axios";

const database = "http://localhost:5000";

export const loginUser = async (user) => {
  let res = await axios.post(database + "/auth/login", user);
  console.log(res);
  return res;
};
