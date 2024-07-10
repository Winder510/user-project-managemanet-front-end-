import { useState, useRef } from "react";
import "./Role.scss";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createRoles } from "../../services/roleService";
import TableRole from "./TableRole";
const Role = () => {
  const [listChilds, setListChilds] = useState({
    child1: { url: "", description: "" },
  });
  const childRef = useRef();
  const [errors, setErrors] = useState({});
  const handleOnChangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;
    setListChilds(_listChilds);
  };
  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = {
      url: "",
      description: "",
    };
    setListChilds(_listChilds);
  };
  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  };
  const validateURL = () => {
    let _errors = _.cloneDeep(errors);
    let hasErrors = false;
    Object.keys(listChilds).forEach((key) => {
      if (!listChilds[key]["url"]) {
        _errors[key] = "Invalid URL";
        hasErrors = true;
      } else {
        delete _errors[key];
      }
    });
    setErrors(_errors);
    return hasErrors;
  };

  const handleSave = async () => {
    const hasErrors = validateURL();
    if (hasErrors) {
      toast.error("URL is empty");
    } else {
      let data = builData();
      let response = await createRoles(data);
      if (response && +response.EC === 0) {
        toast.success(response.EM);
        childRef.current.fetchListRoleAgain();
      }
    }
  };

  const builData = () => {
    const result = [];
    Object.entries(listChilds).map(([key, value], index) => {
      result.push({
        url: value.url,
        description: value.description,
      });
    });
    return result;
  };
  return (
    <>
      <div className="role-container container">
        <div className="title">
          <h2>All roles</h2>
        </div>
        <div className="main-container">
          {Object.entries(listChilds).map(([key, child], index) => {
            return (
              <div className="child-form" key={`child-${key}`}>
                <div className="row">
                  <div className="form-group col-5">
                    <label>URL: </label>
                    <input
                      type="text"
                      className={
                        !errors[key]
                          ? "form-control "
                          : "form-control is-invalid"
                      }
                      value={child.url}
                      onChange={(e) => {
                        handleOnChangeInput("url", e.target.value, key);
                      }}
                    ></input>
                  </div>
                  <div className="form-group col-5">
                    <label>Description:</label>
                    <input
                      type="text"
                      className="form-control "
                      value={child.description}
                      onChange={(e) => {
                        handleOnChangeInput("description", e.target.value, key);
                      }}
                    ></input>
                  </div>
                  <div className="col-2 mt-4 icon-action">
                    <i
                      className="fa fa-plus-circle add "
                      onClick={() => {
                        handleAddNewInput();
                      }}
                    ></i>
                    {index >= 1 && (
                      <i
                        className="fa fa-trash-o delete"
                        onClick={() => {
                          handleDeleteInput(key);
                        }}
                      ></i>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div>
            <button
              className="mt-3 btn btn-warning"
              onClick={() => handleSave()}
            >
              Save
            </button>
          </div>
        </div>
        <hr />
        <h4>Table role</h4>
        <TableRole ref={childRef} />
      </div>
    </>
  );
};
export default Role;
