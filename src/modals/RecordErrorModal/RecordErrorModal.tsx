/* eslint-disable react/jsx-props-no-spreading */
import React, { PropsWithChildren } from 'react';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';

// Style
import {
  ModalBody, ModalTitle, ModalContent,
} from './style';

export interface ConfirmationModalProps {
  isOpen: boolean;
  modalTitle: string;
  onConfirm?: () => void;
}

Modal.setAppElement('#root');

const RecordErrorModal = React.memo(({
  modalTitle,
  children,
  onConfirm,
  ...props
}: PropsWithChildren<ConfirmationModalProps>) => {
  // Handlers

  const { t } = useTranslation();

  const customStyles = {
    content: {
      height: '281px',
      maxWidth: '348px',
      margin: 'auto',
      borderRadius: '10px',
      border: 'none',
    },
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  };

  return (
    <Modal
      {...props}
      style={customStyles}
    >
      <ModalBody className="ModalBody">
        <ModalTitle>{modalTitle}</ModalTitle>
        <ModalContent>{children}</ModalContent>
        <Button onClick={onConfirm} dark>
          {t('recordingsIntroduction:retryButton', 'Retry')}
        </Button>
      </ModalBody>
    </Modal>
  );
});

export default RecordErrorModal;
