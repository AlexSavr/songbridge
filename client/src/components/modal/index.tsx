"use client";

import React, {ButtonHTMLAttributes, ReactNode, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {motion, AnimatePresence} from 'framer-motion';
import styles from './modal.module.scss';
import useModalsCounter from "@/hooks/useModalsCounter";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  content: ReactNode;
  actions?: ReactNode;
  withAnimation?: boolean;
  wrapperProps?: ButtonHTMLAttributes<HTMLDivElement>
};

const Modal = ({
                 isOpen,
                 onClose,
                 title,
                 wrapperProps,
                 content,
                 actions,
                 withAnimation = true,
               }: ModalProps) => {
  const {
    count: modalsCount,
    increment: incrementModalCounter,
    decrement: decrementModalCounter,
    reset: resetModalCounter
  } = useModalsCounter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      incrementModalCounter();
    } else {
      decrementModalCounter();
      if (modalsCount === 0) {
        document.body.style.overflow = '';
      }
    }
    return () => {
      document.body.style.overflow = '';
      resetModalCounter();
    };
  }, [decrementModalCounter, incrementModalCounter, isOpen, modalsCount, resetModalCounter]);

  if (typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    (
      <AnimatePresence>
        {isOpen && (
          <div className={styles.modal}>
            {withAnimation ? (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className={styles.modal__overlay}
                onClick={onClose}
              />
            ) : (
              <div
                className={styles.modal__overlay}
                onClick={onClose}
              />
            )}

            {/* Modal content */}
            {withAnimation ? (
              <motion.div
                initial={{y: 20, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                exit={{y: -20, opacity: 0}}
                className={[styles.modal__content, wrapperProps].join(' ')}
              >
                <ModalContent title={title} content={content} actions={actions}/>
              </motion.div>
            ) : (
              <div className={[styles.modal__content, wrapperProps].join(' ')}>
                <ModalContent title={title} content={content} actions={actions}/>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    ),
    document.getElementById('portal-root') ?? document.body
  );
};

const ModalContent = ({
                        title,
                        content,
                        actions,
                      }: {
  title?: ReactNode;
  content: ReactNode;
  actions?: ReactNode;
}) => (
  <>
    {title && (
      <div className={styles.modal__header}>
        <h3 className={styles.modal__title}>{title}</h3>
      </div>
    )}
    <div className={styles.modal__body}>{content}</div>
    {actions && (
      <div className={styles.modal__footer}>
        {actions}
      </div>
    )}
  </>
);

export default Modal;
