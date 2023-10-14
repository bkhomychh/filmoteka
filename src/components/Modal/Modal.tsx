import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './Modal.module.scss';
import type { IModalProps } from './Modal.types';

const modalRoot = document.getElementById('modal-root') as HTMLDivElement;

const Modal = ({ closeModal, children, isVisible }: IModalProps) => {
  useEffect(() => {
    // closing the modal window after pressing Escape
    const handleKeyDown = (evt: KeyboardEvent): void => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };

    const handleClick = ({ target }: Event): void => {
      const clickedElement = target as HTMLElement;

      if (clickedElement.classList.contains(styles.backdrop)) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    // removing event listeners after unmounting
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, [closeModal]);

  return createPortal(
    <div className={`${styles.backdrop} ${isVisible ? styles.backdropVisible : ''}`}>
      <div className={`${styles.modal} ${isVisible ? styles.modalVisible : ''}`}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Modal;
