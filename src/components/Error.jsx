import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Error(props) {
  const errorMessages = {
    200: 'OK: The request was successful.',
    201: 'Created: The request was successful, and a resource was created.',
    204: 'No Content: The request was successful, but there is no additional information to send.',
    400: 'Bad Request: The request could not be understood or was missing required parameters.',
    401: 'Unauthorized: Authentication failed or user does not have permissions for the requested operation.',
    404: 'Not Found: The requested resource could not be found.',
  };

  const defaultMessage = 'An error occurred. Please try again later.';

  const errorMessage = errorMessages[props.errorCode] || defaultMessage;

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