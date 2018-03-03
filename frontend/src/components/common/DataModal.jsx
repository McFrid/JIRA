import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

const DataModal = props => (
  <Modal isOpen={props.isActive} toggle={props.onTogleModal}>
    <ModalHeader toggle={props.onCancel}>{props.actionType}</ModalHeader>
    <ModalBody>
      {props.children}
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={props.onConfirm}>{props.confirmName}</Button>{' '}
      <Button color="secondary" onClick={props.onCancel}>{props.cancelName}</Button>
    </ModalFooter>
  </Modal>
);

export default DataModal;
