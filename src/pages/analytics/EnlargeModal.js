import React from 'react';
import { 
    Modal, 
    Container,
    Button 
} from 'react-bootstrap';

export default function EnlargeModal(props) {

  function handleClose(){
    props.onHide()
    if(props.openDrawer){
      props.openDrawer()
    }
  }

    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Using Grid in Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
              {props.children}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

