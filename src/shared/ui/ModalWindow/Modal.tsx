import styles from './Modal.module.css';
import { CrossClosed } from '../../assets';
import { useCallback, useEffect, type ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;

}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const handleEsc = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        }
        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [isOpen, handleEsc]);

    if (!isOpen) return null;

    return (
        <div
            className={styles.modal} >
            <div className={styles.container}>

                <CrossClosed
                    onClick={onClose}
                    className={styles.closedBtn} />
                {children}
            </div>
        </div>
    )
}