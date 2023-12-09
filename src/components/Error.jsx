import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Error(props) {

  const errorMessage = props.errorCode + ": " + props.errorMessage || `Unknown Error: ${props.errorCode}`;

  return (
    <Modal show={true} onHide={props.onClose}>
      <Modal.Header>
        <Modal.Title>Error {props.errorCode}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Dismiss
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Error;