import { ReactNode } from 'react';

export interface IButtonProps {
  children: ReactNode;
  handleClick: () => void;
}
