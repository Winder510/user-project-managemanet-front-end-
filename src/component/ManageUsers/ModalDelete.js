import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const ModalDelete = (props) => {
  console.log("props", props);
  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.onHide}
        backdrop="static"
        size="nm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete user
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Heeyyy, you want to delete: {props.dataModal.email}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button variant="primary" onClick={props.confirmDeleteUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalDelete;
