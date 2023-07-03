import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({ messages, dismiss }) {
  return (
    messages?.length && (
      <ol className={styles.wrapper}>
        { messages.map(m => (
          <li key={m.id} className={styles.toastWrapper}>
            <Toast id={m.id} variant={m.variant} dismiss={dismiss}>{m.message}</Toast>
          </li>
        ))}
      </ol>
    )
  );
}

export default ToastShelf;
