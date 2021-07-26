/* eslint-disable react/jsx-props-no-spreading */
import React, { PropsWithChildren } from 'react';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';

// Style
import {
  ModalBody, ModalTitle, ModalContent, ModalLink,
} from './style';

export interface ConfirmationModalProps {
  isOpen: boolean;
  modalTitle: string;
}

Modal.setAppElement('#root');

const CountryErrorModal = React.memo(({
  modalTitle,
  children,
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
        <ModalLink href="https://virufy.org">
          {t('main:visitWebsite', 'Visit our website')}
        </ModalLink>
      </ModalBody>
    </Modal>
  );
});

export default CountryErrorModal;
