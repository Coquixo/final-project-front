import axios from "axios";

//Change To https://master.d3fws9ljq1bmzm.amplifyapp.com/
const database = "https://final-project-back-production.up.railway.app";

export const loginApi = async (user) => {
  let res = await axios.post(database + "/auth/login", user);
  return res.data;
};

export const registerApi = async (user) => {
  let res = await axios.post(database + "/auth/signin", user);
  return res.data;
};

//User Routes

//Get all users

export const getAllUsers = async (token) => {
  let res = await axios.get(`${database}/user/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//Get user's status(admin)
export const getUsersStatus = async (email) => {
  let res = await axios.get(`${database}/user/${email}/status`);
  return res.data;
};

//Update user's status(admin)
//User stands for the body(StatusId) to change, email for the target
export const updateUserStatus = async (email, user) => {
  let res = await axios.put(`${database}/user/${email}/status`, user);
  return res.data;
};

//Update User
/*We ask for email to verify what email data we are updating.
User stands for the body.*/
export const updateProfile = async (email, user, token) => {
  let res = await axios.put(`${database}/user/${email}/update`, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//Delete a user
//Email stands for what account we are deleting
export const deleteUser = async (email) => {
  let res = await axios.delete(`${database}/user/${email}/delete`);
  return res.data;
};

//Wallet Routes

//Get balance from a wallet
//User stands for UserId and Card for CardId (1 credit / 2 Debit)
export const getWalletBalance = async (user, card) => {
  let res = await axios.get(`${database}/wallet/${user}/${card}`);
  return res.data;
};

//Create a new Wallet with Balance 0
export const createNewWallet = async (user, card) => {
  let res = await axios.post(`${database}/wallet/${user}/${card}`);
  return res.data;
};

//Add or Withdraw money
/* id: WalletId
 ammount: Quantity of money 
 action: add/withdraw */
export const addOrWithdrawMoney = async (id, ammount, action) => {
  let res = await axios.put(`${database}/wallet/${id}/${ammount}/${action}`);
  return res.data;
};

//Transaction Routes

//Get all transactions data(admin)
export const getAllTransactions = async (token) => {
  let res = await axios.get(`${database}/move`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//Get all transactions from a user
//User stands for UserId
export const getUserTransaction = async (user, token) => {
  let res = await axios.get(`${database}/move/${user}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//Execute a new Transaction
/*sender : user's WalledId (ID)
addressee : user's WalledId (ID)
ammount : quantity to give*/
export const executeTransaction = async (sender, addressee, ammount) => {
  let res = await axios.post(
    `${database}/move/${sender}/${addressee}/${ammount}`
  );
  return res.data;
};
//Execute a new Transaction by EMAIL
/*sender : user's WalledId (EMAIL)
addressee : user's WalledId (EMAIL)
ammount : quantity to give*/
export const executeTransactionByEmail = async (sender, addressee, ammount) => {
  let res = await axios.post(
    `${database}/move/${sender}/${addressee}/${ammount}/email`
  );
  return res.data;
};

//State Routes

export const getStates = async () => {
  let res = await axios.get(`${database}/state`);
  return res.data;
};

//Role Routes

export const getRoles = async () => {
  let res = await axios.get(`${database}/role`);
  return res.data;
};

//Card Routes

export const getCards = async () => {
  let res = await axios.get(`${database}/card`);
  return res.data;
};
