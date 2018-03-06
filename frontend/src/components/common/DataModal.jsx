import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

const DataModal = props => (
  <Modal isOpen={props.isActive} toggle={props.onToggleModal}>
    <ModalHeader toggle={props.onCancel}>{props.actionType}</ModalHeader>
    <ModalBody>
      {props.children}
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={props.onConfirm}>{props.confirmName}</Button>
      <Button color="secondary" onClick={props.onCancel}>{props.cancelName}</Button>
    </ModalFooter>
  </Modal>
);

DataModal.propTypes = {
  isActive: PropTypes.bool,
  onToggleModal: PropTypes.func,
  onCancel: PropTypes.func,
  actionType: PropTypes.string,
  children: PropTypes.element,
  onConfirm: PropTypes.func,
  confirmName: PropTypes.string,
  cancelName: PropTypes.string,
};

DataModal.defaultProps = {
  isActive: false,
  onToggleModal: null,
  onCancel: null,
  actionType: '',
  children: null,
  onConfirm: null,
  confirmName: '',
  cancelName: '',
};

export default DataModal;
