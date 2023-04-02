import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    // closing the modal window after pressing Escape
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };

    const handleClick = ({ target }) => {
      if (target.classList.contains(styles.backdrop)) {
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
    <div className={styles.backdrop}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
