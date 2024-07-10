import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { fetchAllRoles, deleteRole } from "../../services/roleService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
const TableRole = forwardRef((props, ref) => {
  const [listRole, setListRole] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    handleFetchRoles();
  }, [currentPage]);
  useImperativeHandle(ref, () => ({
    fetchListRoleAgain() {
      handleFetchRoles();
    },
  }));

  const handleFetchRoles = async () => {
    let response = await fetchAllRoles(currentPage, currentLimit);
    if (response && response.DT && +response.EC === 0) {
      let data = response.DT.data;
      setListRole(data);
      setTotalPages(response.DT.totalPages);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  const handleDeleteUrl = async (id) => {
    let res = await deleteRole(id);
    if (res && +res.EC === 0) {
      handleFetchRoles();
      toast.success(res.EM);
    }
  };

  return (
    <>
      <div className="users-body">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Id</th>
              <th scope="col">Url</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listRole && listRole.length > 0 ? (
              <>
                {listRole.map((currentRole, index) => {
                  return (
                    <tr
                      key={`row + ${(currentPage - 1) * currentLimit + index}`}
                    >
                      <th scope="row">
                        {(currentPage - 1) * currentLimit + index + 1}
                      </th>
                      <td>{currentRole.id}</td>
                      <td>{currentRole.url}</td>
                      <td>{currentRole.description}</td>
                      <td>
                        <button
                          className="btn btn-danger mx-1"
                          onClick={() => {
                            handleDeleteUrl(currentRole.id);
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
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No role
                  </td>
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
    </>
  );
});
export default TableRole;
