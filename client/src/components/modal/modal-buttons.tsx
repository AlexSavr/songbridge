import React from 'react';
import Button, { ButtonProps } from '../button';
import styles from './modal.module.scss';

export const ConfirmModalButton = ({ children, className, ...props }: Omit<ButtonProps, 'variant' | 'color'>) => (
  <Button
    variant="filled"
    color="accent"
    className={[styles.confirmAction, className].join(' ')}
    {...props}
  >
    {children}
  </Button>
);

export const CancelModalButton = ({ children, className, ...props }: Omit<ButtonProps, 'variant' | 'color'>) => (
  <Button
    variant="outlined"
    color="default"
    className={[styles.cancelAction, className].join(' ')}
    {...props}
  >
    {children}
  </Button>
);