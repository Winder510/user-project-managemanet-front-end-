import { useEffect, useState } from "react";
import { fetchAllUser } from "../../services/userService";
const Users = () => {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    let res = await fetchAllUser();
    if (res && res.data.DT && +res.data.EC === 0) {
      setListUser(res.data.DT);
      console.log(res.data.DT);
    }
  };
  return (
    <div className="manage-users-container container">
      <div className="users-header">
        <div className="title">
          <h2>Table users</h2>
        </div>
        <div className="actions">
          <button className="btn btn-success">Add new</button>
          <button className="btn btn-primary">Refresh</button>
        </div>
      </div>
      <div className="users-body">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Id</th>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              <th scope="col">Group</th>
            </tr>
          </thead>
          <tbody>
            {listUser && listUser.length > 0 ? (
              <>
                {listUser.map((currentUser, index) => {
                  return (
                    <tr key={`row + ${index}`}>
                      <th scope="row">{index + 1}</th>
                      <td>{currentUser.id}</td>
                      <td>{currentUser.email}</td>
                      <td>{currentUser.username}</td>
                      <td>{currentUser.group}</td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                <tr>
                  <td colSpan={5}>NO USERS</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="user-footer">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1">
                Previous
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                1
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                2
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                3
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Users;
