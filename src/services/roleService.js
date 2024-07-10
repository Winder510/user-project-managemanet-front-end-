import axios from "../setup/axios";
const createRoles = async (roles) => {
  return axios.post("/api/v1/role/create", [...roles]);
};
const fetchAllRoles = async (page, limit) => {
  return axios.get(`/api/v1/role/read?page=${page}&limit=${limit}`);
};
const deleteRole = async (id) => {
  return axios.delete(`/api/v1/role/delete`, {
    data: { id: id },
  });
};
export { createRoles, fetchAllRoles, deleteRole };
