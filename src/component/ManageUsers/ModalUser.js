import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { fetchGroups, createUser, editUser } from "../../services/userService";
import "./User.scss";
import { forEach } from "lodash";
import { toast } from "react-toastify";

const ModalUser = (props) => {
  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "Femail",
    groupId: "",
  };
  const validInputDefault = {
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    groupId: true,
    email: true,
  };

  const [userData, setUserData] = useState(defaultUserData);
  const [groups, setGroups] = useState([]);
  const [validInput, setValidInput] = useState(validInputDefault);

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (props.isOnEdit) {
      setValidInput(validInputDefault);
      setUserData({
        ...props.dataModalUpdate,
        groupId: props.dataModalUpdate.Group.id
          ? props.dataModalUpdate.Group.id
          : "",
      });
    } else {
      getGroups();
    }
  }, [props.dataModalUpdate]);

  const getGroups = async () => {
    let res = await fetchGroups();
    if (res && res.DT && +res.EC === 0) {
      setGroups(res.DT);
      setUserData((prevData) => ({
        ...prevData,
        groupId: res.DT[0].id,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (validateInputUser()) {
      let res = await createUser(userData);
      if (res && +res.EC === 0) {
        toast.success(res.EM);
        props.onHide();
      }
    }
  };

  const validateInputUser = () => {
    const arr = ["email", "password", "phone"];
    let isValid = true;

    arr.forEach((fieldName) => {
      if (userData[fieldName].trim() === "") {
        setValidInput((prevValidInput) => ({
          ...prevValidInput,
          [fieldName]: false,
        }));
        isValid = false;
        return isValid;
      } else {
        setValidInput((prevValidInput) => ({
          ...prevValidInput,
          [fieldName]: true,
        }));
      }
    });

    return isValid;
  };
  const handleEdit = async () => {
    let res = await editUser(userData);
    console.log("check ressssss  >> ,<<< ", res);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      props.onHide();
    }
  };
  return (
    <div>
      <Modal
        className="modal-user"
        show={props.show}
        onHide={props.onHide}
        backdrop="static"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email<span className="red"> * </span>
              </label>
              <input
                type="email"
                name="email"
                className={
                  validInput.email ? "form-control" : "form-control is-invalid"
                }
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number<span className="red"> * </span>
              </label>
              <input
                type="phone"
                name="phone"
                className={
                  validInput.phone ? "form-control" : "form-control is-invalid"
                }
                value={userData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className={
                  validInput.username
                    ? "form-control"
                    : "form-control is-invalid"
                }
                value={userData.username}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              {!props.isOnEdit && (
                <>
                  {" "}
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className={
                      validInput.password
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    value={userData.password}
                    onChange={handleChange}
                  />
                </>
              )}
            </div>
            <div className="col-12 col-sm-12 form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={userData.address}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Gender</label>
              <select
                name="sex"
                className="form-select"
                value={userData.sex}
                onChange={handleChange}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Groups<span className="red"> * </span>
              </label>
              <select
                name="groupId"
                className="form-select"
                value={userData.groupId}
                onChange={handleChange}
              >
                {groups.length > 0 &&
                  groups.map((item, index) => (
                    <option key={`group-${index}`} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button
            variant="primary"
            onClick={props.isOnEdit ? handleEdit : handleSave}
          >
            {props.isOnEdit ? "Save change" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalUser;
