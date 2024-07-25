import "./GroupRole.scss";
import React, { useEffect, useState } from "react";
import { fetchGroups } from "../../services/userService";
import {
  fetchAllRoles,
  getRoleByGroups,
  assignRoleToGroup,
} from "../../services/roleService";
import { toast } from "react-toastify";
import _, { set } from "lodash";
const GroupRole = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const [listRole, setListRole] = useState([]);
  const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);
  useEffect(() => {
    getGroups();
    handleFetchRoles();
  }, []);
  const getGroups = async () => {
    let res = await fetchGroups();
    if (res && res.DT && +res.EC === 0) {
      setGroups(res.DT);
    }
  };
  const handleFetchRoles = async () => {
    let response = await fetchAllRoles();
    if (response && response.DT && +response.EC === 0) {
      let data = response.DT;
      setListRole(data);
    }
  };

  const handleChangeSelectGroup = async (value) => {
    setSelectedGroup(value);
    let res = await getRoleByGroups(value);

    if (res && +res.EC === 0) {
      let data = buildDataRolesGroup(res.DT.Roles, listRole);
      console.log("data >>> ", data);
      setAssignRolesByGroup(data);
    }
  };
  const buildDataRolesGroup = (groupRole, allRole) => {
    let result = [];
    if (allRole && allRole.length > 0) {
      allRole.map((role) => {
        let object = {};
        object.id = role.id;
        object.url = role.url;
        object.description = role.description;
        object.assigned = false;
        if (groupRole && groupRole.length > 0) {
          object.assigned = groupRole.some((item) => item.url === object.url);
        }
        result.push(object);
      });
    }
    return result;
  };
  const handleOnChangeSelectRole = (value) => {
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    const foundIndex = _assignRolesByGroup.findIndex(
      (item) => item.id === +value
    );
    _assignRolesByGroup[foundIndex].assigned =
      !_assignRolesByGroup[foundIndex].assigned;

    setAssignRolesByGroup(_assignRolesByGroup);
  };
  const buildDataToSave = () => {
    let result = {};
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    result.groupId = selectedGroup;
    let groupRoles = _assignRolesByGroup.filter(
      (item) => item.assigned === true
    );
    let finalGroupRoles = groupRoles.map((i) => {
      let item = { groupId: selectedGroup, roleId: i.id };
      return item;
    });
    result.groupRoles = finalGroupRoles;
    return result;
  };
  const handleSave = async () => {
    let data = buildDataToSave();
    let res = await assignRoleToGroup(data);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
    }
  };
  return (
    <div className="group-role-container container">
      <div className="title mt-3">
        <h4>Group role</h4>
        <div className="col-12 col-sm-6 form-group">
          <label>
            Select group<span className="red"> * </span>
          </label>
          <select
            name="groupId"
            className="form-select"
            onChange={(e) => handleChangeSelectGroup(e.target.value)}
          >
            <option value="">Please select group</option>
            {groups.length > 0 &&
              groups.map((item, index) => (
                <option key={`group-${index}`} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <hr />
      {selectedGroup && (
        <div className="all-roles">
          <h4>Assign role: </h4>
          {assignRolesByGroup &&
            assignRolesByGroup.length > 0 &&
            assignRolesByGroup.map((item, index) => (
              <div className="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={item.id}
                  id={`key-${index}`}
                  checked={item.assigned ? true : false}
                  onChange={(e) => handleOnChangeSelectRole(e.target.value)}
                />
                <label className="form-check-label" for={`key-${index}`}>
                  {item.url}
                </label>
              </div>
            ))}
          <div className="btn btn-warning mt-3" onClick={() => handleSave()}>
            {" "}
            Save
          </div>
        </div>
      )}
    </div>
  );
};
export default GroupRole;
