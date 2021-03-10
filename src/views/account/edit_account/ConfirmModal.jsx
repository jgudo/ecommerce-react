import { Modal } from 'components/common';
import { useFormikContext } from 'formik';
import { useModal } from 'hooks';
import React, { useState } from 'react';

const ConfirmModal = ({ onConfirmUpdate, modal }) => {
    const { isModalOpen, onCloseModal } = useModal();
    const { password, setPassword } = useState('');
    const { values } = useFormikContext();

    return (
        <Modal
            isOpen={modal.isModalOpen}
            onRequestClose={onCloseModal}
        >
            <div className="text-center padding-l">
                <h4>Confirm Update</h4>
                <p>
                    To continue updating profile including your &nbsp;
                    <strong>email</strong>,
                    <br />
                    please confirm by entering your password
                </p>
                <input
                    className="input-form d-block"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    type="password"
                    value={password}
                />
            </div>
            <br />
            <div className="d-flex-center">
                <button
                    className="button"
                    onClick={() => onConfirmUpdate(values, password)}
                >
                    Confirm
				</button>
            </div>
            <button
                className="modal-close-button button button-border button-border-gray button-small"
                onClick={modal.onCloseModal}
            >
                X
			</button>
        </Modal>
    );
}

export default ConfirmModal;