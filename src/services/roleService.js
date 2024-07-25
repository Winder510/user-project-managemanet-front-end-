import axios from "../setup/axios";
const createRoles = async (roles) => {
  return axios.post("/api/v1/role/create", [...roles]);
};
const fetchAllRolesPaginate = async (page, limit) => {
  return axios.get(`/api/v1/role/read?page=${page}&limit=${limit}`);
};
const fetchAllRoles = async () => {
  return axios.get(`/api/v1/role/read`);
};
const deleteRole = async (id) => {
  return axios.delete(`/api/v1/role/delete`, {
    data: { id: id },
  });
};
const getRoleByGroups = async (grId) => {
  return axios.get(`/api/v1/role/by-group/${grId}`);
};
const assignRoleToGroup = async (data) => {
  return axios.post(`/api/v1/role/assign-to-group`, data);
};
export {
  createRoles,
  fetchAllRoles,
  deleteRole,
  fetchAllRolesPaginate,
  getRoleByGroups,
  assignRoleToGroup,
};
