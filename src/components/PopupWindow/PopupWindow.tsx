import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./PopupWindow.css";

interface Props {
    show: boolean;
    onClose: () => void;
    message: string;
}

const PopupWindow = (props: Props) => {
    const { show, onClose, message } = props;
    return (
        <Modal
            show={show}
            onHide={onClose}
            size="sm"
            dialogClassName="popup-window"
        >
            <Modal.Header>
                <Modal.Title>{message}</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <Button onClick={onClose}>Ok</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PopupWindow;
