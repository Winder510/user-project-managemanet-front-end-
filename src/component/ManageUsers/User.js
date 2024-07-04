import { useEffect, useState } from "react";
import { fetchAllUser, deleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import ModalDelete from "./ModalDelete";
import { toast } from "react-toastify";
import ModalUser from "./ModalUser";
const Users = () => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const [dataModalUpdate, setDataModalUpdate] = useState({});
  const [isOnEdit, setIsOnEdit] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);
  const fetchUsers = async () => {
    let res = await fetchAllUser(currentPage, currentLimit);
    console.log("res", res);
    if (res && res.DT && +res.EC === 0) {
      setTotalPages(res.DT.totalPages);
      setListUser(res.DT.data);
    }
  };
  const handlePageClick = async (event) => {
    setCurrentPage(event.selected + 1);
  };

  // modal delete
  const handleDeleteUser = async () => {
    let res = await deleteUser(dataModal.id);
    console.log(res);
    if (res && +res.EC === 0) {
      toast.success(res.EM);
      fetchUsers();
    } else {
      toast.error(res.EM);
    }
    setIsShowModalDelete(false);
  };
  const onHide = () => {
    setIsShowModalDelete(false);
    setDataModal({});
  };

  const onHideModalUser = () => {
    setIsShowModalUser(!isShowModalUser);
    fetchUsers();
  };
  const handleEditUser = (currentUser) => {
    setIsOnEdit(true);
    setIsShowModalUser(!isShowModalUser);
    setDataModalUpdate(currentUser);
  };
  return (
    <>
      <div className="manage-users-container container d-flex flex-column gap-3">
        <div className="users-header">
          <div className="title">
            <h2>Manage users</h2>
          </div>
          <div className="actions">
            <button
              className="btn btn-success me-2"
              onClick={() => {
                onHideModalUser();
                setIsOnEdit(false);
              }}
            >
              Add new
            </button>
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
                      <tr
                        key={`row + ${
                          (currentPage - 1) * currentLimit + index
                        }`}
                      >
                        <th scope="row">
                          {(currentPage - 1) * currentLimit + index + 1}
                        </th>
                        <td>{currentUser.id}</td>
                        <td>{currentUser.email}</td>
                        <td>{currentUser.username}</td>
                        <td>
                          {currentUser.Group ? currentUser.Group.name : ""}
                        </td>
                        <td>
                          <button
                            className="btn btn-primary mx-1"
                            onClick={() => {
                              handleEditUser(currentUser);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger mx-1"
                            onClick={() => {
                              setIsShowModalDelete(true);
                              setDataModal(currentUser);
                            }}
                          >
                            Delete
                          </button>
                        </td>
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
          {totalPages > 0 && (
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        onHide={onHide}
        confirmDeleteUser={handleDeleteUser}
        dataModal={dataModal}
      />
      <ModalUser
        title
        show={isShowModalUser}
        onHide={onHideModalUser}
        isOnEdit={isOnEdit}
        dataModalUpdate={dataModalUpdate}
      />
    </>
  );
};
export default Users;
