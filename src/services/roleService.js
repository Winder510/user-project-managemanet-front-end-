import axios from "../setup/axios";
const createRoles = async (roles) => {
  return axios.post("/api/v1/role/create", [...roles]);
};
export { createRoles };
