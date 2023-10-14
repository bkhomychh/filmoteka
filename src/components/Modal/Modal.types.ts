import { ReactNode } from 'react';

export interface IModalProps {
  isVisible: boolean;
  closeModal: () => void;
  children: ReactNode;
}
