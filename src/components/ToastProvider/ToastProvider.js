import React from "react";
import useKeydown from "../../hooks/use-keydown";

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

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown('Escape', handleEscape);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, dismissToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;