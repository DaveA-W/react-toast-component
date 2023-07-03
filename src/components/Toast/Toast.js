import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';
import { ToastContext } from '../ToastProvider';
import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ id, variant, children }) {
  const { dismissToast } = React.useContext(ToastContext);
  const toastVariant = variant || 'notice';
  const Icon = toastVariant in ICONS_BY_VARIANT ? ICONS_BY_VARIANT[toastVariant] : Info;
  return (
    <div className={`${styles.toast} ${styles[toastVariant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{ toastVariant } -</VisuallyHidden>
        { children }
      </p>
      <button
        onClick={event => dismissToast(id)} 
        className={styles.closeButton}
        aria-label="Dismiss message"
        aria-live="off">
          <X size={24} />
      </button>
    </div>
  );
}

export default Toast;
