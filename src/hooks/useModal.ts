import React from 'react';

export function useModal() {
  // State
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // Handlers
  const openModal = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = React.useCallback(() => {
    setIsOpen(s => !s);
  }, []);

  const out = {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };

  return out;
}
