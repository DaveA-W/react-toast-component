import React from 'react';

import Button from '../Button';
import Toast from '../Toast';
import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  // Inititialise state for user input fields
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

  function addMessage(message, variant) {
    const id = Date.now();
    const newMessages = [...messages, { id, message, variant }];
    setMessages(newMessages);
    setMessage('');
    setVariant(VARIANT_OPTIONS[0]);
  }

  function dismissMessage(id) {
    const newMessages = messages.filter(m => m.id !== id);
    setMessages(newMessages);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf messages={messages} dismiss={dismissMessage} />

      <form
        onSubmit={event => {
          event.preventDefault();
          addMessage(message, variant);
        }}
      >
        <div className={styles.controlsWrapper}>        
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: 'baseline' }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                className={styles.messageInput} 
                value={message}
                required={true}
                onChange={event => {
                  setMessage(event.target.value);
                }}/>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              {
                VARIANT_OPTIONS.map(option => (
                  <label htmlFor={`variant-${option}`} key={option}>
                    <input
                      id={`variant-${option}`}
                      type="radio"
                      name="variant"
                      value={option}
                      checked={option === variant}
                      onChange={event => setVariant(event.target.value)}
                    />
                    {option}
                  </label>
                ))
              }
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
