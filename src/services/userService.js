import axios from "../setup/axios";
const registerNewUser = (email, phone, username, password) => {
  return axios.post("/api/v1/register", {
    email,
    phone,
    username,
    password,
  });
};
const loginUser = async (valueLogin, password) => {
  return axios.post("/api/v1/login", {
    valueLogin,
    password,
  });
};

const fetchAllUser = async (page, limit) => {
  return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};
const deleteUser = async (userId) => {
  return axios.delete(`/api/v1/user/delete`, {
    data: { id: userId },
  });
};
const fetchGroups = async () => {
  return axios.get(`/api/v1/group/read`);
};
const createUser = async (userData) => {
  return axios.post(`/api/v1/user/create`, { userData });
};
const editUser = async (userData) => {
  return axios.put(`/api/v1/user/update`, { userData });
};
export {
  registerNewUser,
  loginUser,
  fetchAllUser,
  deleteUser,
  fetchGroups,
  createUser,
  editUser,
};
