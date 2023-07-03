import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({children}) {

  const [toasts, setToasts] = React.useState([]);

  function addToast(message, variant) {
    const id = Date.now();
    const newToasts = [...toasts, { id, message, variant }];
    setToasts(newToasts);
  }

  function dismissToast(id) {
    const newToasts = toasts.filter(m => m.id !== id);
    setToasts(newToasts);
  }

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        setToasts([]);
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, dismissToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;